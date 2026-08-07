// scripts/check-similarity.mjs
// Flags near-duplicate guides — the doorway-page failure mode for a matrix site.
//
//   node scripts/check-similarity.mjs            # report
//   THRESHOLD=0.55 node scripts/check-similarity.mjs
//   STRICT=1 node scripts/check-similarity.mjs   # exit 1 if anything is over the line
//
// Method: 5-word shingles per article body, Jaccard similarity between every pair.
// Two guides about different jobs in different countries should share structure but
// not phrasing. Anything above ~0.5 usually means the model reused a template.

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const matter = require("gray-matter");

const ROOT = path.resolve(new URL(".", import.meta.url).pathname, "..");
const DIR = path.join(ROOT, "src", "articles");
const THRESHOLD = parseFloat(process.env.THRESHOLD || "0.50");
const STRICT = process.env.STRICT === "1";
const SHINGLE = 5;

function shingles(text) {
  const words = String(text)
    .toLowerCase()
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const set = new Set();
  for (let i = 0; i + SHINGLE <= words.length; i++) {
    set.add(words.slice(i, i + SHINGLE).join(" "));
  }
  return set;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let shared = 0;
  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  for (const s of small) if (large.has(s)) shared++;
  return shared / (a.size + b.size - shared);
}

const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));
if (files.length < 2) {
  console.log("Fewer than 2 guides — nothing to compare.");
  process.exit(0);
}

const docs = files.map((f) => {
  const parsed = matter(fs.readFileSync(path.join(DIR, f), "utf8"));
  return {
    file: f,
    title: parsed.data.title || f,
    job: parsed.data.jobKeywordBase || "",
    country: parsed.data.country || "",
    words: parsed.content.split(/\s+/).filter(Boolean).length,
    sh: shingles(parsed.content)
  };
});

const pairs = [];
for (let i = 0; i < docs.length; i++) {
  for (let j = i + 1; j < docs.length; j++) {
    pairs.push({ a: docs[i], b: docs[j], score: jaccard(docs[i].sh, docs[j].sh) });
  }
}
pairs.sort((x, y) => y.score - x.score);

const over = pairs.filter((p) => p.score >= THRESHOLD);

console.log(`Compared ${docs.length} guides (${pairs.length} pairs), threshold ${THRESHOLD}\n`);

console.log("Most similar pairs:");
for (const p of pairs.slice(0, 8)) {
  const flag = p.score >= THRESHOLD ? "  ⚠️ " : "     ";
  console.log(`${flag}${(p.score * 100).toFixed(1)}%  ${p.a.job || p.a.file} [${p.a.country}]  ↔  ${p.b.job || p.b.file} [${p.b.country}]`);
}

const thin = docs.filter((d) => d.words < 1200);
if (thin.length) {
  console.log(`\nThin guides (under 1200 words):`);
  for (const d of thin) console.log(`  ${d.words}w  ${d.title.slice(0, 70)}`);
}

console.log("");
if (over.length) {
  console.log(`⚠️  ${over.length} pair(s) at or above ${THRESHOLD} similarity.`);
  console.log("   These read as templated. Tighten the generator prompt before publishing more,");
  console.log("   or rewrite the offending guides — near-identical pages are the doorway-page risk.");
  if (STRICT) process.exit(1);
} else {
  console.log(`✅ No pair reached ${THRESHOLD}. Guides are differentiated.`);
}
