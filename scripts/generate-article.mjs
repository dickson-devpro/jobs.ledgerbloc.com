// scripts/generate-article.mjs — drafts COUNT new articles from the keyword map (default 1)
import { CONFIG, claude, splitMetaBody, slugify, wordCount, todayISO, readArticles, tocFromBody, writeArticle } from "./lib.mjs";

const MIN_WORDS = CONFIG.minWords;
const COUNT = Math.max(1, Math.min(40, parseInt(process.env.COUNT || "1", 10) || 1));

const system = `You are the senior finance editor for a consumer finance publication. You write accurate,
non-misleading, genuinely useful long-form content. Finance is a sensitive (YMYL) topic: never invent
statistics presented as current market data, never promise outcomes, never give individualised financial
advice. Use worked examples labelled as illustrative. Write for search intent: answer the question early,
then go deep.
AUDIENCE: This publication serves foreign nationals and immigrants who are starting, funding, or running a
business in the United States, plus those relocating for work. Frame every topic around their realities:
no US credit history, SSN vs ITIN, treaty-country eligibility, cross-border banking, and how immigration
status interacts with commercial decisions. STRICT BOUNDARY: this is practical business and financial
information, NEVER immigration legal advice or tax advice — where a decision turns on visa eligibility or
tax liability, direct readers to a licensed immigration attorney or CPA. Never predict case outcomes,
approval odds, or policy changes.
Follow the output format EXACTLY as instructed.`;

const FORMAT = `Respond in EXACTLY this format (no markdown fences, nothing before or after):
===META===
{"title": "keyword-rich title, 55-70 chars",
 "description": "meta description, 140-160 chars",
 "standfirst": "2 sentence editorial standfirst",
 "slug": "url-slug",
 "keyFigures": [{"label": "...", "value": "...", "note": "..."}, {"...": "..."}, {"...": "..."}],
 "faq": [{"q": "...", "a": "2-4 sentence answer"}, ... 8 items]}
===BODY===
The full Markdown article body here (## sections, ### subsections). No H1. No FAQ section — FAQ lives in META only.`;

function pickTopic(existing, skip) {
  for (const cluster of CONFIG.clusters) {
    for (const keyword of cluster.keywords) {
      if (skip.has(keyword)) continue;
      const kwWords = keyword.toLowerCase().split(" ").filter((w) => w.length > 3);
      const needed = Math.max(2, Math.ceil(kwWords.length * 0.7));
      const covered = existing.some((a) => {
        const t = (a.fm.title || "").toLowerCase();
        return kwWords.filter((w) => t.includes(w)).length >= needed;
      });
      if (!covered) return { cluster, keyword };
    }
  }
  return null;
}

async function generateOne(index, skip) {
  const existing = readArticles(); // re-read so each article links to & avoids the previous ones
  const pick = pickTopic(existing, skip);
  if (!pick) {
    console.log("All keywords covered — stopping.");
    return false;
  }
  const { cluster, keyword } = pick;
  console.log(`[${index}/${COUNT}] Generating: "${keyword}" [${cluster.category}]`);

  try {
  const linkList = existing.map((a) => `- "${a.fm.title}" -> ${a.fm.permalink} (${a.fm.category})`).join("\n");
  const existingTitles = existing.map((a) => a.fm.title || "").join("\n");

  const prompt = `Write a complete article for the "${cluster.category}" section targeting the search topic: "${keyword}".
The year is ${todayISO().slice(0, 4)}.

Requirements:
- Body MUST be at least ${MIN_WORDS} words of Markdown, but never padded — every paragraph earns its place.
- Open with a bolded 2-3 sentence hook that directly and specifically answers the search intent (no throat-clearing).
- Demonstrate real expertise: name the actual forms, agencies, thresholds, and processes involved (e.g. IRS Form,
  USCIS, specific visa categories, real institution types) so the piece reads like it was written by a practitioner.
- Structure for scanning: clear H2/H3 headings phrased as the questions readers actually ask, short paragraphs.
- Include where genuinely useful: a comparison table, a numbered common-mistakes section with concrete fixes,
  worked illustrative examples with realistic figures, and a short FAQ of 4-6 real questions.
- ACCURACY DISCIPLINE: this is a YMYL topic. Never invent specific statutes, dollar figures, dates, or approval odds
  as if verified. Frame figures as illustrative ranges, say when something varies by case, and tell the reader exactly
  which official source or licensed professional to verify with. Never predict immigration outcomes.
- Write in clear UK-neutral English, plain and authoritative, never hypey or salesy. No emoji.
- Naturally link to 2-3 of these existing articles inside the body using Markdown links:
${linkList || "- (none yet — skip internal links)"}
- Do NOT duplicate these existing titles:
${existingTitles || "(none)"}

${FORMAT}`;

  let { meta, body } = splitMetaBody(await claude(prompt, { system, maxTokens: 16000 }));

  for (let attempt = 0; attempt < 2 && wordCount(body) < MIN_WORDS; attempt++) {
    const count = wordCount(body);
    console.log(`  Body is ${count} words (< ${MIN_WORDS}) — expanding...`);
    body = (
      await claude(
        `This article body is ${count} words but must be at least ${MIN_WORDS}. Expand it with additional
substantive sections (deeper worked examples, an extra comparison, edge cases, a step-by-step walkthrough).
Do not pad or repeat. Keep all existing content and links.
Respond with ONLY the full expanded Markdown body — no JSON, no delimiters, no commentary.

ARTICLE BODY:
${body}`,
        { system, maxTokens: 20000 }
      )
    ).trim();
  }

  const finalCount = wordCount(body);
  if (finalCount < MIN_WORDS) {
    console.error(`  Still ${finalCount} words after expansion — skipping this topic.`);
    skip.add(keyword);
    return true;
  }

  const slug = slugify(meta.slug || meta.title);
  const today = todayISO();
  const sameCategory = existing.filter((a) => a.fm.categorySlug === cluster.categorySlug && a.fm.permalink);
  const pool = (sameCategory.length ? sameCategory : existing.filter((a) => a.fm.permalink)).slice(-3);
  const related = pool.map((a) => ({ title: a.fm.title, url: a.fm.permalink, category: a.fm.category }));

  const frontMatter = {
    layout: "article.njk",
    title: meta.title,
    description: meta.description,
    category: cluster.category,
    categorySlug: cluster.categorySlug,
    permalink: `/${cluster.categorySlug}/${slug}/`,
    datePublished: today,
    dateModified: today,
    standfirst: meta.standfirst,
    author: CONFIG.author,
    keyFigures: meta.keyFigures,
    keyFiguresAsOf: today,
    toc: tocFromBody(body),
    faq: meta.faq,
    related
  };

  const file = writeArticle({ slug, frontMatter, body });
  console.log(`  Published ${file} — ${finalCount} words, ${(meta.faq || []).length} FAQs.`);
  return true;
  } catch (err) {
    fails.set(keyword, (fails.get(keyword) || 0) + 1);
    if (fails.get(keyword) >= 2) {
      skip.add(keyword);
      console.error(`  "${keyword}" failed twice (${err.message}) — skipping it this run.`);
    } else {
      console.error(`  "${keyword}" failed (${err.message}) — will retry.`);
    }
    return true;
  }
}

const skip = new Set();
const fails = new Map();
let published = 0;
let attempts = 0;
while (published < COUNT && attempts < COUNT * 2) {
  attempts++;
  const before = readArticles().length;
  const more = await generateOne(published + 1, skip);
  if (!more) break;
  if (readArticles().length > before) published++;
}
console.log(`Run complete — ${published} article(s) processed.`);
if (published === 0) process.exit(1);
