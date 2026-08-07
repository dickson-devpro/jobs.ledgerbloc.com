// scripts/expand-matrix.mjs
// Keeps the job × country matrix from ever running dry — with no file editing.
//
// When the uncovered pool drops below MIN_POOL it will:
//   1. ask Claude for new sponsorship-heavy job titles (validated, deduped)
//   2. activate another destination from data/indeed-countries.json
//      (a fixed catalogue — so an Indeed domain can never be invented)
//   3. write the new country into src/_data/site.json categories, so it gets a
//      nav entry, a category page and a working category CTA automatically
//
//   node scripts/expand-matrix.mjs
//   MIN_POOL=40 node scripts/expand-matrix.mjs

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { CONFIG, ROOT, claude, parseJson, readArticles } from "./lib.mjs";

const require = createRequire(import.meta.url);
const PIPELINE = path.join(ROOT, "data", "pipeline.json");
const CATALOGUE = path.join(ROOT, "data", "indeed-countries.json");
const SITE = path.join(ROOT, "src", "_data", "site.json");

const MIN_POOL = parseInt(process.env.MIN_POOL || "25", 10);
const NEW_JOBS = parseInt(process.env.NEW_JOBS || "6", 10);

const pipeline = JSON.parse(fs.readFileSync(PIPELINE, "utf8"));
const catalogue = JSON.parse(fs.readFileSync(CATALOGUE, "utf8"));
const site = JSON.parse(fs.readFileSync(SITE, "utf8"));
const matrix = pipeline.jobMatrix;

/* ---- how much runway is left? ---- */
const existing = readArticles();
const covered = new Set(
  existing
    .filter((a) => a.fm.jobKeywordBase && a.fm.country)
    .map((a) => `${a.fm.jobKeywordBase.toLowerCase()}::${a.fm.country.toLowerCase()}`)
);
let pool = 0;
for (const c of matrix.countries) {
  for (const j of matrix.jobs) {
    if (!covered.has(`${j.toLowerCase()}::${c.country.toLowerCase()}`)) pool++;
  }
}

console.log(`Matrix: ${matrix.jobs.length} jobs × ${matrix.countries.length} destinations`);
console.log(`Published: ${covered.size} · Uncovered pool: ${pool} (top up below ${MIN_POOL})`);

if (pool >= MIN_POOL) {
  console.log("Pool is healthy — nothing to expand.");
  process.exit(0);
}

let changed = false;

/* ---- 1. new job titles ---- */
const system = `You propose job titles for a publication about visa-sponsored work abroad.
You only return job titles that employers genuinely sponsor internationally — roles with real
labour shortages that appear on skilled occupation lists and shortage occupation lists.
Return plain, searchable job titles as a jobseeker would type them into a job board:
lowercase, 1-3 words, no seniority prefixes, no visa jargon, no company names.
Good: "dental nurse", "hgv driver", "solar installer", "quantity surveyor".
Bad: "senior registered nurse (H-1B)", "healthcare professional", "nursing jobs abroad".`;

const prompt = `We already publish guides for these job titles:
${matrix.jobs.join(", ")}

Propose ${NEW_JOBS} NEW job titles that are genuinely sponsored internationally and are NOT in that
list and are not near-synonyms of anything in it. Favour roles with persistent shortages across
several countries — healthcare, skilled trades, transport, engineering, hospitality, agriculture,
early years and social care, and technical/industrial roles.

Respond ONLY with a JSON array of strings. No prose, no fences.`;

try {
  const raw = await claude(prompt, { system, maxTokens: 1000 });
  const proposed = parseJson(raw);
  if (Array.isArray(proposed)) {
    const have = new Set(matrix.jobs.map((j) => j.toLowerCase()));
    const clean = proposed
      .map((j) => String(j).toLowerCase().trim())
      .filter((j) => j && j.length >= 3 && j.length <= 40)
      .filter((j) => j.split(" ").length <= 3)
      .filter((j) => !/visa|sponsor|job|abroad|senior|junior|h-?1b|lmia|482/.test(j))
      .filter((j) => !have.has(j));
    const added = [...new Set(clean)].slice(0, NEW_JOBS);
    if (added.length) {
      matrix.jobs.push(...added);
      changed = true;
      console.log(`+ ${added.length} job titles: ${added.join(", ")}`);
    } else {
      console.log("No usable new job titles returned.");
    }
  }
} catch (e) {
  console.log("Job discovery failed (continuing):", e.message);
}

/* ---- 2. activate another destination from the catalogue ---- */
const activeSlugs = new Set(matrix.countries.map((c) => c.slug));
const next = catalogue.countries.find((c) => !activeSlugs.has(c.slug));

if (next) {
  matrix.countries.push({ slug: next.slug, name: next.name, country: next.slug });

  // give it a category so it gets nav, a page, and a working CTA — no manual edit
  if (!site.categories.some((c) => c.slug === next.slug)) {
    site.categories.push({
      name: next.name,
      slug: next.slug,
      country: next.slug,
      jobKeyword: next.query,
      description: next.description
    });
    fs.writeFileSync(SITE, JSON.stringify(site, null, 2) + "\n");
  }
  changed = true;
  console.log(`+ destination activated: ${next.name} (${next.domain})`);
} else {
  console.log("Every destination in the catalogue is already active.");
}

if (changed) {
  fs.writeFileSync(PIPELINE, JSON.stringify(pipeline, null, 2) + "\n");
  const newPool =
    matrix.jobs.length * matrix.countries.length - covered.size;
  console.log(`Matrix is now ${matrix.jobs.length} × ${matrix.countries.length} — roughly ${newPool} pairs left to write.`);
} else {
  console.log("Nothing changed.");
}
