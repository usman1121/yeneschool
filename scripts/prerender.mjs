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
      const ext = path.extname(filePath);

      if (!ext) {
        filePath = path.join(filePath, "index.html");
      }

      const ext2 = path.extname(filePath);
      const MIME = {
        ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
        ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
        ".svg": "image/svg+xml", ".ico": "image/x-icon", ".json": "application/json",
        ".woff": "font/woff", ".woff2": "font/woff2", ".webp": "image/webp",
      };
      const contentType = MIME[ext2] || "application/octet-stream";

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
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      });
    });

    server.listen(0, "127.0.0.1", () => {
      const port = server.address().port;
      console.log(`  Server started on http://127.0.0.1:${port}`);
      resolve({ server, port });
    });
  });
}

async function findBrowser() {
  const systemPaths = [
    "/usr/bin/chromium", "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable",
    "/snap/bin/chromium", "/opt/google/chrome/chrome",
  ];

  try {
    const p = puppeteer.executablePath();
    if (typeof p === "string" && p && fs.existsSync(p)) return { path: p, args: LAUNCH_ARGS };
  } catch {}

  for (const p of [process.env.PUPPETEER_EXECUTABLE_PATH, process.env.CHROME_PATH, process.env.CHROMIUM_PATH, ...systemPaths].filter(Boolean)) {
    try {
      if (fs.existsSync(p)) return { path: p, args: LAUNCH_ARGS };
    } catch {}
  }

  try {
    const mod = await import("@sparticuz/chromium");
    const chromium = mod.default || mod;
    console.log("  Resolving @sparticuz/chromium...");
    const p = await chromium.executablePath();
    if (typeof p === "string" && p) {
      console.log("  Using @sparticuz/chromium: " + p);
      return { path: p, args: chromium.args || LAUNCH_ARGS };
    }
    console.log("  @sparticuz/chromium returned invalid path: " + p);
  } catch (e) {
    console.log("  @sparticuz/chromium failed: " + (e.message || e));
  }

  console.log("  Chrome not found. Installing via @puppeteer/browsers...");
  try {
    const { execSync } = await import("node:child_process");
    execSync("npx --yes @puppeteer/browsers install chrome@latest --path /tmp/chrome-browsers 2>&1", { stdio: "pipe", timeout: 120000 });
    const base = "/tmp/chrome-browsers/chrome";
    if (fs.existsSync(base)) {
      for (const entry of fs.readdirSync(base).sort()) {
        for (const bin of [
          path.join(base, entry, "chrome"),
          path.join(base, entry, "chrome-linux64", "chrome"),
          path.join(base, `chrome-${entry}`, "chrome"),
        ]) {
          if (fs.existsSync(bin)) return { path: bin, args: LAUNCH_ARGS };
        }
      }
    }
  } catch (err) {
    console.error(`  Chrome install failed: ${err.message.slice(0, 120)}`);
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
    console.error("  ✗ puppeteer not installed. Run: npm install --save-dev puppeteer\n");
    process.exit(1);
  }

  const browserInfo = await findBrowser();
  if (!browserInfo) {
    console.warn("  ⚠ No Chrome/Chromium available. Skipping prerender.\n");
    process.exit(0);
  }

  const { server, port } = await startServer();
  const baseUrl = `http://127.0.0.1:${port}`;

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: browserInfo.path,
      args: browserInfo.args,
    });
  } catch (err) {
    const msg = err.message ? err.message.slice(0, 120) : String(err);
    console.error(`  ✗ Browser launch failed: ${msg}`);
    server.close();
    process.exit(1);
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
            const type = req.resourceType();
            if (type === "image" || type === "font" || type === "media") {
              req.abort();
            } else {
              req.continue();
            }
          });

          const response = await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 20000,
          });

          if (!response || !response.ok()) continue;

          await page.waitForSelector("main", { timeout: 8000 }).catch(() => {});
          await new Promise((r) => setTimeout(r, 2000));

          const html = await page.evaluate(() => document.documentElement.outerHTML);
          const fullHtml = "<!doctype html>\n" + html;

          fs.mkdirSync(path.dirname(outputPath), { recursive: true });
          fs.writeFileSync(outputPath, fullHtml, "utf-8");

          const size = (Buffer.byteLength(fullHtml, "utf-8") / 1024).toFixed(1);
          console.log(`  ✓ ${route.path.padEnd(16)} ${size.padStart(6)} KB`);
          success = true;
        } catch (err) {
          console.error(`  ✗ ${route.name} (attempt ${attempt + 1}) — ${err.message.slice(0, 80)}`);
        } finally {
          if (page) await page.close().catch(() => {});
        }

        if (success) break;
      }

      if (!success) {
        console.error(`  ✗ ${route.path} — failed after 3 attempts`);
      }
    }

    const totalSize = ROUTES.reduce((sum, route) => {
      const f = path.join(dist, route.file);
      return sum + (fs.existsSync(f) ? fs.statSync(f).size : 0);
    }, 0);

    console.log(`\n  Done. ${ROUTES.length} routes (${(totalSize / 1024).toFixed(0)} KB total).\n`);
  } catch (err) {
    console.error("  ✗ Fatal:", err.message);
    process.exit(1);
  } finally {
    if (browser) await browser.close().catch(() => {});
    server.close();
  }
}

prerender();
