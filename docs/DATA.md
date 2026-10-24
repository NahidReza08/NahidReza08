# GitHub data and asset sources

## Snapshot: 24 October 2026

### Contribution history

The public GitHub profile calendar contains **88 contributions across 297 days**, 1 January–24 October 2026. The calendar and monthly trend use the unchanged daily snapshot in `assets/github-contributions.json`. These are publicly visible profile contributions, not a count of public commits alone; anonymized private activity can appear if enabled by the account owner. October is partial. Source-branch analysis does not alter contribution counts.

### Public Repository Code Composition

This chart now measures **1,181,788 UTF-8 source bytes** on **one selected branch/commit per each of 21 non-fork public repositories**. It replaces the earlier default-branch languages-API chart completely; values from the two methods are not mixed. Java is **46,969 measured bytes (3.97%)**, shown separately with an unchanged proportional bar and a readable numeric label. The top six languages are labelled; Java is additionally labelled because its verified share falls outside those six, and all remaining languages are grouped as Other. No value is boosted to make Java more prominent.

**This is repository code composition, not proficiency, professional experience or a claim of sole authorship.** Learning/scaffold source and the repository tracking another learner's practice can be included because the scope is owned public repositories; forks are excluded uniformly. Employer code is not accessed or estimated.

#### Measurement method

