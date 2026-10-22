import { ChatDemo } from "@/components/chat-demo";
import { RevealText } from "@/components/fx/reveal-text";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/site.config";

const facts = [
  "Answers from your own docs, prices and policies",
  "Captures the lead and books the meeting in the chat",
  "Passes the conversation to your team when it should",
];

export function LiveDemo() {
  return (
    <section aria-labelledby="demo-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="ambient top-1/4 right-[-10%] h-[36rem] w-[44rem] opacity-60" />
      <div className="shell relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <RevealText id="demo-title" className="font-display text-display font-semibold text-bone">
            This chatbot was built by us.
          </RevealText>
          <p className="mt-6 max-w-md text-lede text-ash">
            Imagine one working for <span className="font-semibold text-bone">YOUR</span> business 24/7, answering
            questions, capturing leads and booking calls while your team is offline. Go ahead, ask it something.
          </p>
          <ul className="mt-10 space-y-4 border-t border-white/[0.08] pt-8">
            {facts.map((fact) => (
              <li key={fact} className="flex gap-4 text-bone/90">
                <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 rounded-full bg-filament shadow-[0_0_10px_rgb(232_16_26/0.7)]" />
                {fact}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href={siteConfig.contact.bookingUrl} variant="ghost">
              Get one for your site
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ChatDemo />
        </div>
      </div>
    </section>
  );
}
