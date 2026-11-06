import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createAIProvider } from "@auto-guardable/ai";
import { appendEvent, clearEvents, readRecentEvents } from "./event-store.js";
import { DEFAULT_POLICY, evaluateObservation } from "./policy.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 8787);
const provider = createAIProvider(process.env);
let policy = { ...DEFAULT_POLICY };
let lastAnnouncementAt = null;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url, "http://" + (req.headers.host || "localhost"));

    if (requestUrl.pathname === "/healthz") {
      return sendJson(res, 200, { ok: true });
    }

    if (requestUrl.pathname === "/api/status" && req.method === "GET") {
      return sendJson(res, 200, {
        ok: true,
        product: "Auto-Guardable",
        runtime: "mvp",
        ai: {
          provider: provider.name,
          model: provider.model,
          configured: provider.name !== "demo",
        },
        policy,
      });
    }

    if (requestUrl.pathname === "/api/events" && req.method === "GET") {
      const limit = Number(requestUrl.searchParams.get("limit") || 50);
      return sendJson(res, 200, { events: await readRecentEvents(limit) });
    }

    if (requestUrl.pathname === "/api/policy" && req.method === "POST") {
      const body = await readJson(req, 64 * 1024);
      policy = normalizePolicy({ ...policy, ...body });
      await appendEvent({
        type: "PolicyUpdated",
        source: "dashboard",
        payload: policy,
      });
      return sendJson(res, 200, { policy });
    }

    if (requestUrl.pathname === "/api/analyze" && req.method === "POST") {
      const body = await readJson(req, 10 * 1024 * 1024);
      const observation = await provider.analyzeScene({
        imageDataUrl: body.imageData,
        context: {
          location: typeof body.location === "string" ? body.location.slice(0, 100) : "unknown",
          currentTime: new Date().toISOString(),
          policy,
        },
      });

      const detectedEvent = await appendEvent({
        type: "PersonDetected",
        source: provider.name,
        payload: observation,
      });

      const decision = evaluateObservation({
        observation,
        policy,
        now: new Date(),
        lastAnnouncementAt,
      });

      await appendEvent({
        type: "PolicyEvaluated",
        source: "policy-engine",
        payload: decision,
      });

      if (decision.action === "announce") {
        await appendEvent({
          type: "AnnouncementScheduled",
          source: "response-coordinator",
          payload: { text: decision.announcement, reason: decision.reason },
        });
      }

      return sendJson(res, 200, {
        event: detectedEvent,
        observation,
        decision,
      });
    }

    if (requestUrl.pathname === "/api/simulate" && req.method === "POST") {
      const observation = {
        personDetected: true,
        personCount: 1,
        confidence: 1,
        summary: "Simulated person detection for pipeline testing.",
        provider: "simulator",
        model: "deterministic",
      };

      await appendEvent({
        type: "PersonDetected",
        source: "simulator",
        payload: observation,
      });

      const decision = evaluateObservation({
        observation,
        policy,
        now: new Date(),
        lastAnnouncementAt,
      });

      await appendEvent({
        type: "PolicyEvaluated",
        source: "policy-engine",
        payload: decision,
      });

      if (decision.action === "announce") {
        await appendEvent({
          type: "AnnouncementScheduled",
          source: "response-coordinator",
          payload: { text: decision.announcement, reason: decision.reason },
        });
      }

      return sendJson(res, 200, { observation, decision });
    }

    if (requestUrl.pathname === "/api/announcement-played" && req.method === "POST") {
      const body = await readJson(req, 64 * 1024);
      lastAnnouncementAt = new Date();
      const event = await appendEvent({
        type: "AnnouncementPlayed",
        source: "browser-speech",
        payload: { text: String(body.text || "").slice(0, 500) },
      });
      return sendJson(res, 200, { event });
    }

    if (requestUrl.pathname === "/api/reset" && req.method === "POST") {
      await clearEvents();
      lastAnnouncementAt = null;
      return sendJson(res, 200, { ok: true });
    }

    if (req.method === "GET") {
      return serveStatic(requestUrl.pathname, res);
    }

    sendJson(res, 404, { error: "Not found" });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, {
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

server.listen(port, host, () => {
  console.log("Auto-Guardable listening at http://" + host + ":" + port);
  console.log("AI provider: " + provider.name + " (" + provider.model + ")");
  console.log("Default binding is localhost for safety.");
});

async function serveStatic(requestPath, res) {
  const normalized = requestPath === "/" ? "/index.html" : requestPath;
  const target = path.resolve(publicDir, "." + normalized);
  if (!target.startsWith(publicDir)) {
    return sendJson(res, 400, { error: "Invalid path" });
  }

  try {
    const content = await fs.readFile(target);
    const type = MIME_TYPES[path.extname(target).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, {
      "Content-Type": type,
      "Cache-Control": "no-store",
    });
    res.end(content);
  } catch (error) {
    if (error?.code === "ENOENT") return sendJson(res, 404, { error: "Not found" });
    throw error;
  }
}

function normalizePolicy(next) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(next.openingTime)) {
    throw new Error("openingTime must use HH:MM.");
  }
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(next.closingTime)) {
    throw new Error("closingTime must use HH:MM.");
  }
  return {
    openingTime: next.openingTime,
    closingTime: next.closingTime,
    announceAfterHours: Boolean(next.announceAfterHours),
    cooldownSeconds: Math.max(0, Math.min(3600, Number(next.cooldownSeconds) || 0)),
  };
}

async function readJson(req, maxBytes) {
  const chunks = [];
  let total = 0;
  for await (const chunk of req) {
    total += chunk.length;
    if (total > maxBytes) throw new Error("Request body is too large.");
    chunks.push(chunk);
  }
  const text = Buffer.concat(chunks).toString("utf8");
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Request body must be valid JSON.");
  }
}

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(body));
}
