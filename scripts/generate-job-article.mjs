// scripts/generate-job-article.mjs
// Generates COUNT articles by walking the job × country matrix in data/pipeline.json.
// Every article ships with jobKeyword + country in front matter, so the Indeed CTA
// and the related-article filter work automatically with no manual wiring.
//
//   COUNT=3 node scripts/generate-job-article.mjs

import {
  CONFIG, claude, splitMetaBody, slugify, wordCount,
  todayISO, readArticles, writeArticle
} from "./lib.mjs";

const MIN_WORDS = CONFIG.minWords || 1800;
const COUNT = Math.max(1, Math.min(40, parseInt(process.env.COUNT || "1", 10) || 1));

/* Job family, used by the relatedJobs filter to link siblings together. */
const FAMILY = {
  "registered nurse": "healthcare", "care assistant": "healthcare",
  "truck driver": "transport", "forklift driver": "transport",
  "warehouse operative": "logistics", "cleaner": "facilities",
  "hotel housekeeper": "hospitality", "chef": "hospitality",
  "welder": "trades", "electrician": "trades", "mechanic": "trades",
  "construction labourer": "construction", "civil engineer": "construction",
  "farm worker": "agriculture", "security guard": "facilities",
  "software engineer": "technology", "accountant": "professional",
  "teacher": "education"
};

/* Country-specific context so the model writes the right visa route, not a generic one. */
const COUNTRY_CONTEXT = {
  usa: "United States. Sponsorship usually runs through H-1B (specialty occupation, capped lottery), H-2A/H-2B (seasonal), or employer-sponsored permanent residence (EB-2/EB-3, PERM labor certification). Salaries in USD.",
  canada: "Canada. Sponsorship usually means an employer obtains an LMIA (Labour Market Impact Assessment) supporting a work permit, or the role supports Express Entry / a Provincial Nominee Program. Salaries in CAD.",
  uk: "United Kingdom. Sponsorship means the employer holds a Home Office sponsor licence and issues a Certificate of Sponsorship under the Skilled Worker route (Health and Care Worker sub-route for eligible healthcare roles). Salaries in GBP. Note the going-rate and general salary thresholds exist but change — describe them as thresholds to verify, never quote a figure as current.",
  germany: "Germany and the wider EU. Routes include the EU Blue Card (degree + salary threshold), the Skilled Worker visa for recognised vocational qualifications, and the Opportunity Card. Qualification recognition (Anerkennung) is often the real bottleneck. Salaries in EUR.",
  netherlands: "Netherlands. The main route is the Highly Skilled Migrant scheme, which requires the employer to be an IND-recognised sponsor and to meet a salary threshold. Salaries in EUR.",
  australia: "Australia and New Zealand. The main employer route is the Temporary Skill Shortage (subclass 482) visa, with the occupation needing to appear on the relevant skilled occupation list, plus skills assessment. Salaries in AUD.",
  uae: "UAE, Qatar and the wider Gulf. Employment is employer-sponsored by default: the employer obtains the work permit and residence visa. Contracts often include accommodation or allowances. Salaries usually quoted monthly and tax-free."
};

const system = `You are the senior editor of a publication that helps people find genuine visa-sponsored work abroad.

WHAT YOU WRITE: practical, specific, verifiable guides about a single job role in a single country.

NON-NEGOTIABLE ACCURACY RULES — this is YMYL content read by people making life-changing decisions:
- Never invent a statistic, salary, quota, processing time or threshold and present it as current fact.
  Salary figures must be framed as indicative ranges that vary by employer and region.
- Never predict visa approval odds or outcomes. Never imply the reader is likely to be approved.
- Name the real visa route, the real government body, and the real documents — but tell the reader to
  verify current thresholds and rules on the official government source, because they change.
- Never suggest an agent or intermediary can obtain a visa independently of an employer. They cannot.
- Always warn that no legitimate employer or agent charges a candidate for a job or a visa.

WHAT MAKES THESE GUIDES WORTH PUBLISHING: each one must stand on its own. Generic filler that could apply
to any job in any country is worthless and actively harmful to the site. Every guide needs role-specific
and country-specific substance: what the work actually involves day to day, which kinds of employer sponsor
it and why, the qualification or licensing hurdle particular to that role and country, what gets applications
rejected, and what the realistic timeline looks like.

TONE: plain, direct, UK-neutral English. No hype, no emoji, no "in today's fast-paced world". Write for
someone who is seriously considering moving countries for this job.

Follow the output format EXACTLY.`;

const FORMAT = `Respond in EXACTLY this format (no markdown fences, nothing before or after):
===META===
{"title": "keyword-rich title, 55-75 chars, includes the job, the country and 'Visa Sponsorship'",
 "description": "meta description, 140-160 chars",
 "standfirst": "2 sentence standfirst — what this role pays and which visa route applies",
 "slug": "url-slug",
 "keyFigures": [{"label": "Typical salary", "value": "range with currency", "note": "Indicative; varies by employer and region"},
                {"label": "Common visa route", "value": "the route name", "note": "Employer-led — verify on the official source"},
                {"label": "Main hurdle", "value": "short phrase", "note": "one line"}],
 "faq": [{"q": "...", "a": "2-4 sentence answer"}, ... 8 items]}
===BODY===
The full Markdown article body (## sections, ### subsections). No H1. No FAQ section — FAQ lives in META only.`;

