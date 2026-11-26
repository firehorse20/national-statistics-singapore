// Singapore in Numbers — the hand-in program (Node 22, standard library only).
//
// The site is plain static files under app/ (index.html plus its own ES
// modules and CSS, no build step, nothing loaded over the network), and
// screenshots/ holds the maker's renders of it. This program copies both
// folders beside this file into the output directory and writes
// dossier.json there, the summary the judge reads, using the vendored
// make.fun dossier library. Leave vendor/makefun-frontend.ts untouched:
// the scorer rebuilds the dossier with its own copy and compares bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail fast with a plain message when the site is missing, instead of
// handing the scorer a half-built output directory.
const indexHtml = join(here, 'app', 'index.html');
if (!existsSync(indexHtml) || readFileSync(indexHtml).length === 0) {
  throw new Error('app/index.html is missing or empty: the site was not built');
}

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The scorer's own caps (from the kit's gate): only text_max_bytes shapes
// the bytes; the others refuse an entry the scorer would refuse (more than
// 4 screenshots or one over 256 KiB; more than 993 files and directories in
// app/ or 16 MiB of app files).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
