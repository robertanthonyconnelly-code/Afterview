import { NextResponse } from "next/server";
import { listAfterviews } from "../../../lib/store";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get("pageSize") || "10", 10)));

  const data = await listAfterviews({ page, pageSize });
  return NextResponse.json(data);
}
