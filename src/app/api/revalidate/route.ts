import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { SANITY_TAG } from "@/sanity/content";

/**
 * Sanity webhook target. Point a webhook at this URL with the header
 * "Authorization: Bearer <SANITY_REVALIDATE_SECRET>" and edits appear on the
 * site within seconds of pressing Publish.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ error: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 });
  }

  const given = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${secret}`;
  const authorised =
    given.length === expected.length &&
    timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  if (!authorised) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(SANITY_TAG, { expire: 0 });
  return Response.json({ revalidated: true });
}
