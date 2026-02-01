import { NextResponse } from "next/server";
import { saveFeedback } from "../../../lib/store";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body must be valid JSON" }, { status: 400 });
  }

  const token = (body.token || "").toString().trim();
  const insight = (body.insight || "").toString().trim();
  const nextSteps = (body.nextSteps || "").toString().trim();

  if (!token) return NextResponse.json({ error: "token is required" }, { status: 400 });
  if (!insight) return NextResponse.json({ error: "insight is required" }, { status: 400 });

  const updated = await saveFeedback({ token, insight, nextSteps });
  if (!updated) return NextResponse.json({ error: "not found" }, { status: 404 });

  return NextResponse.json({ ok: true, record: updated });
}
