import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const number = process.argv[2];
const title = process.argv.slice(3).join(" ") || `Dispatch ${number}`;

if (!/^\d{3}$/.test(number || "")) {
  console.error('Usage: npm run new:edition -- 002 "Edition headline"');
  process.exit(1);
}

const file = path.join(process.cwd(), "src/_data/editions", `${number}.json`);
try {
  await fs.access(file);
  console.error(`Edition ${number} already exists.`);
  process.exit(1);
} catch {
  // Expected when the file does not exist.
}

const edition = {
  number,
  slug: number,
  title,
  subtitle: null,
  publishedDate: null,
  updatedDate: new Date().toISOString().slice(0, 10),
  dateline: "THE THRESHOLD // FIELD DISPATCH",
  status: "draft",
  lead: null,
  briefings: [],
  timelineHighlights: [],
  watchList: [],
  corrections: [],
  sourceIds: [],
  editorialNote: null
};

await fs.writeFile(file, `${JSON.stringify(edition, null, 2)}\n`);
console.log(`Created ${path.relative(process.cwd(), file)}`);
