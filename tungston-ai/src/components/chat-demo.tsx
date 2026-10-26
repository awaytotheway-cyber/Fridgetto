"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUp } from "lucide-react";
import { LogoMark } from "@/components/ui/logo";
import { greeting, replyTo, suggestions, type BotReply } from "@/lib/demo-bot";

type Message = { id: number; from: "bot" | "user"; text: string; cta?: BotReply["cta"]; streaming?: boolean };

export function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", text: greeting }]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [asked, setAsked] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const nextId = useRef(1);
  const busy = typing || messages.some((m) => m.streaming);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const send = (text: string) => {
    const question = text.trim();
    if (!question || busy) return;
    setDraft("");
    setAsked((a) => [...a, question]);
    setMessages((m) => [...m, { id: nextId.current++, from: "user", text: question }]);

    const reply = replyTo(question);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const think = reduced ? 300 : 650 + Math.min(700, reply.text.length * 3);
    later(() => setTyping(true), 250);
    later(() => {
      setTyping(false);
      const id = nextId.current++;
      if (reduced) {
        setMessages((m) => [...m, { id, from: "bot", text: reply.text, cta: reply.cta }]);
        return;
      }
      // Stream the answer in word by word, like a model would
      const words = reply.text.split(" ");
      setMessages((m) => [...m, { id, from: "bot", text: "", streaming: true }]);
      words.forEach((_, i) => {
        later(() => {
          const done = i === words.length - 1;
          setMessages((m) =>
            m.map((msg) =>
              msg.id === id
                ? { ...msg, text: words.slice(0, i + 1).join(" "), streaming: !done, cta: done ? reply.cta : undefined }
                : msg,
            ),
          );
        }, i * 28);
      });
    }, think);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(draft);
  };

  const remaining = suggestions.filter((s) => !asked.includes(s));

  return (
    <div className="relative flex h-[34rem] flex-col overflow-hidden rounded-panel border border-white/[0.09] bg-carbon shadow-[0_40px_120px_-40px_rgb(232_16_26/0.45)] sm:h-[36rem]">
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
        <span className="grid size-10 place-items-center rounded-full bg-void ring-1 ring-white/10">
          <LogoMark className="size-5" dim={false} />
        </span>
        <div className="min-w-0">
          <p className="font-medium text-bone">Protomation assistant</p>
          <p className="flex items-center gap-1.5 text-[0.8125rem] text-ash">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-volt shadow-[0_0_8px_rgb(255_212_0/0.8)]" />
            Live demo with scripted replies
          </p>
        </div>
      </div>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        data-lenis-prevent
        className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-5 py-5"
      >
        {messages.map((m) => (
          <div key={m.id} className={`flex animate-[chat-in_0.45s_var(--ease-out-expo)_both] ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-[0.9375rem] leading-relaxed ${
                m.from === "user"
                  ? "rounded-br-md bg-filament text-white"
                  : "rounded-bl-md bg-white/[0.05] text-bone ring-1 ring-white/[0.06]"
              }`}
            >
              {m.text}
              {m.streaming && <span aria-hidden="true" className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-pulse bg-volt" />}
              {m.cta && (
                <Link
                  href={m.cta.href}
                  className="mt-3 flex w-fit items-center gap-2 rounded-full bg-filament px-4 py-2 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_0_1px_var(--color-volt),0_0_24px_rgb(232_16_26/0.6)]"
                >
                  {m.cta.label}
                </Link>
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start" aria-label="Assistant is typing">
            <div className="flex gap-1.5 rounded-2xl rounded-bl-md bg-white/[0.05] px-4 py-4 ring-1 ring-white/[0.06]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-1.5 animate-[art-bounce_1.1s_ease-in-out_infinite] rounded-full bg-ash"
                  style={{ animationDelay: `${i * 0.14}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {remaining.length > 0 && (
        <div className="flex gap-2 overflow-x-auto px-5 pb-3 [mask-image:linear-gradient(90deg,#000_85%,transparent)] [scrollbar-width:none]" data-lenis-prevent>
          {remaining.map((s) => (
            <button
              key={s}
              type="button"
              disabled={busy}
              onClick={() => send(s)}
              className="shrink-0 rounded-full border border-white/12 px-3.5 py-2 text-[0.8125rem] text-bone transition-colors hover:border-filament hover:bg-filament/10 disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-white/[0.07] p-3">
        <label htmlFor="demo-chat-input" className="sr-only">
          Ask the demo assistant a question
        </label>
        <input
          id="demo-chat-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask about pricing, voice agents, timelines…"
          autoComplete="off"
          maxLength={240}
          className="h-12 min-w-0 flex-1 rounded-full bg-white/[0.04] px-5 text-[0.9375rem] text-bone ring-1 ring-white/[0.08] outline-none placeholder:text-smoke focus-visible:ring-filament"
        />
        <button
          type="submit"
          disabled={busy || !draft.trim()}
          aria-label="Send message"
          className="grid size-12 shrink-0 place-items-center rounded-full bg-filament text-white transition-[opacity,box-shadow] hover:shadow-[0_0_24px_rgb(232_16_26/0.6)] disabled:opacity-40"
        >
          <ArrowUp className="size-5" strokeWidth={2.25} />
        </button>
      </form>
    </div>
  );
}
