import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const editionsDirectory = path.join(projectRoot, "src", "_data", "editions");
const pathPrefix = process.env.PATH_PREFIX || "/";

function readEditionData() {
  if (!fs.existsSync(editionsDirectory)) return [];

  return fs
    .readdirSync(editionsDirectory)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const absolutePath = path.join(editionsDirectory, file);
      return JSON.parse(fs.readFileSync(absolutePath, "utf8"));
    })
    .sort((a, b) => b.number.localeCompare(a.number));
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/.nojekyll": ".nojekyll" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  eleventyConfig.addGlobalData("editionList", readEditionData);

  eleventyConfig.addFilter("formatDate", (value, options = {}) => {
    if (!value) return "Date unresolved";
    const date = new Date(`${value}T12:00:00Z`);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: options.short ? "short" : "long",
      day: options.omitDay ? undefined : "numeric",
      timeZone: "UTC"
    }).format(date);
  });

  eleventyConfig.addFilter("publishedEditions", (items = []) =>
    (Array.isArray(items) ? items : Object.values(items || {})).filter((item) => ["published", "corrected"].includes(item.status))
  );

  eleventyConfig.addFilter("take", (items = [], count = 1) =>
    (Array.isArray(items) ? items : Object.values(items || {})).slice(0, Number(count))
  );

  eleventyConfig.addFilter("resolveSources", (ids = [], sources = []) => {
    const idSet = new Set(ids || []);
    return sources.filter((source) => idSet.has(source.id));
  });

  eleventyConfig.addFilter("resolveEvents", (ids = [], timeline = []) => {
    const idSet = new Set(ids || []);
    return timeline.filter((event) => idSet.has(event.id));
  });

  eleventyConfig.addFilter("statusLabel", (value = "unknown") =>
    value
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );

  eleventyConfig.addFilter("compactNumber", (value) =>
    new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value)
  );

  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));

  eleventyConfig.addShortcode("currentYear", () => new Date().getUTCFullYear());

  return {
    pathPrefix,
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
