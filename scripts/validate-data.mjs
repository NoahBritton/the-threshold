import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = process.cwd();
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
const errors = [];
const warn = [];

function fail(message) {
  errors.push(message);
}

function uniqueBy(items, key, label) {
  const seen = new Set();
  for (const item of items) {
    if (seen.has(item[key])) fail(`Duplicate ${label}: ${item[key]}`);
    seen.add(item[key]);
  }
}

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

const sourceSchema = readJson("schemas/source.schema.json");
const timelineSchema = readJson("schemas/timeline-event.schema.json");
const editionSchema = readJson("schemas/edition.schema.json");
const validateSource = ajv.compile(sourceSchema);
const validateTimeline = ajv.compile(timelineSchema);
const validateEdition = ajv.compile(editionSchema);

const sources = readJson("src/_data/sources.json");
const timeline = readJson("src/_data/timeline.json");
const researchQueue = readJson("src/_data/research-queue.json");
const editionDirectory = path.join(root, "src/_data/editions");
const editions = fs.readdirSync(editionDirectory)
  .filter((name) => name.endsWith(".json"))
  .map((name) => ({ file: name, data: JSON.parse(fs.readFileSync(path.join(editionDirectory, name), "utf8")) }));

for (const source of sources) {
  if (!validateSource(source)) {
    fail(`Source ${source.id || "<missing id>"}: ${ajv.errorsText(validateSource.errors, { separator: "; " })}`);
  }
  if (!source.url && !source.notes) fail(`Source ${source.id} has neither URL nor explanatory notes.`);
}

for (const event of timeline) {
  if (!validateTimeline(event)) {
    fail(`Timeline ${event.id || "<missing id>"}: ${ajv.errorsText(validateTimeline.errors, { separator: "; " })}`);
  }
}

for (const { file, data: edition } of editions) {
  if (!validateEdition(edition)) {
    fail(`Edition ${file}: ${ajv.errorsText(validateEdition.errors, { separator: "; " })}`);
  }
  if (["published", "corrected"].includes(edition.status) && !edition.publishedDate) {
    fail(`Published edition ${edition.number} is missing publishedDate.`);
  }
  for (const correction of edition.corrections || []) {
    if (!correction.date) fail(`Edition ${edition.number} has a correction without a date.`);
  }
  for (const story of edition.briefings || []) {
    const hasSources = Array.isArray(story.sourceIds) && story.sourceIds.length > 0;
    const hasClassification = typeof story.classification === "string" && story.classification.length > 0;
    if (["published", "corrected"].includes(edition.status) && !hasSources && !hasClassification) {
      fail(`Published story in edition ${edition.number} lacks sourceIds and editorial classification.`);
    }
  }
}

uniqueBy(sources, "id", "source ID");
uniqueBy(timeline, "id", "timeline ID");
uniqueBy(editions.map(({ data }) => data), "number", "edition number");
uniqueBy(researchQueue, "id", "research queue ID");

const sourceIds = new Set(sources.map((source) => source.id));
const timelineIds = new Set(timeline.map((event) => event.id));
const editionNumbers = new Set(editions.map(({ data }) => data.number));

for (const event of timeline) {
  for (const id of event.sourceIds || []) {
    if (!sourceIds.has(id)) fail(`Timeline event ${event.id} references missing source ${id}.`);
  }
  if (event.status === "confirmed" && (!event.sourceIds || event.sourceIds.length === 0)) {
    fail(`Confirmed timeline event ${event.id} has no sources.`);
  }
  for (const number of event.editionRefs || []) {
    if (!editionNumbers.has(number)) warn.push(`Timeline event ${event.id} references edition ${number}, which is not present.`);
  }
}

for (const item of researchQueue) {
  for (const id of item.sourceIds || []) {
    if (!sourceIds.has(id)) fail(`Research queue item ${item.id} references missing source ${id}.`);
  }
}

for (const { data: edition } of editions) {
  for (const id of edition.sourceIds || []) {
    if (!sourceIds.has(id)) fail(`Edition ${edition.number} references missing source ${id}.`);
  }
  for (const id of edition.timelineHighlights || []) {
    if (!timelineIds.has(id)) fail(`Edition ${edition.number} references missing timeline event ${id}.`);
  }
  for (const story of edition.briefings || []) {
    for (const id of story.sourceIds || []) {
      if (!sourceIds.has(id)) fail(`Edition ${edition.number} story references missing source ${id}.`);
    }
  }
}

if (warn.length) {
  console.warn("Validation warnings:");
  for (const message of warn) console.warn(`  - ${message}`);
}

if (errors.length) {
  console.error("Validation failed:");
  for (const message of errors) console.error(`  - ${message}`);
  process.exit(1);
}

console.log(`Validation passed: ${sources.length} sources, ${timeline.length} timeline events, ${editions.length} editions, ${researchQueue.length} queue items.`);
