const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  // Markdown with auto heading ids (for TOC anchors); bodies are NOT run
  // through Nunjucks, so article content can safely contain braces.
  // slugify matches scripts/lib.mjs so pipeline-built TOCs always resolve.
  const slugify = (s) => s.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  eleventyConfig.setLibrary("md", markdownIt({ html: true }).use(markdownItAnchor, { slugify }));
  // Static passthroughs — copied as-is to the built site
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  // Human-readable dates: 2026-07-17 → 17 Jul 2026
  eleventyConfig.addFilter("readableDate", (value) => {
    if (!value) return "";
    const d = new Date(value);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  });

  eleventyConfig.addFilter("slugify", slugify);

  /* -- Indeed search URLs: evergreen, country-aware, always fresh -- */
  const INDEED_DOMAIN = {
    usa: "www.indeed.com",
    canada: "ca.indeed.com",
    uk: "uk.indeed.com",
    ireland: "ie.indeed.com",
    germany: "de.indeed.com",
    netherlands: "nl.indeed.com",
    france: "fr.indeed.com",
    australia: "au.indeed.com",
    "new-zealand": "nz.indeed.com",
    uae: "ae.indeed.com",
    qatar: "qa.indeed.com",
    singapore: "sg.indeed.com"
  };

  eleventyConfig.addFilter("indeedUrl", (keyword, country, location) => {
    const host = INDEED_DOMAIN[String(country || "").toLowerCase()] || "www.indeed.com";
    // Keep queries broad enough to return results: strip visa jargon, cap at 3 words.
    // Over-specific queries ("welder 482 visa sponsorship") return nothing on Indeed.
    const JARGON = /\b(482|457|186|189|h-?1b|h-?2a|h-?2b|eb-?[0-9]|lmia|tss|blue card|skilled worker|certificate of sponsorship|sponsorship|sponsor|visa)\b/gi;
    let clean = String(keyword || "").replace(JARGON, " ").replace(/\s+/g, " ").trim();
    if (!clean) clean = String(keyword || "jobs").replace(/\s+/g, " ").trim();
    clean = clean.split(" ").slice(0, 3).join(" ");
    const q = encodeURIComponent(clean).replace(/%20/g, "+");
    let url = "https://" + host + "/jobs?q=" + q;
    if (location) url += "&l=" + encodeURIComponent(String(location).trim()).replace(/%20/g, "+");
    url += "&fromage=7&sort=date";
    return url;
  });

  eleventyConfig.addFilter("countryLabel", (slug) => {
    const map = {
      usa: "the United States", canada: "Canada", uk: "the UK", ireland: "Ireland",
      germany: "Germany", netherlands: "the Netherlands", france: "France",
      australia: "Australia", "new-zealand": "New Zealand", uae: "the UAE",
      qatar: "Qatar", singapore: "Singapore"
    };
    return map[String(slug || "").toLowerCase()] || "abroad";
  });

  // Insert a block of HTML after the Nth </p> of the rendered body.
  // Used to place the related-guides block mid-article for internal navigation.
  eleventyConfig.addFilter("injectAfterParagraph", (content, html, n) => {
    if (!html) return content;
    const target = Math.max(1, parseInt(n, 10) || 5);
    let count = 0, done = false;
    return String(content).replace(/<\/p>/g, (m) => {
      count++;
      if (!done && count === target) { done = true; return m + html; }
      return m;
    });
  });

  eleventyConfig.addFilter("relatedJobs", (articles, current, n) => {
    const limit = n || 3;
    const cur = current || {};
    const pool = (articles || []).filter((a) => a.url !== cur.url);
    const score = (a) => {
      let s = 0;
      if (a.data.country && a.data.country === cur.country) s += 2;
      if (a.data.jobFamily && a.data.jobFamily === cur.jobFamily) s += 3;
      if (a.data.categorySlug === cur.categorySlug) s += 1;
      return s;
    };
    return pool.sort((a, b) => score(b) - score(a)).slice(0, limit);
  });

  // Reading time from rendered content
  eleventyConfig.addFilter("readingTime", (content) => {
    const words = String(content).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 225));
  });

  // Content pipeline status: mirror the generator's coverage heuristic
  eleventyConfig.addGlobalData("pipeline", () =>
    JSON.parse(require("node:fs").readFileSync("data/pipeline.json", "utf8"))
  );
  eleventyConfig.addFilter("keywordStatus", (clusters, articles) => {
    return (clusters || []).map((cluster) => {
      const keywords = cluster.keywords.map((kw) => {
        const words = kw.toLowerCase().split(" ").filter((w) => w.length > 3);
        const needed = Math.max(2, Math.ceil(words.length * 0.7));
        const match = (articles || []).find((a) => {
          const t = (a.data.title || "").toLowerCase();
          return words.filter((w) => t.includes(w)).length >= needed;
        });
        return { keyword: kw, covered: !!match, title: match ? match.data.title : null, url: match ? match.url : null };
      });
      return {
        category: cluster.category,
        keywords,
        done: keywords.filter((k) => k.covered).length,
        total: keywords.length
      };
    });
  });

  // Inject "after-paragraph" ad blocks into rendered article HTML
  eleventyConfig.addFilter("injectAds", (content, blocks, pageType) => {
    if (!blocks || !blocks.length) return content;
    const act = blocks.filter((b) =>
      b.enabled && b.position === "after-paragraph" &&
      (b.pages === "all" || b.pages === pageType) && parseInt(b.paragraph, 10) > 0
    );
    if (!act.length) return content;
    const wrap = (b) => (b.devices && b.devices !== "all")
      ? `<template class="lb-ad-tpl" data-device="${b.devices}">${b.code}</template>`
      : `<div class="ad-block">${b.code}</div>`;
    let count = 0;
    return content.replace(/<\/p>/g, (m) => {
      count++;
      const hits = act.filter((b) => parseInt(b.paragraph, 10) === count);
      return hits.length ? m + hits.map(wrap).join("") : m;
    });
  });

  // All articles, newest first
  eleventyConfig.addCollection("articles", (api) =>
    api.getFilteredByGlob("src/articles/*.md").sort(
      (a, b) => new Date(b.data.datePublished) - new Date(a.data.datePublished)
    )
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk"
  };
};
