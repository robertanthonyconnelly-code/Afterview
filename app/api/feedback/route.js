import { NextResponse } from "next/server";
import { saveFeedback } from "../../../lib/store";

export async function POST(req) {
  try {
    const body = await req.json();
    const token = (body.token || "").trim();
    const insight = (body.insight || "").trim();
    const nextSteps = (body.nextSteps || "").trim();

    if (!token) return NextResponse.json({ error: "token is required" }, { status: 400 });
    if (!insight) return NextResponse.json({ error: "insight is required" }, { status: 400 });

    const updated = await saveFeedback({ token, insight, nextSteps });
    if (!updated) return NextResponse.json({ error: "not found" }, { status: 404 });

    return NextResponse.json({ ok: true, record: updated });
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
}
