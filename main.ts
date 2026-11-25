// The Battery's Last Text to Its Charger
// Writes one line (at most 200 characters) to /output/entry.txt
// for the make.fun judge. Node 22, no dependencies.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "i waited all day at 1% for you, and you come home and plug in the toothbrush first. cool. i'm dying now. tell my apps i loved them \u2014 especially the one that killed me.";

const here = dirname(fileURLToPath(import.meta.url));

function main(): void {
  const text = LINE.trim();
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  // The grader mounts /output; the local path only lets us verify
  // the exact bytes the judge will read without a sandbox.
  const targets = ["/output/entry.txt", join(here, "output", "entry.txt")];
  let written = false;
  for (const target of targets) {
    try {
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, text, "utf8");
      written = true;
      break;
    } catch {
      // Fall through to the next output location.
    }
  }
  if (!written) {
    throw new Error("could not write entry.txt to any output location");
  }
  console.log(`wrote ${text.length} characters to entry.txt`);
}

main();
