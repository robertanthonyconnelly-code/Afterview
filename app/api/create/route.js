import { NextResponse } from "next/server";
import { createAfterview } from "../../../lib/store";

export async function POST(req) {
  try {
    const body = await req.json();
    const teamName = (body.teamName || "").trim();
    const note = (body.note || "").trim();

    if (!teamName) return NextResponse.json({ error: "teamName is required" }, { status: 400 });

    const record = await createAfterview({ teamName, note });
    return NextResponse.json({ ok: true, token: record.token, record });
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
}
