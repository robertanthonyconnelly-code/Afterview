import { NextResponse } from "next/server";
import { createAfterview } from "../../../lib/store";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body must be valid JSON" }, { status: 400 });
  }

  const teamName = (body.teamName || "").toString().trim();
  const note = (body.note || "").toString().trim();

  if (!teamName) return NextResponse.json({ error: "teamName is required" }, { status: 400 });

  const record = await createAfterview({ teamName, note });
  return NextResponse.json({ ok: true, token: record.token });
}
