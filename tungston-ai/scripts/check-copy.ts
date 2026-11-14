/**
 * Fails when visitor-facing copy breaks the house rules (COPY.md, "How to review"):
 * banned buzzwords, the retired "30+ languages" claim, certification or HIPAA claims,
 * dollar prices, or the old free-audit offer. Checks src/content, src/lib/demo-bot.ts,
 * src/lib/legal.ts and the page/section components.
 *
 *   npm run check:copy
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["src/content", "src/sections", "src/app", "src/components", "src/lib/demo-bot.ts", "src/lib/legal.ts"];
const skip = [/\/api\//, /\.test\.ts$/, /login\//, /auth\//];

const rules: [RegExp, string][] = [
  [/\bAI agents?\b/i, "say what it does, not \"AI agents\""],
  [/\b(autonomous|agentic|revolutioni[sz]e|cutting-edge|leverage|unlock|seamless(ly)?)\b/i, "banned buzzword"],
  [/30\+\s*languages|over 30 languages/i, "languages are Hindi, Marathi and English"],
  [/\bcertified\b|\bHIPAA\b/i, "no certification or HIPAA claims"],
  [/(?<![\w])\$\d/, "prices are in rupees"],
  [/free AI audit|one business day/i, "retired offer or reply promise"],
];

const files: string[] = [];
const walk = (p: string) => {
  if (statSync(p).isDirectory()) for (const f of readdirSync(p)) walk(join(p, f));
  else if (/\.(ts|tsx)$/.test(p) && !skip.some((r) => r.test(p))) files.push(p);
};
roots.forEach(walk);

let problems = 0;
for (const file of files) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      // Comments explain the rules; only strings and JSX text are visitor copy
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
      for (const [re, why] of rules) {
        if (re.test(line)) {
          problems++;
          console.log(`${file}:${i + 1}  ${why}\n    ${line.trim().slice(0, 140)}`);
        }
      }
    });
}
console.log(problems ? `\n${problems} problem(s) in ${files.length} files` : `Copy rules: ${files.length} files clean`);
process.exit(problems ? 1 : 0);
