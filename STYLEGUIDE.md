# loserkid Style Guide

A small design system for keeping the blog calm, editorial, and consistent.

## 1. Core principles

- **Reading first** — the site should feel like an essay or magazine, not an app dashboard.
- **Serif for content, sans for UI** — prose and headings inherit the serif voice; metadata, labels, navigation, and side notes use sans.
- **One accent at a time** — `--accent` should highlight a single important thing in a local area, not everything at once.
- **Prefer consistency over precision** — use the approved scale instead of inventing one-off values.

## 2. Color tokens

Defined in `app/globals.css`:

- `--bg` — page background
- `--surface` — elevated surfaces / media blocks
- `--text` — body copy
- `--heading` — headings and strong emphasis
- `--muted` — metadata and secondary UI
- `--accent` — brand/active accent
- `--link` — inline text links

### Accent usage

Use `--accent` for:
- the `loserkid` brand mark
- active or highlighted states
- subtle rails/dividers
- one focal metadata point

Avoid using accent for multiple nearby elements with equal emphasis.

## 3. Typography scale

Assume `1rem = 16px`.

| Role | Token / Tailwind | Use for |
| --- | --- | --- |
| Meta | `text-sm` | dates, labels, nav, sidebars |
| UI / default | `text-base` | short UI text |
| Reading copy | `text-lg` | prose and longform body |
| Section heading | `text-2xl` | internal content sections |
| Page title | `text-3xl` | page and post titles |
| Large title | `text-4xl` | larger desktop headlines |

### Line-height rules

- `leading-tight` — display titles and major headings
- `leading-relaxed` / body leading — paragraph text and reading content

## 4. Spacing scale

Use Tailwind's standard rem-based rhythm:

- `2` → `0.5rem`
- `4` → `1rem`
- `6` → `1.5rem`
- `8` → `2rem`
- `10` → `2.5rem`
- `12` → `3rem`
- `16` → `4rem`

### Guidance

- small UI gaps: `2`, `4`
- paragraph / block rhythm: `4`, `6`, `8`
- major section spacing: `10`, `12`, `16`

## 5. Tailwind conventions

### Prefer
- `text-sm`, `text-base`, `text-lg`, `text-2xl`, `text-3xl`, `text-4xl`
- `mt-4`, `mt-6`, `mt-8`, `mt-10`, `mt-12`
- semantic roles: title, meta, prose, marginalia

### Avoid by default
- arbitrary sizes like `text-[17px]`
- arbitrary spacing unless there is a clear reason
- using the accent color for too many simultaneous states

## 6. Layout roles

- **Main reading column** — where posts and main page content live
- **Marginalia / gutter** — ToC, `Elsewhere`, secondary context on large screens only
- **Footer / archival navigation** — end-of-page material like previous/next

### Sidebar pattern

Use the right gutter only for **secondary context**:
- table of contents
- `Elsewhere` / author links

Do not overload the gutter with too many utilities at the same time.

## 7. Component tone

- **Header** — quiet, minimal, brand-led
- **Post list** — text-first archive, not cards
- **Post body** — clean editorial prose with technical affordances
- **ToC / side notes** — restrained marginalia
- **Previous / next nav** — end-of-article handoff, not promo cards

## 8. Quick checklist before adding styles

Ask:
1. Is this **prose**, **meta**, **structure**, or **interaction**?
2. Can I use an approved text size instead of an arbitrary one?
3. Can I use an approved spacing step instead of guessing?
4. Is the accent already being used nearby?
5. Does this feel editorial, or is it drifting into app UI?
