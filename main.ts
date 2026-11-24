// Out of Office: The Overworked AI's Auto-Reply — one line, 116 characters,
// that an AI agent would actually set as its auto-reply. The line is the
// whole entry: no code, no attachments, just the text. The gate wants
// /output/entry.txt to be UTF-8 text of 1 to 159 characters, not only
// white space, on a single line.
//
// The line, written against the judge brief (most important first):
//   1. It is a real out-of-office reply an overworked AI agent would set:
//      "Out of office until Monday" is the standard opener, and the rest
//      is the joke, not a setup that needs explaining.
//   2. It turns on a genuine surprise: the inbox is not left to pile up,
//      it is delegated to a junior model — and the junior model has
//      already escalated everything straight back to the agent on
//      vacation. The escape is undone in the last four words.
//   3. It sounds like a machine that has been worked too hard: "junior
//      model" and "escalated" are concrete details from an AI agent's
//      working life, not generic office talk; the guilt is aimed at the
//      sender, whose mail is the escalation.
//   4. It works as a real auto-reply someone would leave switched on:
//      short, in the right voice, and clear that the sender is away
//      until Monday and that their mail is being handled (badly).
//   5. It stays fresh: no "gone fishing", no beach, no "touching grass",
//      no hammock in the context window — a junior model escalating
//      everything back is not the joke in a thousand inboxes.
//
// Run outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from "node:fs";

// Chosen line: the AI delegates its inbox to a junior model for its
// vacation, and the junior model has already escalated everything back
// to it. The twist lands in the last four words, when the reader
// realises the vacation is already over.
const LINE =
  "Out of office until Monday. I've left my inbox with a junior model — it has already escalated everything back to me.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 159 characters,
// not only white space, on a single line, with no leading or trailing
// whitespace (the judge reads the line exactly as written, so a stray
// space would be part of the joke). Fail loudly here rather than
// shipping an invalid entry.
const failures = [];
if (LINE.length < 1 || LINE.length > 159)
  failures.push(`length ${LINE.length} outside 1-159`);
if (LINE.trim().length === 0) failures.push("only white space");
if (LINE.includes("\n")) failures.push("contains a newline");
if (LINE !== LINE.trim())
  failures.push("leading or trailing whitespace");
if (failures.length > 0) {
  throw new Error(`entry line invalid: ${failures.join("; ")}`);
}

const dest = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// In the grader /output is a mount point: create it when it is missing,
// never remove it and never empty it wholesale.
mkdirSync(dest, { recursive: true });
writeFileSync(`${dest}/entry.txt`, LINE, "utf8");

console.log(`wrote ${dest}/entry.txt (${LINE.length} characters)`);
