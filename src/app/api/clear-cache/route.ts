import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export function GET() {
  revalidateTag('pokemon')
  return NextResponse.json({ success: true })
}