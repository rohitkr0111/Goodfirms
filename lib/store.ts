import { promises as fs } from "node:fs";
import path from "node:path";
import { agencies as seed, type Agency } from "@/lib/data";

const file = path.join(process.cwd(), "data", "agencies.json");
async function ensure() {
  try { await fs.access(file); }
  catch { await fs.mkdir(path.dirname(file), { recursive: true }); await fs.writeFile(file, JSON.stringify(seed, null, 2)); }
}
export async function getAgencies(): Promise<Agency[]> {
  await ensure();
  try { return JSON.parse(await fs.readFile(file, "utf8")) as Agency[]; }
  catch { return seed; }
}
export async function saveAgencies(rows: Agency[]) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temp = `${file}.tmp`;
  await fs.writeFile(temp, JSON.stringify(rows, null, 2));
  await fs.rename(temp, file);
}
