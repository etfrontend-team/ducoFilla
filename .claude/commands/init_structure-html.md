# Initialize Project Structure

Set up a new Tailwind CSS project with the following steps in sequential order.

---

## Step 1 — Initialize npm

```bash
npm init -y
```

## Step 2 — Install Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/cli
```

---

## Step 3 — Create Folder Structure

Create the following directories and files from the project root:

```
root/
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── base.css
│   │   ├── component.css
│   │   ├── layout.css
│   │   └── utilities.css
│   ├── js/
│   │   └── app.js
│   ├── images/
│   └── videos/
├── pages/
│   └── index.html
├── scripts/
│   ├── check-assets.sh
│   └── check-headings.mjs
└── netlify.toml
```

Run these commands to create all folders and files:

```bash
# Create directories
mkdir -p assets/css assets/js assets/images assets/videos pages scripts

# Create CSS files
touch assets/css/style.css
touch assets/css/base.css
touch assets/css/component.css
touch assets/css/layout.css
touch assets/css/utilities.css

# Create JS file
touch assets/js/app.js

# Create HTML entry point
touch pages/index.html

# Create script files
touch scripts/check-assets.sh
touch scripts/check-headings.mjs

# Create Netlify config
touch netlify.toml
```

---

## Step 4 — Populate `assets/css/style.css`

Add the following imports at the top of `assets/css/style.css`:

```css
@import "tailwindcss";
@import "./base.css";
@import "./component.css";
@import "./layout.css";
@import "./utilities.css";
```

---

## Step 5 — Install Prettier with Tailwind Plugin

```bash
npm install --save-dev prettier prettier-plugin-tailwindcss
```

---

## Step 6 — Create `.prettierrc` at Root

Create a `.prettierrc` file at the project root and paste:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"],
  "singleQuote": true,
  "semi": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "jsxSingleQuote": true,
  "singleAttributePerLine": true,
  "bracketSameLine": true,
  "printWidth": 200
}
```

---

## Step 7 — Install ESLint

```bash
npm install --save-dev eslint @eslint/js @eslint/json @html-eslint/eslint-plugin @html-eslint/parser globals
```

---

## Step 8 — Create `eslint.config.mjs` at Root

```js
import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import html from "@html-eslint/eslint-plugin";
import json from "@eslint/json";

const customHtml = {
  rules: {
    "require-main": {
      meta: { type: "problem", schema: [] },
      create(context) {
        let mainFound = false;
        return {
          Tag(node) {
            if (node.name === "main") {
              mainFound = true;
            }
          },
          "Program:exit"(node) {
            if (!mainFound) {
              context.report({
                node,
                message: "Page must contain a <main> element",
              });
            }
          },
        };
      },
    },
    "no-javascript-href": {
      meta: { type: "problem", schema: [] },
      create(context) {
        return {
          Tag(node) {
            if (node.name !== "a" || !Array.isArray(node.attributes)) {
              return;
            }

            const hrefAttr = node.attributes.find(
              (attr) =>
                attr?.key?.value === "href" &&
                typeof attr?.value?.value === "string",
            );

            if (!hrefAttr) {
              return;
            }

            const hrefValue = hrefAttr.value.value.trim().toLowerCase();
            if (hrefValue.startsWith("javascript:")) {
              context.report({
                node: hrefAttr,
                message:
                  "Anchor href cannot use javascript: URLs (e.g. javascript:void(0)).",
              });
            }
          },
        };
      },
    },
  },
};

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "module" } },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["scripts/**/*.mjs", "scripts/**/*.js"],
    languageOptions: { globals: { ...globals.node, process: "readonly" } },
    rules: { "no-console": "off" },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "no-console": "error",
      "no-debugger": "error",
      "no-alert": "error",
      "no-use-before-define": "error",
      "no-duplicate-imports": "error",
      "no-var": "error",
    },
  },
  {
    files: [".prettierrc"],
    plugins: { json },
    language: "json/json",
    rules: {
      "json/no-duplicate-keys": "error",
    },
  },
  {
    files: ["**/*.html"],
    plugins: { "@html-eslint": html, custom: customHtml },
    extends: [html.configs["flat/recommended"]],
    rules: {
      "@html-eslint/no-duplicate-id": "error",
      "@html-eslint/no-multiple-empty-lines": "error",
      "@html-eslint/indent": "off",
      "@html-eslint/no-extra-spacing-tags": "off",
      "@html-eslint/require-img-alt": "error",
      "@html-eslint/require-attrs": [
        "error",
        { tag: "a", attr: "href" },
        { tag: "a", attr: "role", value: "link" },
        { tag: "a", attr: "aria-label" },
        { tag: "a", attr: "target" },
        { tag: "button", attr: "type" },
        { tag: "button", attr: "aria-label" },
        { tag: "img", attr: "width" },
        { tag: "img", attr: "height" },
        { tag: "img", attr: "loading", value: "lazy" },
        { tag: "video", attr: "width" },
        { tag: "video", attr: "height" },
        { tag: "video", attr: "playsinline" },
        { tag: "video", attr: "preload" },
      ],
      "@html-eslint/no-multiple-h1": "error",
      "@html-eslint/require-closing-tags": "off",
      "custom/require-main": "error",
      "custom/no-javascript-href": "error",
    },
  },
]);
```

---

## Step 9 — Install Husky + lint-staged

```bash
npm install --save-dev husky lint-staged
```

---

## Step 10 — Update `package.json`

Inside the `scripts` object, add both entries:

```json
"build": "npx tailwindcss -i ./assets/css/style.css -o ./dist/style.css --watch",
"prepare": "husky"
```

