import { NextResponse } from "next/server";
import { createAfterview } from "../../../lib/store";

export async function POST(req) {
  try {
    const ct = req.headers.get("content-type") || "";
    let body = {};

    // Support JSON AND form submits
    if (ct.includes("application/json")) {
      body = await req.json();
    } else if (ct.includes("multipart/form-data") || ct.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      body = Object.fromEntries(form.entries());
    } else {
      // last-resort fallback
      const text = await req.text();
      body = text ? JSON.parse(text) : {};
    }

    const teamName = (body.teamName || "").toString().trim();
    const note = (body.note || "").toString().trim();

    if (!teamName) {
      return NextResponse.json({ error: "teamName is required" }, { status: 400 });
    }

    const record = await createAfterview({ teamName, note });
    return NextResponse.json({ ok: true, token: record.token, record });
  } catch (err) {
    return NextResponse.json(
      { error: "invalid json", detail: err?.message || "unknown" },
      { status: 400 }
    );
  }
}