1. Inspect all public repository metadata. Exclude repositories marked as forks, consistently. For each other repository inspect the default branch and existing conventional `main`, `master`, `develop` and `dev` branches. Prefer the default branch when it contains eligible source; otherwise select the conventional branch with the largest eligible source inventory. Never combine duplicate branches. Empty/source-free repositories remain recorded with zero bytes.
2. Resolve each selected branch to the immutable commit below and use its recursive Git tree. Fail on a truncated inventory or unavailable source rather than estimating bytes.
3. Read source from that exact commit without executing it. Measure UTF-8 text bytes (including source comments/whitespace and existing line endings). Notebook files contribute only code-cell source, joined by newlines: outputs, metadata, Markdown and checkpoint copies are excluded. File records include the measured source SHA-256, path, language and bytes, never raw source or credential values.
4. Classify programming/markup files by documented extensions (Java, C#, JavaScript/JSX/MJS/CJS, TypeScript/TSX, Python/notebook code, C/C++, PHP/Blade, Svelte, HTML, CSS/SCSS/Sass, Shell/PowerShell, SQL, ShaderLab/HLSL/GLSL and Vue). Recognize Dockerfile, Jenkinsfile (Groovy) and Makefile. Svelte/Blade count as their host language rather than splitting embedded languages; .h is treated as C. This is a reproducible Linguist-style approximation, not GitHub Linguist's exact classifier.
5. Exclude dependency/vendor/generated/editor paths: node_modules, Unity Library/Temp/Logs/Packages, TextMesh Pro/Standard Assets, vendor, dist/build/builds/bin/obj, .git/.idea/.vscode, coverage, .next/.svelte-kit, __pycache__ and notebook checkpoints. Exclude minified/bundled/generated file suffixes. Images, video, archives, compiled binaries, model weights, datasets, docs/config files and unrecognized extensions do not contribute.
6. Aggregate the complete measured dataset under this same method. Percentage labels round measured byte shares; small values use two decimal places. Every repo is counted once. Detailed records and exclusions: [github-source-composition.json](../assets/github-source-composition.json).

#### Selected repositories

| Repository | Selected branch | Commit | Measured bytes |
|---|---|---|---:|
| AmazonProduct | master | [00de8656fd](https://github.com/NahidReza08/AmazonProduct/commit/00de8656fd9952e515c9ac8de04e3f3f44829074) | 99,005 |
| AVOID-THE-PIEDRA | main | [25c6806a5a](https://github.com/NahidReza08/AVOID-THE-PIEDRA/commit/25c6806a5a84b4ae8c4d377339b4f2399a71c753) | 20,665 |
| BLOCK-THE-BALLS | master | [ffdddd831b](https://github.com/NahidReza08/BLOCK-THE-BALLS/commit/ffdddd831b821ce1f8e2c6dfac125cb1aac8e6ea) | 10,939 |
| Consumable-Tracker | master | [a7db2bc87d](https://github.com/NahidReza08/Consumable-Tracker/commit/a7db2bc87d53409eb97fdd371146362dff7f687d) | 33,021 |
| CSV_Editor | main | [f5ddf98d76](https://github.com/NahidReza08/CSV_Editor/commit/f5ddf98d761ce964f9603d11b1a3b68d8d2f0b9d) | 8,511 |
| devops_assignment | main | [329dea5abe](https://github.com/NahidReza08/devops_assignment/commit/329dea5abef38a6c6f3295579ddbd0825c735b72) | 787 |
| DockerBlocks | develop | [cb97d1309b](https://github.com/NahidReza08/DockerBlocks/commit/cb97d1309be989d2ea97797993e8e267018afbdd) | 204,308 |
| dsi-abderrahmanebouzemlal | main | [31f1e7a217](https://github.com/NahidReza08/dsi-abderrahmanebouzemlal/commit/31f1e7a217c5de1287c636f1334e8c0adce0fb10) | 386,478 |
| E-Commerce | main | [204603a20b](https://github.com/NahidReza08/E-Commerce/commit/204603a20b27db39f01674a7b883affa7ca63fb3) | 42,462 |
| e-commerce-with-redux | master | [638b441767](https://github.com/NahidReza08/e-commerce-with-redux/commit/638b4417673a3e5f44b07f751bec91e3ca56779c) | 57,376 |
| IAOR-Group-29-Handwritten-Character-Classification | main | [91cfeea2c4](https://github.com/NahidReza08/IAOR-Group-29-Handwritten-Character-Classification/commit/91cfeea2c46c1bdc53785ba6693cb873eb11cdc8) | 116,503 |
| LoginSystem | main | [e092e67ece](https://github.com/NahidReza08/LoginSystem/commit/e092e67ece119a012bd63f28ce9735a29142e3a7) | 106,811 |
| NahidReza08 | main | [5258c6a8b3](https://github.com/NahidReza08/NahidReza08/commit/5258c6a8b33b7f3b131c0427ac27636f4639ccad) | 0 |
| Real-Time-Face-Mask-Detection | master | [4dd92c65a6](https://github.com/NahidReza08/Real-Time-Face-Mask-Detection/commit/4dd92c65a645fc00f9df24a0b34fdaf8f65c58bc) | 7,615 |
| RESUME-NahidReza | main | [cdb32090c5](https://github.com/NahidReza08/RESUME-NahidReza/commit/cdb32090c5f4dae86efade96092b9f9393211a91) | 17,818 |
| Resume_NahidReza | main | [65e8d68af2](https://github.com/NahidReza08/Resume_NahidReza/commit/65e8d68af2020f0464b300c38f90c6d1e1d0bcc2) | 17,564 |
| Svelte-Basic | main | [a3dc392df5](https://github.com/NahidReza08/Svelte-Basic/commit/a3dc392df5fafeaa0785b574b61c0b888800b676) | 7,761 |
| Todo | dev | [52a62791ab](https://github.com/NahidReza08/Todo/commit/52a62791ab5be1cf9e26c6b12122a807bbd9e782) | 8,256 |
| Todos-App | main | [b4d588e226](https://github.com/NahidReza08/Todos-App/commit/b4d588e226b4ed025bbdf23957b491810f1ed160) | 19,679 |
| twitter-scrapper | master | [82918c5893](https://github.com/NahidReza08/twitter-scrapper/commit/82918c5893d485cab8efc3bf49ef5b7c11faae49) | 2,281 |
| Vehicle-Showroom | main | [b58d2e193f](https://github.com/NahidReza08/Vehicle-Showroom/commit/b58d2e193ffcc569e00b35598ee90b6f108bf318) | 13,948 |

**Excluded repositories:** Module-5-deployment (fork), Module-7 (fork), OSTAD-Assignment-module-3 (fork). No selected repository was inaccessible, and no recursive tree was truncated.

#### Manual refresh

With a current Node.js runtime, run from the profile repository root:

```sh
# Refresh only the public contribution calendar/trend:
npm run refresh:activity
# Re-measure the entire source-composition dataset, then redraw:
npm run refresh:composition
```

No dependency install or scheduled workflow is required. The analyzer can read an optional GITHUB_TOKEN from the process environment to avoid low anonymous API limits; never save a token in source, JSON or commands committed to Git. It is sent only to api.github.com. Raw source stays in memory; optional API metadata cache is external when PROFILE_ANALYSIS_CACHE is set. Review new dates/counts in README and this document after a refresh. If GitHub rate limits requests, changes markup or denies a source file, preserve the old snapshot and resolve the failure before publishing.

## Official logo/icon sources

- **DSI:** [official logo asset](https://www.dsinnovators.com/images/svgs/dsi_logo_navbar.svg), referenced by the [official company website](https://www.dsinnovators.com/). The original SVG is stored unchanged at assets/logos/dsi-official.svg; a proportional copy is placed on a neutral dark panel for both themes, with original colours intact. No endorsement is implied.
Institutional identity: the SUST crest is copied unchanged from the official admissions portal (https://admission.sust.edu.bd/images/sust-logo.png). Bauhaus-Universität Weimar uses only the university-name strip of the official artwork supplied by the owner: https://intern.uni-weimar.de/fileadmin/user/fak/gestaltung/hauptseiten/downloads/Logos/Web/deutsch/Logo_Fak_KunstGestaltung_dunkelblau.png . A 709 × 83 SVG viewport clips the 709 × 142 original PNG without recolouring, stretching or reproducing the faculty subtitle. The faculty designation is not displayed and no faculty affiliation is implied.
- **LinkedIn badge icon:** [Font Awesome Free 7.3.1, official source](https://github.com/FortAwesome/Font-Awesome/blob/7.x/svgs/brands/linkedin-in.svg), distributed under [CC BY 4.0 for icons](https://fontawesome.com/license/free). The original brand path is used without changing proportions.
- **Technology marks:** Simple Icons 16.35.0 (CC0-1.0) where available; original labelled monograms for eight unavailable marks. Brand/trademark rights remain with their owners.
- Other hero/card/interest artwork is decorative original vector artwork. None is a certificate preview or fabricated application screenshot.

## Project and publication attribution

DockerBlocks credits its upstream ideas/early code in the source repository; the classification project retains its original Group 29 coursework context. The user confirmed Face Mask Detection as an individual camera mask/no-mask project. Both branches were checked: main has README/archive material, while [master](https://github.com/NahidReza08/Real-Time-Face-Mask-Detection/tree/master) contains the notebooks. They use ImageNet-pretrained MobileNetV2 and an OpenCV/Caffe face detector. Dataset provenance and additional upstream attribution are incomplete; no pretrained-model authorship, accuracy or deployment claim is made. The notebooks were inspected, not run.

The publication title and WebSci 2021 venue match DOI metadata for [10.1145/3447535.3462508](https://doi.org/10.1145/3447535.3462508). No authorship order, awards or citation counts were added. Course certificates, contest participation and personal interests are explicitly distinct from technical proficiency. Supplied achievement totals are not GitHub activity metrics.


### Illustrated layout revision

Project illustrations are decorative artwork, not application screenshots. The DSI logo is embedded unchanged at its original 137:48 aspect ratio in the full-width employment banner. SUST crest source: https://admission.sust.edu.bd/images/sust-logo.png (official admission portal). University and company trademarks identify the respective institutions; no endorsement is implied. GitHub native HTML tables supply readable text, spacer-column gutters and keyboard-operable details. Rounded borders belong to the SVG headers; native table bodies use GitHub borders. No custom README CSS or JavaScript is required.

Education uses a two-cell native layout with a spacer gutter and individually linked rounded cards. Long names, degrees and dates use purpose-designed mobile variants rather than shrinking desktop text. Logos keep their original colours and proportions; the SUST crest has no added white panel.


### Responsive artwork and accessible text

Breakpoint-only picture sources precede theme-only sources, avoiding combined breakpoint/theme conditions. Compact mobile assets use a theme-neutral navy palette with high-contrast text; desktop light/dark assets follow GitHub theme selection. All artwork is self-contained SVG without external fonts, images or scripts. Professional card images have full descriptive alternative text, and native expandable responsibilities also contain selectable project information and complete technology lists. Public-project and education grids use native two-cell rows with spacer gutters; mobile images are intentionally reflowed while the grid stays two columns.
