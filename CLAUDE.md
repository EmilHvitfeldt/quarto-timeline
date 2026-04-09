# quarto-timeline

## Project structure

There are two Quarto projects in this repo:

- **Root** (`/`) — standalone RevealJS examples, rendered with `quarto render <file>.qmd`
- **`docs/`** — the documentation website, rendered with `quarto render docs/` or individual pages with `quarto render docs/<page>.qmd`

The extension lives at `_extensions/timeline/` (four files: `_extension.yml`, `timeline.lua`, `timeline.css`, `timeline.js`).

## Extension lookup in `docs/`

`docs/` is its own Quarto project root and cannot find the extension in the parent directory. A symlink fixes this:

```
docs/_extensions → ../_extensions
```

Do not delete this symlink.

## Filter placement in `_quarto.yml`

The filter **must** be at the top level of `_quarto.yml`, not nested under `format.html`. Quarto treats `format.html.filters` entries as raw Pandoc executables, not extension filters.

```yaml
# Correct
filters:
  - timeline

# Wrong — breaks silently
format:
  html:
    filters:
      - timeline
```

## CSS pseudo-elements

In `timeline.css`, the two pseudo-elements have specific roles — easy to mix up:

- `.event::before` → **label** (the date/text label)
- `.event::after` → **dot** (the circular marker)

## CSS sizing: rem not em

All `--tl-dot-size` and `--tl-snake-radius` defaults use `rem`, not `em`. RevealJS sets a large font size (~40px) on its container, which causes `em` values to scale up unexpectedly. `rem` anchors to the HTML root (16px) and stays consistent across both HTML documents and RevealJS presentations.

## Dot positioning math

The hardcoded `-30px` in dot/label offset formulas (e.g. `calc(-30px - var(--tl-dot-size) / 2)`) is derived from each layout's fixed padding:

- Horizontal: 80px top padding, line at 50px → 30px gap
- Vertical: 70px left padding, line at 40px → 30px gap

If the layout padding ever changes, these offsets must be updated to match.

## Render commands

```bash
# Render the full docs site
quarto render docs/

# Render a single doc page
quarto render docs/customization.qmd

# Render a root-level RevealJS example
quarto render examples/fragment-slide.qmd
```
