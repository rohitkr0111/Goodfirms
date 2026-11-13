import { NextResponse } from "next/server";
import { getAgencies, saveAgencies } from "@/lib/store";
import type { Agency } from "@/lib/data";
export const runtime = "nodejs";
function authorized(request: Request) {
  const secret = process.env.ADMIN_SECRET;
  return !secret || request.headers.get("authorization") === `Bearer ${secret}`;
}
export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getAgencies());
}
export async function POST(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json() as Agency;
  if (!body.name?.trim() || !body.city?.trim() || !body.country?.trim()) return NextResponse.json({ error: "Name, city, and country are required." }, { status: 400 });
  const rows = await getAgencies();
  const slug = body.slug || body.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const index = rows.findIndex(item => item.slug === slug);
  const entry = { ...body, slug };
  if (index >= 0) rows[index] = entry; else rows.unshift(entry);
  await saveAgencies(rows);
  return NextResponse.json(entry, { status: index >= 0 ? 200 : 201 });
}
export async function DELETE(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "A listing slug is required." }, { status: 400 });
  await saveAgencies((await getAgencies()).filter(item => item.slug !== slug));
  return NextResponse.json({ ok: true });
}
