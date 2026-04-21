import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "db.json");

interface PowerlessData {
  [name: string]: number;
}

function ensureDb() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({}));
  }
}

export async function getPowerless(name: string): Promise<number | null> {
  const normalized = name.toLowerCase().trim();
  ensureDb();
  
  const data: PowerlessData = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  return data[normalized] ?? null;
}

export async function savePowerless(name: string, percentage: number): Promise<void> {
  const normalized = name.toLowerCase().trim();
  ensureDb();
  
  const data: PowerlessData = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  data[normalized] = percentage;
  
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}
