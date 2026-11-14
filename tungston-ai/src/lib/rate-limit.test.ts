import { describe, expect, it } from "vitest";
import { rateLimit } from "./rate-limit";
import { deliverLead } from "./deliver-lead";

describe("rateLimit", () => {
  it("blocks the 6th attempt in 10 minutes, then allows again after the window", () => {
    const key = `test-${Math.random()}`;
    const opts = { max: 5, windowMs: 600_000 };
    for (let i = 0; i < 5; i++) expect(rateLimit(key, opts, 1_000 + i)).toBe(false);
    expect(rateLimit(key, opts, 2_000)).toBe(true);
    expect(rateLimit(key, opts, 1_000 + 600_001)).toBe(false);
  });

  it("counts keys separately", () => {
    const opts = { max: 1, windowMs: 1_000 };
    expect(rateLimit(`a-${Math.random()}`, opts, 0)).toBe(false);
    expect(rateLimit(`b-${Math.random()}`, opts, 0)).toBe(false);
  });
});

describe("deliverLead", () => {
  const lead = {} as never;
  const ok = async () => {};
  const fail = async () => {
    throw new Error("down");
  };
  const sent = async () => "sent" as const;
  const skipped = async () => "skipped" as const;

  it("is ok when the database saved it, even with no webhook", async () => {
    expect(await deliverLead(lead, { save: ok, notify: skipped })).toBe("ok");
  });
  it("is ok when only the notification went out", async () => {
    expect(await deliverLead(lead, { save: fail, notify: sent })).toBe("ok");
  });
  it("fails when nothing was stored and nothing was sent", async () => {
    expect(await deliverLead(lead, { save: fail, notify: skipped })).toBe("failed");
    expect(await deliverLead(lead, { save: fail, notify: fail })).toBe("failed");
  });
});
