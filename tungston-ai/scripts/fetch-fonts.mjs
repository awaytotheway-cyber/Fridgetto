/**
 * Downloads Clash Display and General Sans from Fontshare into src/assets/fonts/fontshare.
 *
 * The ITF Free Font License lets you self-host these fonts on your own site, but not
 * redistribute the files (a public git repo counts as redistribution), so they are
 * git-ignored and fetched here instead. Runs automatically before `dev` and `build`;
 * it does nothing when the files are already present.
 */
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { inflateRawSync } from "node:zlib";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "../src/assets/fonts/fontshare");

/** Fontshare slug → files to keep from its download, looked up by file name. */
const families = {
  "clash-display": [
    "ClashDisplay-Variable.woff2", // site, every weight
    "ClashDisplay-Semibold.ttf", // OG image (Satori cannot read woff2 or variable fonts)
    "ClashDisplay-Medium.ttf",
  ],
  "general-sans": ["GeneralSans-Variable.woff2"],
};

/** Reads the named entries out of a zip using its central directory. */
function unzip(buf, names) {
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error("not a zip archive");

  const found = new Map();
  let p = buf.readUInt32LE(eocd + 16);
  for (let i = buf.readUInt16LE(eocd + 10); i > 0; i--) {
    const method = buf.readUInt16LE(p + 10);
    const size = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const local = buf.readUInt32LE(p + 42);
    const path = buf.toString("utf8", p + 46, p + 46 + nameLen);
    const name = path.slice(path.lastIndexOf("/") + 1);
    // The same file ships in several folders; take the first copy
    if (names.includes(name) && !found.has(name)) {
      const start = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
      const data = buf.subarray(start, start + size);
      found.set(name, method === 8 ? inflateRawSync(data) : data);
    }
    p += 46 + nameLen + buf.readUInt16LE(p + 30) + buf.readUInt16LE(p + 32);
  }
  return found;
}

const missing = Object.entries(families).filter(([, files]) => files.some((f) => !existsSync(join(outDir, f))));
if (missing.length === 0) process.exit(0);

await mkdir(outDir, { recursive: true });
try {
  for (const [slug, files] of missing) {
    const res = await fetch(`https://api.fontshare.com/v2/fonts/download/${slug}`);
    if (!res.ok) throw new Error(`${slug}: HTTP ${res.status}`);
    const found = unzip(Buffer.from(await res.arrayBuffer()), files);
    for (const file of files) {
      if (!found.has(file)) throw new Error(`${slug}: ${file} is not in the Fontshare download`);
      await writeFile(join(outDir, file), found.get(file));
    }
    console.log(`fonts: fetched ${slug} from Fontshare`);
  }
} catch (err) {
  console.error(
    `\nCould not download the brand fonts from Fontshare (${err.message}).\n` +
      "This build needs network access to api.fontshare.com once; the files are cached in\n" +
      "src/assets/fonts/fontshare afterwards. You can also download Clash Display and General Sans\n" +
      "from https://www.fontshare.com and copy the files listed in scripts/fetch-fonts.mjs there.\n",
  );
  process.exit(1);
}
