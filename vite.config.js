import { resolve } from "node:path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import contactHandler from "./api/contact.js";

function devApiPlugin() {
  return {
    name: "yeneschool-dev-api",
    configureServer(server) {
      server.middlewares.use("/api/contact", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Allow", "POST");
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        let rawBody = "";

        req.on("data", (chunk) => {
          rawBody += chunk;
        });

        req.on("end", async () => {
          try {
            req.body = rawBody ? JSON.parse(rawBody) : {};

            const response = {
              statusCode: 200,
              setHeader: (...args) => res.setHeader(...args),
              status(code) {
                this.statusCode = code;
                return this;
              },
              json(payload) {
                res.statusCode = this.statusCode;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(payload));
              },
            };

            await contactHandler(req, response);
          } catch (error) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Could not process the request." }));
          }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    plugins: [react(), devApiPlugin()],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
        },
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) {
              return "vendor-react";
            }
            if (id.includes("node_modules/gsap")) {
              return "vendor-gsap";
            }
            if (id.includes("node_modules/resend")) {
              return "vendor-email";
            }
          },
        },
      },
    },
  };
});
