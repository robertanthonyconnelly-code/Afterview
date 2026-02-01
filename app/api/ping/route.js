import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    version: "AFTERVIEW_RESET_v1"
  });
}
