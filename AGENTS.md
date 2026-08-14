# open-slide — Agent Guide

You are authoring **slides** in this repo. Every slide is arbitrary React code that you write.

## Project

This repo produces an OpenSlide presentation that introduces Feature-Sliced Design.

- Treat the deck, presenter notes, and slide assets as the primary deliverable.
- Write audience-facing content and presenter notes in Traditional Chinese unless the user requests another language.
- Confirm one decision at a time before changing the audience, duration, content scope, narrative, or visual direction.
- Use OpenSlide's bundled skills for slide authoring and the installed `feature-sliced-design` skill for subject-matter decisions.
- Treat [fsd.how](https://fsd.how/) and pages under that domain as the canonical source for current FSD guidance. Do not use or cite the legacy `feature-sliced.design` domain: the speaker reports that the original project lost the domain and could not recover it, and its current content is not controlled by the FSD project. The official `feature-sliced` GitHub organization may be used for repository history and release provenance, but `fsd.how` prevails for current guidance.
- Clearly label historical guidance, project-specific conventions, speaker-supplied history, and interpretation. Until a first-party source for the domain-loss chronology is linked, present that chronology as speaker context rather than an independently verified official statement.
- In the finished talk, explain the source choice for roughly 20–30 seconds near the start of the just-in-time FSD primer: introduce FSD, establish `fsd.how` as the current official source, then proceed to layers, slices, segments, and dependency rules. Do not count the domain story as one of the real architecture pitfall cases.
- After editing slides, visually inspect every changed page and run the project build before completion.

## Hard rules

- Put your slide under `slides/<kebab-case-id>/`.
- The entry is `slides/<id>/index.tsx`.
- Put slide-specific images/videos/fonts under `slides/<id>/assets/`. For assets reused across decks or themes (logos, avatars), use the global `assets/` folder and import via `@assets/...`.
- Do **not** touch `package.json`, `open-slide.config.ts`, or other slides.
- Do not add dependencies. Use only `react` and standard web APIs.

## Which skill to use

- **Drafting a new deck** — use the `create-slide` skill. It walks through scoping questions, structure, and hand-off.
- **Applying inspector comments** (`@slide-comment` markers in a page) — use the `apply-comments` skill.
- **Creating or extracting a theme** — use the `create-theme` skill. Themes live as markdown under `themes/<id>.md` and are read by `create-slide` before authoring.
- **Resolving "this page" / "this element"** — when the user references the current slide or selection without naming it, consult the `current-slide` skill. It reads the dev server's `node_modules/.open-slide/current.json` to find which slide, page, and inspector-picked element they mean.
- **Any other slide edit** — read the `slide-authoring` skill before writing. It is the technical reference for everything inside `slides/<id>/`: file contract, the 1920×1080 canvas, type scale, palette, layout, assets, self-review checklist, and anti-patterns. `create-slide` and `apply-comments` both defer to it for the _how_.

Keep slide implementation guidance in the skills above. Keep this file limited to project-level routing and hard rules.

## Updating skills

The skills above are managed by `@open-slide/core`. Do not edit them in place. To pull the latest versions:

```
pnpm up @open-slide/core
pnpm sync:skills
```

`pnpm dev` will also detect drift on startup and offer to sync. `pnpm sync:skills --dry-run` (via `pnpm exec open-slide sync:skills --dry-run`) previews changes without writing.
