// scripts/discover-topics.mjs — tops up the keyword map when it runs low.
// Runs before generation; does nothing unless uncovered topics < THRESHOLD.
import fs from "node:fs";
import path from "node:path";
import { CONFIG, ROOT, claude, parseJson, readArticles } from "./lib.mjs";

const THRESHOLD = 8;   // top up when fewer than this many uncovered topics remain
const PER_CATEGORY = 8; // how many new keywords to request per category

const existing = readArticles();

function isCovered(keyword) {
  const kwWords = keyword.toLowerCase().split(" ").filter((w) => w.length > 3);
  const needed = Math.max(2, Math.ceil(kwWords.length * 0.7));
  return existing.some((a) => {
    const t = (a.fm.title || "").toLowerCase();
    return kwWords.filter((w) => t.includes(w)).length >= needed;
  });
}

const uncovered = CONFIG.clusters.flatMap((c) => c.keywords).filter((k) => !isCovered(k));
console.log(`Uncovered topics remaining: ${uncovered.length}`);
if (uncovered.length >= THRESHOLD) {
  console.log("Map is healthy — no discovery needed.");
  process.exit(0);
}

const system = `You are a senior SEO content strategist for a specialist publication serving foreign founders and
relocating professionals building lives and businesses in the United States. You propose article topics with genuine
search demand, clear commercial intent, and high advertiser value (business/legal/financial services).
Topics must be evergreen, specific enough to own with a single authoritative 2600+ word guide, phrased the way a real
person would search, and must not duplicate existing coverage.
AUDIENCE: This publication serves foreign nationals and immigrants who are starting, funding, or running a
business in the United States, plus those relocating for work. Frame every topic around their realities:
no US credit history, SSN vs ITIN, treaty-country eligibility, cross-border banking, and how immigration
status interacts with commercial decisions. STRICT BOUNDARY: this is practical business and financial
information, NEVER immigration legal advice or tax advice — where a decision turns on visa eligibility or
tax liability, direct readers to a licensed immigration attorney or CPA. Never predict case outcomes,
approval odds, or policy changes.
Respond ONLY with a valid JSON object — no fences, no commentary.`;

const allTitles = existing.map((a) => `- ${a.fm.title}`).join("\n");
const allKeywords = CONFIG.clusters.flatMap((c) => c.keywords.map((k) => `- ${k}`)).join("\n");

const prompt = `Propose ${PER_CATEGORY} NEW search keyword topics for EACH of these categories:
${CONFIG.clusters.map((c) => `- ${c.category} (slug: ${c.categorySlug})`).join("\n")}

Every topic must be meaningfully different from ALL of these existing article titles:
${allTitles || "(none)"}

...and from ALL of these existing keywords:
${allKeywords}

Prioritise topics that:
- have real, specific search demand (a question people actually type), not vague theme words
- carry commercial intent that attracts high-value advertisers (formation services, immigration attorneys, business
  banking, insurers, lenders, CPAs) — costs, comparisons, requirements, "how to", eligibility, "worth it", mistakes
- can be answered concretely with named forms, agencies, thresholds and processes, so we can write with authority
- fill genuine gaps around our existing coverage rather than restating it from a slightly different angle
Avoid generic head terms already saturated by big players; favour specific long-tail questions we can realistically rank for.

Return JSON: {"<categorySlug>": ["keyword one", "keyword two", ...], ...} with one array per category slug.`;

const proposed = parseJson(await claude(prompt, { system, maxTokens: 4000 }));

let added = 0;
for (const cluster of CONFIG.clusters) {
  const fresh = (proposed[cluster.categorySlug] || [])
    .map((k) => String(k).toLowerCase().trim())
    .filter((k) => k.length > 8 && !cluster.keywords.includes(k) && !isCovered(k));
  cluster.keywords.push(...fresh);
  added += fresh.length;
  console.log(`  ${cluster.category}: +${fresh.length}`);
}

if (added === 0) {
  console.log("Model proposed nothing usable — leaving the map unchanged.");
  process.exit(0);
}

fs.writeFileSync(path.join(ROOT, "data", "pipeline.json"), JSON.stringify(CONFIG, null, 2) + "\n");
console.log(`Keyword map topped up with ${added} new topics.`);
