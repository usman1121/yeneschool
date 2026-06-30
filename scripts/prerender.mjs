import fs from "node:fs";
import path from "node:path";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

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

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".webp": "image/webp",
};

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const urlPath = req.url === "/" ? "index.html" : req.url;
      let filePath = path.join(dist, urlPath);
      const ext = path.extname(filePath);

      if (!ext) {
        filePath = path.join(filePath, "index.html");
      }

      const contentType = MIME_TYPES[path.extname(filePath)] || "application/octet-stream";

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
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    process.env.CHROME_PATH,
    process.env.CHROMIUM_PATH,
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/brave-browser",
    "/snap/bin/chromium",
    "/opt/google/chrome/chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      await fs.promises.access(candidate);
      return candidate;
    } catch {}
  }
  return null;
}

async function installChrome() {
  console.log("  Chrome not found locally. Installing...");
  try {
    execSync(
      "npx --yes @puppeteer/browsers install chrome@latest --path /tmp/chrome-browsers 2>/dev/null",
      { stdio: "pipe", timeout: 120000 },
    );
    const base = "/tmp/chrome-browsers/chrome";
    if (!fs.existsSync(base)) return null;
    const entries = fs.readdirSync(base).sort();
    for (const entry of entries) {
      const candidates = [
        path.join(base, entry, "chrome"),
        path.join(base, entry, "chrome-linux64", "chrome"),
        path.join(base, `chrome-${entry}`, "chrome"),
      ];
      for (const c of candidates) {
        if (fs.existsSync(c)) return c;
      }
    }
    return null;
  } catch (err) {
    console.error(`  Chrome install failed: ${err.message.slice(0, 120)}`);
    return null;
  }
}

async function prerender() {
  console.log("\n  ── Prerendering ──\n");

  const distIndex = path.join(dist, "index.html");
  if (!fs.existsSync(distIndex)) {
    console.error("  ✗ dist/index.html not found. Run 'npm run build' first.\n");
    process.exit(0);
  }

  try {
    puppeteer = (await import("puppeteer-core")).default;
  } catch {
    console.warn("  ✗ puppeteer-core not installed. Run: npm install --save-dev puppeteer-core\n");
    process.exit(0);
  }

  let browserPath = await findBrowser();
  if (!browserPath) {
    browserPath = await installChrome();
  }
  if (!browserPath) {
    console.warn("  ⚠ No browser found — skipping prerender. Install Chromium for full prerendering.\n");
    process.exit(0);
  }

  const { server, port } = await startServer();
  const baseUrl = `http://127.0.0.1:${port}`;

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: browserPath,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--headless=new",
      ],
    });
  } catch (err) {
    console.warn(`  ⚠ Browser launch failed: ${err.message.slice(0, 120)}`);
    console.warn("  ⚠ Skipping prerender. Install system deps (libnspr4 etc.) for full prerendering.\n");
    server.close();
    return;
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

          if (!response || !response.ok()) {
            continue;
          }

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
