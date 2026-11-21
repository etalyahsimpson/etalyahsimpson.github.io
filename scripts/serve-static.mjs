#!/usr/bin/env node
/**
 * Plain static file server for the exported out/ directory, with directory
 * index handling and correct content types. Deliberately NO SPA fallback:
 * a missing route must 404, exactly like GitHub Pages.
 *
 * Usage: node scripts/serve-static.mjs [port]  (default 4173)
 */
import http from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "out");
const PORT = Number(process.argv[2] || 4173);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

const server = http.createServer(async (req, res) => {
  try {
    const rawUrl = new URL(req.url, `http://127.0.0.1:${PORT}`);
    let pathname = decodeURIComponent(rawUrl.pathname);
    if (pathname.endsWith("/")) pathname += "index.html";

    const filePath = path.normalize(path.join(OUT_DIR, pathname));
    if (!filePath.startsWith(OUT_DIR)) {
      res.writeHead(403).end("Forbidden");
      return;
    }

    let stat;
    try {
      stat = await fs.stat(filePath);
    } catch {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("404 Not Found");
      return;
    }

    const target = stat.isDirectory() ? path.join(filePath, "index.html") : filePath;
    const body = await fs.readFile(target);
    const type = MIME[path.extname(target).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "content-type": type, "cache-control": "no-store" });
    res.end(body);
  } catch (error) {
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end(`500 Internal Server Error: ${error.message}`);
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Serving ${OUT_DIR} at http://127.0.0.1:${PORT}/ (no SPA fallback)`);
});
