import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const bio =
  "Part-time oracle, full-time reply guy: I can forecast rain in Lisbon but not whether 'haha' means you're bored.";

// Mirror the gate: UTF-8 text, 1-180 characters, single line, not only white space.
function assertValidBio(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 180 || /[\r\n]/.test(text) || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

function writeEntryAtomically(outputDir, text) {
  mkdirSync(outputDir, { recursive: true });
  const tmp = join(outputDir, ".entry.txt.tmp");
  writeFileSync(tmp, text, "utf8");
  renameSync(tmp, join(outputDir, "entry.txt"));
}

assertValidBio(bio);
writeEntryAtomically(process.env.MAKEFUN_OUTPUT_DIR || "/output", bio);
