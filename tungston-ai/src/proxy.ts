import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const { supabase, response } = createClient(request);
  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2?)$).*)",
  ],
};
