---
name: frontend-development
description: "Use for all frontend tasks in projects using Tailwind CSS v4 + Figma MCP. Covers HTML structure, CSS via @apply, and JS modular architecture. Trigger when generating or modifying HTML/CSS/JS files."
---

# Frontend Development Skill

## HTML Rules

| #   | Rule                                                                                                                                                                                           |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | No classes on `body`, `html`, `header`, `footer` — style via CSS selectors in base.css / layout.css                                                                                            |
| 2   | No inline `style=""` — all styling in CSS files via `@apply`                                                                                                                                   |
| 3   | Every `<a>` needs `href`, `role="link"`, `target`, `aria-label` — each attribute on its own line                                                                                               |
| 4   | Every `<button>` needs `type="button"\|"submit"` and `aria-label` — each attribute on its own line                                                                                             |
| 5   | Every `<section>` gets exactly two classes: `{section-name} general-padding` — name from Figma MCP                                                                                             |
| 6   | Every `<img>` needs `width`, `height`, `alt` on separate lines — `alt` must never be empty                                                                                                     |
| 6a  | Every `<video>` needs `width`, `height`, `preload`, `playsinline` on separate lines                                                                                                            |
| 9   | `<a>` with phone → `href="tel:{n}"`, email → `href="mailto:{e}"`                                                                                                                               |
| 10  | All `<section>` elements must live inside `<main>`                                                                                                                                             |
| 11  | Only these Tailwind classes allowed directly in HTML: `flex`, `flex-col`, `flex-row`, `grid`, `grid-cols-*`, `gap-*`, `p-*`, `m-*`, `max-w-*` — everything else goes in CSS files via `@apply` |
| 12  | Every `<input>` needs a `<label>` linked via matching `for` / `id`                                                                                                                             |
| 13  | Semantic HTML, correct heading hierarchy, all accessibility attributes — Lighthouse SEO score must be high                                                                                     |
| 14  | Pixel-perfect match to Figma. Clean indentation throughout                                                                                                                                     |

**Rule 7 — Headings:** Never put classes directly on h1–h6. Always wrap them:

```html
<div class="title title-black">
  <h1>Heading text</h1>
</div>
```

Color class (e.g. `title-black`) comes from Figma MCP. Generate dynamically per project.

**Rule 8 — Paragraphs:** Never put classes directly on `<p>`. Always wrap them:

```html
<div class="content content-black">
  <p>Paragraph text</p>
</div>
```

Color class (e.g. `content-black`) comes from Figma MCP. Generate dynamically per project.

---

## CSS Rules

**Files:** `style.css` imports in this order → `base.css`, `component.css`, `layout.css`, `utilities.css`

| #   | Rule                                                                                                  |
| --- | ----------------------------------------------------------------------------------------------------- |
| 1   | All styles via `@apply` only — zero raw CSS properties anywhere in any file                           |
| 2   | Responsive styles use `max-*` / `min-*` breakpoint prefixes only — no `@media` queries                |
| 3   | Base and responsive classes in the **same** `@apply` line — never split into separate `@apply` blocks |
| 4   | No `[]` arbitrary values — no `text-[20px]`, `max-w-[452px]`, `leading-[24px]`, etc.                  |
| 5   | No `h-*` or `min-h-*` on any element — `h-full` is the only exception                                 |
| 6   | No `w-*` or `min-w-*` on any element — `w-full` is the only exception                                 |
| 7   | No `@layer` wrappers anywhere                                                                         |
| 8   | No new CSS variables, no `:root` block — reuse only what is already in `style.css`                    |
| 9   | Tailwind v4 classes only                                                                              |

```css
/* ✅ correct — base + responsive in one @apply */
.hero-title {
  @apply text-heading-1 max-768:text-22;
}

/* ❌ wrong — split @apply */
.hero-title {
  @apply text-heading-1;
}
.hero-title {
  @apply max-768:text-22;
}

/* ❌ wrong — arbitrary value */
.hero-title {
  @apply text-[48px];
}
```

---

## `style.css` — `@theme {}` block only

Contains imports, breakpoints, spacing, and design tokens. Nothing else.

**Imports** (in this order):

```css
@import "base.css";
@import "component.css";
@import "layout.css";
@import "utilities.css";
```

**Breakpoints** (always use these exact values):

