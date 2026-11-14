import { describe, expect, it } from "vitest";
import { replyTo } from "./demo-bot";

const says = (q: string) => replyTo(q).text;

describe("demo clinic chat", () => {
  it("answers the suggested questions with the right intent", () => {
    expect(says("What are your timings?")).toMatch(/Monday to Saturday/);
    expect(says("How much is a consultation?")).toMatch(/₹800/);
    expect(says("Book a consultation")).toMatch(/Which suits you/);
    expect(says("Can I speak to a doctor?")).toMatch(/pass this conversation/);
  });
  it("confirms a picked slot, including 5:30pm", () => {
    expect(says("Tomorrow at 5:30pm")).toMatch(/booked with Dr Demo/);
    expect(says("Tomorrow at 11am")).toMatch(/booked with Dr Demo/);
  });
  it("never gives medical advice", () => {
    expect(says("what dose of folic acid should I take")).toMatch(/can't give medical advice/);
  });
  it("speaks Hindi when asked in Hindi", () => {
    expect(says("क्या आप हिंदी बोलते हैं")).toMatch(/हिंदी/);
  });
  it("quotes Protomation's real prices, never dollars", () => {
    expect(says("How much does Protomation cost?")).toMatch(/₹15,000.*₹2,00,000.*₹39,500/);
    expect(says("price")).not.toMatch(/\$/);
  });
});
