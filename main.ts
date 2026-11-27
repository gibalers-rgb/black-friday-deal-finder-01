// Deal Beacon — black-friday-deal-finder-01 entry (Node 22, standard library
// only). The site is the plain static files in this directory's app/
// folder: an index.html that opens in a browser with no build step and no
// network request, its deals held in its own app/deals.js, every deal found
// and checked by the maker on 27 Nov 2026. This program hands the entry in:
// it copies app/ and screenshots/ from beside this file into the output
// directory and writes output/dossier.json, the summary the judge reads
// (the screenshots, the first load's files and bytes, and the source), using
// the vendored make.fun library. vendor/makefun-frontend.ts must stay as
// the kit shipped it: the scorer rebuilds the dossier with its own copy and
// requires the two to match byte for byte.
//
// Run it outside the grader with MAKEFUN_OUTPUT_DIR standing in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Start from a clean output directory so a stale file from an earlier run
// can never ride along into the hand-in.
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

cpSync(join(repoRoot, 'app'), join(outDir, 'app'), { recursive: true });
mkdirSync(join(outDir, 'screenshots'), { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), join(outDir, 'screenshots'), {
    recursive: true,
  });
}

// The caps match the scorer's own: at most 4 screenshots, each at most
// 256 KiB; app/ at most 993 files and directories and 16 MiB in all; the
// dossier text at most 160 KiB. buildDossier refuses anything past them,
// so a bad hand-in fails here instead of at the gate.
writeFileSync(
  join(outDir, 'dossier.json'),
  buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
