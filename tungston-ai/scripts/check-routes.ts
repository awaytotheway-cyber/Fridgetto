/**
 * Checks a running copy of the site: every old URL redirects where src/redirects.ts
 * says (also with a trailing slash and a query string), every public page answers
 * 200, and every URL in the sitemap answers 200.
 *
 *   npm run build && npm start            # in one terminal
 *   npm run check:routes                  # defaults to http://localhost:3000
 *   npm run check:routes https://www.protomation.ai
 *
 * Needs Node 22.18 or newer (it runs this TypeScript file directly).
 */
import { legacyRedirects, publicRoutes } from "../src/redirects.ts";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
type Row = { check: string; url: string; ok: boolean; detail: string };
const rows: Row[] = [];

async function hop(url: string) {
  const res = await fetch(url, { redirect: "manual" });
  const location = res.headers.get("location");
  return { status: res.status, next: location ? new URL(location, url).toString() : null };
}

/** Follows redirects by hand (fetch drops the #fragment otherwise) and returns the final URL. */
async function follow(url: string, maxHops = 3) {
  let current = url;
  for (let i = 0; i <= maxHops; i++) {
    const { status, next } = await hop(current);
    if (status < 300 || status >= 400 || !next) return { status, url: current, hops: i };
    current = next;
  }
  return { status: 0, url: current, hops: maxHops + 1 };
}

for (const { source, destination } of legacyRedirects) {
  const want = new URL(destination, base);

  const first = await hop(base + source);
  const direct = first.next ? new URL(first.next) : null;
  rows.push({
    check: "redirect",
    url: source,
    ok: first.status === 308 && !!direct && direct.pathname === want.pathname && direct.hash === want.hash,
    detail: `${first.status} → ${direct ? direct.pathname + direct.search + direct.hash : "(none)"}`,
  });

  const messy = await follow(`${base}${source}/?utm_source=check`);
  const end = new URL(messy.url);
  rows.push({
    check: "redirect /?query",
    url: `${source}/?utm_source=check`,
    ok:
      messy.status === 200 &&
      messy.hops <= 2 &&
      end.pathname === want.pathname &&
      end.hash === want.hash &&
      end.searchParams.get("utm_source") === "check",
    detail: `${messy.status} after ${messy.hops} hop(s) → ${end.pathname}${end.search}${end.hash}`,
  });
}

for (const path of [...publicRoutes, "/llms.txt", "/robots.txt"]) {
  const res = await fetch(base + path, { redirect: "manual" });
  rows.push({ check: "page", url: path, ok: res.status === 200, detail: String(res.status) });
}

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
rows.push({ check: "sitemap", url: "/sitemap.xml", ok: locs.length > 0, detail: `${locs.length} URLs` });
for (const path of locs) {
  const res = await fetch(base + path, { redirect: "manual" });
  rows.push({ check: "sitemap url", url: path, ok: res.status === 200, detail: String(res.status) });
}

const width = Math.max(...rows.map((r) => r.url.length));
for (const r of rows) {
  console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.check.padEnd(17)} ${r.url.padEnd(width)}  ${r.detail}`);
}
const failed = rows.filter((r) => !r.ok).length;
console.log(`\n${rows.length - failed}/${rows.length} passed against ${base}`);
process.exit(failed ? 1 : 0);
