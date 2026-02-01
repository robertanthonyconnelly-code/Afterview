import { NextResponse } from "next/server";
import { createAfterview } from "../../../lib/store";

export async function POST(req) {
  let body;

  try {
    // ONLY read FormData — no JSON parsing at all
    const form = await req.formData();
    body = Object.fromEntries(form.entries());
  } catch {
    return NextResponse.json(
      { error: "Could not read form data" },
      { status: 400 }
    );
  }

  const teamName = (body.teamName || "").toString().trim();
  const note = (body.note || "").toString().trim();

  if (!teamName) {
    return NextResponse.json(
      { error: "teamName is required" },
      { status: 400 }
    );
  }

  const record = await createAfterview({ teamName, note });

  return NextResponse.json({
    ok: true,
    token: record.token
  });
}
