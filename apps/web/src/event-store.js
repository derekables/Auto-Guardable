import fs from "node:fs/promises";
import path from "node:path";

const DEFAULT_PATH = path.resolve(process.env.AUTOGUARD_EVENT_LOG || "apps/web/data/events.jsonl");

export async function appendEvent(event, filePath = DEFAULT_PATH) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const record = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    ...event,
  };
  await fs.appendFile(filePath, JSON.stringify(record) + "\n", "utf8");
  return record;
}

export async function readRecentEvents(limit = 50, filePath = DEFAULT_PATH) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return content
      .trim()
      .split("\n")
      .filter(Boolean)
      .slice(-Math.max(1, Math.min(200, limit)))
      .reverse()
      .map((line) => JSON.parse(line));
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

export async function clearEvents(filePath = DEFAULT_PATH) {
  try {
    await fs.rm(filePath);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}
