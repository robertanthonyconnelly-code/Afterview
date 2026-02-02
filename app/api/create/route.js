import { NextResponse } from "next/server";
import { createAfterview } from "../../../lib/store";

export async function POST(req) {
  let body;

  // 1) Parse JSON only (because your client is sending JSON)
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json(
      { error: "Could not parse JSON body", detail: e?.message || "unknown" },
      { status: 400 }
    );
  }

  const teamName = (body.teamName || "").toString().trim();
  const note = (body.note || "").toString().trim();

  if (!teamName) {
    return NextResponse.json({ error: "teamName is required" }, { status: 400 });
  }

  // 2) Create record (this is where Redis/env issues usually happen)
  try {
    const record = await createAfterview({ teamName, note });
    return NextResponse.json({ ok: true, token: record.token });
  } catch (e) {
    return NextResponse.json(
      { error: "Create failed", detail: e?.message || "unknown" },
      { status: 500 }
    );
  }
}