Also add the `lint-staged` config at root level of `package.json`:

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx,html}": ["eslint --fix"],
  "*.{js,jsx,ts,tsx,html,css}": ["prettier --write"]
}
```

---

## Step 11 — Populate `scripts/check-assets.sh`

```bash
#!/bin/bash

MAX_IMAGE_BYTES=$((500 * 1024))    # 500 KB
MAX_VIDEO_BYTES=$((10 * 1024 * 1024))  # 10 MB

has_error=0
mode="${1:-staged}"

if [ "$mode" = "tracked" ]; then
  files=$(git ls-files)
else
  files=$(git diff --cached --name-only --diff-filter=ACM)
fi

get_size() {
  stat -f%z "$1" 2>/dev/null || stat -c%s "$1" 2>/dev/null || wc -c < "$1"
}

while IFS= read -r file; do
  [ -z "$file" ] && continue
  [ ! -f "$file" ] && continue

  if echo "$file" | grep -qiE '^assets/images?/'; then
    if echo "$file" | grep -qiE '\.(jpe?g|png)$'; then
      echo -e "\033[31mASSET\033[0m $file — .jpg, .jpeg, and .png are not allowed in assets/image(s)"
      has_error=1
    fi

    size=$(get_size "$file")
    if [ "$size" -gt "$MAX_IMAGE_BYTES" ]; then
      echo -e "\033[31mASSET\033[0m $file — $(( size / 1024 ))KB exceeds 500KB image limit"
      has_error=1
    fi
  fi

  if echo "$file" | grep -qiE '^assets/videos?/' && echo "$file" | grep -qiE '\.(mp4|webm|mov|avi|mkv|flv|ogv)$'; then
    size=$(get_size "$file")
    if [ "$size" -gt "$MAX_VIDEO_BYTES" ]; then
      size_mb=$(awk "BEGIN { printf \"%.2f\", $size/1024/1024 }")
      echo -e "\033[31mASSET\033[0m $file — ${size_mb}MB exceeds 10MB video limit"
      has_error=1
    fi
  fi
done <<< "$files"

if [ "$has_error" -eq 1 ]; then
  if [ "$mode" = "tracked" ]; then
    echo -e "\nOptimize assets before pushing.\n"
  else
    echo -e "\nOptimize assets before committing.\n"
  fi
  exit 1
fi
```

Make it executable:

```bash
chmod +x scripts/check-assets.sh
```

---

## Step 12 — Populate `scripts/check-headings.mjs`

```js
#!/usr/bin/env node
import { execSync } from "child_process";
import { readFileSync, existsSync } from "fs";

const staged = execSync("git diff --cached --name-only --diff-filter=ACM", {
  encoding: "utf8",
})
  .split("\n")
  .filter((f) => f.trim().endsWith(".html"));

let hasError = false;

for (const file of staged) {
  if (!file.trim() || !existsSync(file)) {
    continue;
  }

  const html = readFileSync(file, "utf8");
  const headingRegex = /<h([1-6])[\s>][^>]*>/gi;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const line = html.slice(0, match.index).split("\n").length;
    headings.push({ level: parseInt(match[1]), line });
  }

  if (headings.length === 0) {
    continue;
  }

  if (headings[0].level !== 1) {
    process.stderr.write(
      `\x1b[31mHEADING\x1b[0m ${file}:${headings[0].line} — First heading is h${headings[0].level}, must start with h1\n`,
    );
    hasError = true;
  }

  for (let i = 1; i < headings.length; i += 1) {
    const previous = headings[i - 1];
    const current = headings[i];

    if (current.level > previous.level + 1) {
      process.stderr.write(
        `\x1b[31mHEADING\x1b[0m ${file}:${current.line} — Heading level skips from h${previous.level} to h${current.level}. Use h${previous.level + 1} before h${current.level}\n`,
      );
      hasError = true;
    }
  }
}

if (hasError) {
  process.stderr.write("\nFix heading hierarchy errors before committing.\n\n");
  process.exit(1);
}
```

---

## Step 13 — Init Husky and Create Git Hooks

```bash
npm run prepare
```

Create `.husky/pre-commit`:

```bash
node scripts/check-headings.mjs
bash scripts/check-assets.sh
npx lint-staged
```

Create `.husky/pre-push`:

```bash
bash scripts/check-assets.sh tracked
```

---

## Step 14 — Populate `pages/index.html`

Paste the following boilerplate into `pages/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="/dist/style.css" />
  </head>
  <body>
    <main></main>
    <script type="module" src="/assets/js/app.js"></script>
  </body>
</html>
```

---

## Step 15 — Create `.gitignore` at Root

```
dist
.vscode
node_modules
package-lock.json
**/.DS_Store
.claude
.claudeignore
.gitignore
CLAUDE.md
```

---

## Step 16 — Create `netlify.toml` at Root

```toml
[build]
  command = "npx tailwindcss -i ./assets/css/style.css -o ./dist/style.css"
  publish = "."

[[redirects]]
  from = "/"
  to = "/pages/index.html"
  status = 200
```

---

## Step 17 — Run the Build

```bash
npm run build
```

Compiles Tailwind, outputs final CSS to `dist/style.css`. Keep running in background while developing.

---

## Notes

- Run all commands from the **project root**.
- Run Steps 1–2 before creating files so `package.json` and `node_modules` are in place.
- `assets/images/` — no `.jpg`, `.jpeg`, `.png` allowed; use `.webp` or `.svg`. Max 500KB per file.
- `assets/videos/` — video files max 10MB per file.
- `style.css` is the main entry point; other CSS files import into it.
- Keep `npm run build` running in a separate terminal — it watches for changes.
- Pre-commit hook runs: heading hierarchy check → asset size check → lint-staged (ESLint + Prettier).
- Pre-push hook runs: asset size check across all tracked files.
