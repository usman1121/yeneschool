import fs from "node:fs";
import path from "node:path";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";

let puppeteer;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.resolve(root, "dist");

const ROUTES = [
  { path: "/", file: "index.html", name: "home" },
  { path: "/modules", file: path.join("modules", "index.html"), name: "modules" },
  { path: "/contact", file: path.join("contact", "index.html"), name: "contact" },
  { path: "/demo", file: path.join("demo", "index.html"), name: "demo" },
  { path: "/vs-others", file: path.join("vs-others", "index.html"), name: "compare" },
  { path: "/privacy", file: path.join("privacy", "index.html"), name: "privacy" },
  { path: "/terms", file: path.join("terms", "index.html"), name: "terms" },
  { path: "/cookie-policy", file: path.join("cookie-policy", "index.html"), name: "cookiePolicy" },
];

const LAUNCH_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
  "--headless=new",
];

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const urlPath = req.url === "/" ? "index.html" : req.url;
      let filePath = path.join(dist, urlPath);
      if (!path.extname(filePath)) filePath = path.join(filePath, "index.html");

      const ext = path.extname(filePath);
      const MIME = {
        ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
        ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
        ".svg": "image/svg+xml", ".ico": "image/x-icon", ".json": "application/json",
        ".woff": "font/woff", ".woff2": "font/woff2", ".webp": "image/webp",
      };

      fs.readFile(filePath, (err, data) => {
        if (err) {
          const fallback = path.join(dist, "index.html");
          fs.readFile(fallback, (err2, data2) => {
            if (err2) {
              res.writeHead(404, { "Content-Type": "text/html" });
              res.end("Not found");
              return;
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data2);
          });
          return;
        }
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        res.end(data);
      });
    });

    server.listen(0, "127.0.0.1", () => {
      console.log(`  Server started on http://127.0.0.1:${server.address().port}`);
      resolve(server);
    });
  });
}

async function tryLaunchBrowser() {
  const paths = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    process.env.CHROME_PATH,
    process.env.CHROMIUM_PATH,
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
  ].filter((p) => typeof p === "string" && p);

  for (const ep of paths) {
    if (fs.existsSync(ep)) {
      try {
        return await puppeteer.launch({ executablePath: ep, args: LAUNCH_ARGS });
      } catch {}
    }
  }

  try {
    return await puppeteer.launch({ args: LAUNCH_ARGS });
  } catch (err) {
    console.log("  puppeteer.launch() (auto-detect) failed: " + (err.message || "").slice(0, 80));
  }

  try {
    const mod = await import("@sparticuz/chromium").catch(() => null);
    if (mod) {
      const chromium = mod.default || mod;
      const ep = await chromium.executablePath().catch(() => null);
      if (typeof ep === "string" && ep && fs.existsSync(ep)) {
        console.log("  Using @sparticuz/chromium");
        return await puppeteer.launch({ executablePath: ep, args: chromium.args || LAUNCH_ARGS });
      }
    }
  } catch {}

  console.log("  Downloading Chrome via @puppeteer/browsers...");
  try {
    const { execSync } = await import("node:child_process");
    execSync(
      "npx --yes @puppeteer/browsers install chrome@latest --path /tmp/chrome-browsers 2>&1",
      { stdio: "pipe", timeout: 180000 },
    );
    const base = "/tmp/chrome-browsers/chrome";
    if (fs.existsSync(base)) {
      for (const entry of fs.readdirSync(base).sort()) {
        for (const bin of [
          path.join(base, entry, "chrome"),
          path.join(base, entry, "chrome-linux64", "chrome"),
          path.join(base, `chrome-${entry}`, "chrome"),
        ]) {
          if (fs.existsSync(bin) && fs.statSync(bin).isFile()) {
            try { fs.chmodSync(bin, 0o755); } catch {}
            return await puppeteer.launch({ executablePath: bin, args: LAUNCH_ARGS });
          }
        }
      }
    }
  } catch (err) {
    console.error("  Chrome download failed: " + (err.message || "").slice(0, 120));
  }

  return null;
}

async function prerender() {
  console.log("\n  ── Prerender ──\n");

  const distIndex = path.join(dist, "index.html");
  if (!fs.existsSync(distIndex)) {
    console.error("  ✗ dist/index.html not found. Run 'npm run build' first.\n");
    process.exit(0);
  }

  try {
    puppeteer = (await import("puppeteer")).default;
  } catch {
    console.warn("  ⚠ puppeteer not available. Skipping prerender.\n");
    process.exit(0);
  }

  const server = await startServer();
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  const browser = await tryLaunchBrowser();
  if (!browser) {
    console.warn("  ⚠ No browser available. Skipping prerender.\n");
    server.close();
    process.exit(0);
  }

  try {
    for (const route of ROUTES) {
      const url = `${baseUrl}${route.path}`;
      const outputPath = path.join(dist, route.file);
      let success = false;

      for (let attempt = 0; attempt < 3; attempt++) {
        let page;
        try {
          page = await browser.newPage();
          await page.setViewport({ width: 1280, height: 720 });
          await page.setRequestInterception(true);
          page.on("request", (req) => {
            (req.resourceType() === "image" || req.resourceType() === "font" || req.resourceType() === "media")
              ? req.abort() : req.continue();
          });

          await page.evaluateOnNewDocument(() => {
            try {
              localStorage.setItem("language", "en");
              localStorage.removeItem("theme");
            } catch {}
          });

          const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
          if (!response || !response.ok()) continue;

          await page.waitForSelector("main", { timeout: 8000 }).catch(() => {});
          await new Promise((r) => setTimeout(r, 2000));

          const html = await page.evaluate(() => document.documentElement.outerHTML);
          fs.mkdirSync(path.dirname(outputPath), { recursive: true });
          fs.writeFileSync(outputPath, "<!doctype html>\n" + html, "utf-8");

          const size = (Buffer.byteLength(html, "utf-8") / 1024).toFixed(1);
          console.log(`  ✓ ${route.path.padEnd(16)} ${size.padStart(6)} KB`);
          success = true;
        } catch (err) {
          console.error(`  ✗ ${route.name} (attempt ${attempt + 1}) — ${(err.message || "").slice(0, 80)}`);
        } finally {
          if (page) await page.close().catch(() => {});
        }
        if (success) break;
      }

      if (!success) console.error(`  ✗ ${route.path} — failed after 3 attempts`);
    }

    const totalSize = ROUTES.reduce((sum, r) => {
      const f = path.join(dist, r.file);
      return sum + (fs.existsSync(f) ? fs.statSync(f).size : 0);
    }, 0);

    console.log(`\n  Done. ${ROUTES.length} routes (${(totalSize / 1024).toFixed(0)} KB total).\n`);
  } catch (err) {
    console.error("  ✗ Fatal:", (err.message || "").slice(0, 120));
  } finally {
    if (browser) await browser.close().catch(() => {});
    server.close();
  }
}

prerender();
