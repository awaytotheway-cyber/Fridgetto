import { NextResponse, type NextRequest } from "next/server";
import { catalog } from "@/lib/services/catalog";

const known = new Set(catalog.map((s) => s.slug));

/**
 * Service pages stream, so a notFound() inside one would arrive with a 200 status.
 * Unknown service slugs are caught here first and served the real 404 page.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !known.has(slug)) return NextResponse.rewrite(new URL("/404", request.url));
}

export const config = { matcher: "/services/:slug" };
