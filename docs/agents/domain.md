# Domain Docs

How agents should consume the presentation's subject-matter and decision documentation.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root — when present, it records the talk's purpose, audience, duration, language, scope, narrative, and glossary.
- **`docs/adr/`** — read ADRs relevant to the content, visual system, source policy, or OpenSlide implementation being changed.

If these files do not exist, proceed silently. Create them lazily through the domain-modeling workflow when terminology or a durable decision is actually resolved.

## File structure

This repo uses a single-context layout:

```
/
├── CONTEXT.md
├── docs/
│   ├── adr/
│   └── agents/
├── slides/
├── themes/
└── assets/
```

## Vocabulary and evidence

Feature-Sliced Design is the presentation's subject matter.

- Use the canonical vocabulary from the installed `feature-sliced-design` skill and current official guidance at `fsd.how`.
- Distinguish current FSD guidance from historical versions, project-specific conventions, and the author's interpretation.
- Prefer primary sources for factual or version-specific claims.
- Keep source details in presenter notes when putting them directly on a slide would harm readability.
- Use the glossary in `CONTEXT.md` consistently once it exists.

## Flag conflicts

If proposed content contradicts an existing ADR or the documented talk scope, surface the conflict before changing the presentation.
