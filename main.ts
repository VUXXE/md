/**
 * Driver for the markdown-render-speed-01 benchmark. The harness invokes this
 * file with Node, reads `{ id, markdown }` cases from `cases.json`, and writes
 * the rendered HTML strings to `html.json` in the same order. Benchmark entries
 * keep this input/output contract and provide a compatible `parse()` function.
 * Outside the container, the MAKEFUN_* variables can override the default
 * `/input` and `/output` directories.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from './parse.js';

/** One Markdown item supplied by the benchmark harness. */
interface MarkdownCase {
  id: string;
  markdown: string;
}

/** Read cases, render each Markdown string, and write the ordered HTML result. */
function main(): void {
  const inputDirectory = process.env.MAKEFUN_INPUT_DIR ?? '/input';
  const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const cases = JSON.parse(
    readFileSync(join(inputDirectory, 'cases.json'), 'utf8'),
  ) as MarkdownCase[];
  const html: string[] = cases.map(({ markdown }) => parse(markdown));

  writeFileSync(join(outputDirectory, 'html.json'), JSON.stringify(html));
}

main();
