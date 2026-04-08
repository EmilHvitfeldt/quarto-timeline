# quarto-timeline

A Quarto extension for adding styled timelines to HTML documents and revealjs presentations.

## Installation

```bash
quarto add EmilHvitfeldt/quarto-timeline
```

## Usage

Add the filter to your document YAML:

```yaml
filters:
  - timeline
```

Then write timelines as nested divs with `.timeline` and `.event`:

```markdown
::: timeline
::: {.event data-label="2020"}
**Project Started**
Initial concept and planning phase.
:::
::: {.event data-label="2021"}
**First Release**
Launched version 1.0 to early users.
:::
:::
```

## Layouts

| Class | Description |
|---|---|
| *(default)* | Horizontal — line across top, events below |
| `.vertical` | Line down left, content to the right |
| `.vertical-right` | Line down right, content to the left |
| `.vertical-alt` | Alternating left/right |

## Fragment Pan Modes (revealjs only)

For timelines with more events than fit on one slide, add a pan mode class to `.timeline`:

| Class | Behavior |
|---|---|
| `.fragment-slide` | Centers the active event as each fragment appears |
| `.fragment-conveyor` | Steps left/down only when events would be clipped |

## Documentation

<https://emilhvitfeldt.github.io/quarto-timeline/>
