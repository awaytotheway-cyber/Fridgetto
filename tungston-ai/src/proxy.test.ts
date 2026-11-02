import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { proxy } from "./proxy";

describe("proxy", () => {
  it("sends an unknown service to the 404 page before the page streams", () => {
    const res = proxy(new NextRequest("https://www.protomation.ai/services/does-not-exist"));
    expect(res?.headers.get("x-middleware-rewrite")).toMatch(/\/404$/);
  });

  it("lets a real service through", () => {
    expect(proxy(new NextRequest("https://www.protomation.ai/services/whatsapp-automation"))).toBeUndefined();
  });
});