/* Which job × country pairs already exist? */
function coveredPairs(existing) {
  const set = new Set();
  for (const a of existing) {
    const j = (a.fm.jobKeywordBase || "").toLowerCase();
    const c = (a.fm.country || "").toLowerCase();
    if (j && c) set.add(`${j}::${c}`);
  }
  return set;
}

function pickPair(existing, skip) {
  const matrix = CONFIG.jobMatrix;
  if (!matrix) throw new Error("data/pipeline.json is missing jobMatrix");
  const covered = coveredPairs(existing);
  for (const country of matrix.countries) {
    for (const job of matrix.jobs) {
      const key = `${job.toLowerCase()}::${country.country.toLowerCase()}`;
      if (covered.has(key) || skip.has(key)) continue;
      return { job, country, key };
    }
  }
  return null;
}

function titleCase(s) {
  return s.replace(/\b\w/g, (m) => m.toUpperCase());
}

async function generateOne(existing, skip) {
  const pick = pickPair(existing, skip);
  if (!pick) { console.log("Matrix fully covered — nothing left to generate."); return null; }
  const { job, country, key } = pick;
  skip.add(key);

  const ctx = COUNTRY_CONTEXT[country.country] || `${country.name}.`;
  const year = todayISO().slice(0, 4);

  const siblings = existing
    .filter((a) => a.fm.country === country.country || a.fm.jobFamily === (FAMILY[job] || ""))
    .slice(0, 6)
    .map((a) => `- [${a.fm.title}](${a.fm.permalink})`)
    .join("\n");

  const prompt = `Write a complete guide: "${titleCase(job)} jobs in ${country.name} with visa sponsorship", for ${year}.

COUNTRY CONTEXT (use this — do not substitute another country's system):
${ctx}

Requirements:
- Body MUST be at least ${MIN_WORDS} words of Markdown, and every paragraph must earn its place.
- Open with 2-3 sentences that answer the search intent directly: can this role be sponsored in this
  country, roughly what does it pay, and what route does it run through.
- Cover, with role- and country-specific detail:
  1. What the job actually involves in this country, and why employers there struggle to fill it
  2. What it pays — indicative range, what moves it up or down, how it is usually quoted
  3. The visa route in detail: who initiates it, what the employer must do, what you must provide
  4. Qualifications, licensing or registration specific to this role in this country
     (e.g. professional registration for healthcare, licence conversion for drivers, skills assessment for trades)
  5. Which types of employer actually sponsor this role, and how to identify them
  6. A numbered list of the mistakes that get applications rejected, with the fix for each
  7. A realistic timeline from application to arrival
- Include one Markdown comparison table where it genuinely helps.
- Include a clear scam-warning section: never pay for a job or visa, how to verify a sponsor.
${siblings ? `- Naturally link to 2-3 of these existing guides inside the body:\n${siblings}` : ""}

${FORMAT}`;

  let { meta, body } = splitMetaBody(await claude(prompt, { system, maxTokens: 16000 }));

  // Expand if short rather than shipping thin
  let tries = 0;
  while (wordCount(body) < MIN_WORDS && tries < 2) {
    tries++;
    const more = await claude(
      `This guide is ${wordCount(body)} words; it needs at least ${MIN_WORDS}. Deepen the existing sections with
concrete, country-specific and role-specific detail — do NOT pad with generalities and do NOT repeat points.
Return ONLY the full revised Markdown body, no META block.\n\n${body}`,
      { system, maxTokens: 16000 }
    );
    if (wordCount(more) > wordCount(body)) body = more.trim();
  }

  const slug = slugify(meta.slug || `${job}-jobs-in-${country.name}-with-visa-sponsorship`);
  const jobKeyword = `${job} visa sponsorship`;

  const frontMatter = {
    layout: "article.njk",
    title: meta.title,
    description: meta.description,
    permalink: `/${slug}/`,
    datePublished: todayISO(),
    dateModified: todayISO(),
    category: country.name,
    categorySlug: country.slug,
    // --- these three drive the Indeed CTA + related-article linking ---
    jobKeyword,
    jobKeywordBase: job,
    country: country.country,
    jobFamily: FAMILY[job] || "general",
    standfirst: meta.standfirst,
    keyFigures: meta.keyFigures,
    faq: meta.faq,
    author: CONFIG.author
  };

  const file = writeArticle({ slug, frontMatter, body });
  console.log(`✓ ${job} × ${country.name} → ${slug} (${wordCount(body)} words)`);
  return file;
}

const existing = readArticles();
const skip = new Set();
for (let i = 0; i < COUNT; i++) {
  const made = await generateOne(existing, skip);
  if (!made) break;
  existing.push(...readArticles().slice(-1));
}
console.log("Done.");
