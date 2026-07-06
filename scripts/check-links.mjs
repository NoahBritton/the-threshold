import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const sources = JSON.parse(await fs.readFile(path.join(root, "src/_data/sources.json"), "utf8"));
const results = [];

for (const source of sources) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    let response = await fetch(source.url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "TheThresholdLinkAudit/0.1 (+static research archive)" }
    });
    if ([403, 405].includes(response.status)) {
      response = await fetch(source.url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "TheThresholdLinkAudit/0.1 (+static research archive)" }
      });
    }
    results.push({ id: source.id, url: source.url, status: response.status, ok: response.ok, finalUrl: response.url });
  } catch (error) {
    results.push({ id: source.id, url: source.url, status: null, ok: false, error: error.message });
  } finally {
    clearTimeout(timeout);
  }
}

await fs.mkdir(path.join(root, "reports"), { recursive: true });
await fs.writeFile(path.join(root, "reports/link-check.json"), JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2));

for (const result of results) {
  const marker = result.ok ? "OK" : "WARN";
  console.log(`${marker.padEnd(4)} ${String(result.status ?? "ERR").padEnd(4)} ${result.id}`);
}

const failures = results.filter((result) => !result.ok).length;
console.log(`Link audit complete: ${results.length - failures} reachable, ${failures} require manual review. Report: reports/link-check.json`);
// External link failures are reported, not treated as build failures.