```css
--breakpoint-1920: 1921px;
--breakpoint-1600: 1601px;
--breakpoint-1512: 1513px;
--breakpoint-1440: 1441px;
--breakpoint-1366: 1367px;
--breakpoint-1199: 1200px;
--breakpoint-1024: 1025px;
--breakpoint-992: 993px;
--breakpoint-768: 769px;
--breakpoint-640: 641px;
--breakpoint-576: 577px;
--breakpoint-425: 426px;
--breakpoint-375: 376px;
```

**Spacing:** `--spacing: 1px;`

**Fetch ALL of these from Figma MCP — never hardcode:**

```css
/* fonts — one variable per unique font family */
--font-{name}: "{Family}", sans-serif;

/* colors — one variable per unique color */
--color-{name}: {hex};

/* font sizes — sort descending, largest = heading-1 */
--text-heading-1: {px};  /* largest */
--text-heading-2: {px};
--text-heading-3: {px};
--text-heading-4: {px};
--text-heading-5: {px};
--text-heading-6: {px};  /* must always generate all 6 */
--text-{size}: {px};     /* remaining sizes e.g. --text-14: 14px */
```

---

## `base.css`

**Headings** — target both tag and class, responsive in same `@apply`:

```css
h1,
.h1 {
  @apply text-heading-1 max-768:text-22;
}
h2,
.h2 {
  @apply text-heading-2 max-768:text-20;
}
h3,
.h3 {
  @apply text-heading-3 max-768:text-18;
}
h4,
.h4 {
  @apply text-heading-4 max-768:text-16;
}
h5,
.h5 {
  @apply text-heading-5 max-768:text-14;
}
h6,
.h6 {
  @apply text-heading-6 max-768:text-12;
}
```

**Paragraphs:**

```css
.content p {
  @apply text-16;
}
.content p + p {
  @apply mt-10;
}
```

**Title colors** — generate one per color from Figma MCP:

```css
.title-{color} h1,
.title-{color} h2,
.title-{color} h3,
.title-{color} h4,
.title-{color} h5,
.title-{color} h6 { @apply text-{color} }
```

**Content colors** — generate one per color from Figma MCP:

```css
.content-{color} p { @apply text-{color} }
```

**Containers** — X-axis padding from Figma MCP, no max-width:

```css
.container-fluid {
  @apply px-50;
}
.container-fluid-md {
  @apply px-80;
}
/* generate as many as Figma defines */
```

**General padding** — Y-axis from Figma MCP, used on every section:

```css
.general-padding {
  @apply max-1199:py-50 max-768:py-30 py-100;
}
```

---

## `component.css`

**Buttons** — base + variants from Figma MCP. All variants need hover + transition:

```css
.btn { @apply px-16 py-8 inline-flex items-center text-center rounded-10 border-1 border-solid cursor-pointer transition-all duration-300 }

.btn-{color} { @apply text-{x} bg-{x} border-{x} hover:bg-{y} hover:text-{y} }
```

**Inputs / Textarea / Select** — match Figma exactly, all via `@apply`, no raw CSS.

---

## `layout.css`

Header and footer styles only. All via `@apply`.

---

## `utilities.css`

Section-specific and extra helper classes only. All via `@apply`.

---

## JavaScript Rules

| #   | Rule                                                                                                                  |
| --- | --------------------------------------------------------------------------------------------------------------------- |
| 1   | Single entry point: `assets/js/app.js` — contains imports only                                                        |
| 2   | One module file per feature: `header.js`, `swiper.js`, etc.                                                           |
| 3   | Default export with `init` prefix in every module                                                                     |
| 4   | `DOMContentLoaded` in `app.js` only — never in other files                                                            |
| 5   | File names in `camelCase`                                                                                             |
| 6   | `let` / `const` only — no `var`                                                                                       |
| 7   | Wrap all logic in `if` guards — never execute without checking element exists                                         |
| 8   | No unnecessary or repeated function calls                                                                             |
| 9   | `getElementById` for unique elements, `querySelector` / `querySelectorAll` for repeated — no `getElementsByClassName` |
| 10  | All Swiper code in `swiper.js`, imported into `app.js`                                                                |
| 12  | GSAP for complex animations — include ScrollTrigger when scroll-based                                                 |

```js
// header.js
export default function initHeader() {
  // logic here
}

// app.js
import initHeader from "./header";
import initSwiper from "./swiper";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  if (header) initHeader();

  const slider = document.querySelector(".swiper");
  if (slider) initSwiper();
});
```
