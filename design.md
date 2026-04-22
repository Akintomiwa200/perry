# Perry Collectibles — Cafe Design System

> A cozy café-inspired interface that blends warm tones, soft typography, and clean layouts to create a relaxed, trustworthy browsing experience for collectibles enthusiasts.

---

## 1. Context & Goals

Perry Collectibles is a premium e-commerce platform for rare and unique collectibles. The UI should feel like a warm, curated shop — inviting, unhurried, and trustworthy. The Cafe design system achieves this through earthy warm tones, generous whitespace, soft Poppins typography, and deliberately restrained component density.

---

## 2. Design Tokens & Foundations

### Color Palette

| Token         | Value     | Usage                                      |
|---------------|-----------|--------------------------------------------|
| `primary`     | `#5D4432` | CTAs, active states, links, brand accents  |
| `secondary`   | `#E9E3DD` | Backgrounds, soft fills, tag chips         |
| `success`     | `#16A34A` | Order confirmed, in-stock badges           |
| `warning`     | `#D97706` | Low stock, pending status                  |
| `danger`      | `#DC2626` | Errors, out-of-stock, destructive actions  |
| `surface`     | `#F9F7F5` | Page backgrounds, card surfaces            |
| `text`        | `#3E2B1E` | Body copy, headings, labels                |
| `text-muted`  | `#8C7B6E` | Captions, placeholders, secondary labels   |
| `border`      | `#DDD5CE` | Dividers, input borders, card outlines     |
| `overlay`     | `rgba(62,43,30,0.5)` | Modals, drawers backdrop          |

### CSS Custom Properties (globals.css)
```css
:root {
  --color-primary: #5D4432;
  --color-primary-hover: #4A3527;
  --color-primary-light: #7D6250;
  --color-secondary: #E9E3DD;
  --color-success: #16A34A;
  --color-warning: #D97706;
  --color-danger: #DC2626;
  --color-surface: #F9F7F5;
  --color-surface-raised: #FFFFFF;
  --color-text: #3E2B1E;
  --color-text-muted: #8C7B6E;
  --color-border: #DDD5CE;
  --color-overlay: rgba(62, 43, 30, 0.5);

  --font-primary: 'Poppins', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  --shadow-sm: 0 1px 3px rgba(62,43,30,0.08);
  --shadow-md: 0 4px 12px rgba(62,43,30,0.10);
  --shadow-lg: 0 8px 24px rgba(62,43,30,0.12);
}
```

### Typography Scale

| Role          | Size    | Weight | Font      | Line Height |
|---------------|---------|--------|-----------|-------------|
| `display`     | 48–64px | 700    | Poppins   | 1.1         |
| `h1`          | 36px    | 700    | Poppins   | 1.2         |
| `h2`          | 28px    | 600    | Poppins   | 1.25        |
| `h3`          | 22px    | 600    | Poppins   | 1.3         |
| `h4`          | 18px    | 500    | Poppins   | 1.4         |
| `body-lg`     | 16px    | 400    | Poppins   | 1.6         |
| `body`        | 14px    | 400    | Poppins   | 1.6         |
| `body-sm`     | 12px    | 400    | Poppins   | 1.5         |
| `label`       | 12px    | 500    | Poppins   | 1.4         |
| `mono`        | 13px    | 400    | JetBrains | 1.5         |

### Spacing Scale
`2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px`

---

## 3. Component Rules

### Buttons

**Anatomy:** `[icon?] [label]` — always have a visible label (no icon-only buttons in primary actions).

| Variant    | Background          | Text        | Border               |
|------------|---------------------|-------------|----------------------|
| `primary`  | `--color-primary`   | `#FFFFFF`   | none                 |
| `secondary`| `--color-secondary` | `--color-text` | none              |
| `outline`  | transparent         | `--color-primary` | `--color-primary` |
| `ghost`    | transparent         | `--color-primary` | none              |
| `danger`   | `--color-danger`    | `#FFFFFF`   | none                 |

- **Must** have `border-radius: var(--radius-md)` (10px).
- **Must** use `font-weight: 500`, `font-size: 14px`, `padding: 10px 20px`.
- **Must** show `:focus-visible` ring: `outline: 2px solid var(--color-primary); outline-offset: 2px`.
- **Should** include a loading spinner state when async actions are triggered.
- **Don't** use low-contrast ghost buttons on `--color-secondary` backgrounds.

### Inputs & Forms

- Height: `44px` minimum (touch target).
- Border: `1px solid var(--color-border)`, `border-radius: var(--radius-md)`.
- Focus: border color `var(--color-primary)`, `box-shadow: 0 0 0 3px rgba(93,68,50,0.15)`.
- Error state: border `var(--color-danger)`, helper text in `--color-danger` below the field.
- Labels: `font-size: 12px`, `font-weight: 500`, `color: var(--color-text)`, always above the field.
- Placeholder: `color: var(--color-text-muted)`.

### Cards

- Background: `var(--color-surface-raised)` (#FFFFFF).
- Border: `1px solid var(--color-border)`.
- Border-radius: `var(--radius-lg)` (16px).
- Shadow: `var(--shadow-sm)`.
- Hover: `transform: translateY(-2px)`, `box-shadow: var(--shadow-md)`, transition `200ms ease`.
- Padding: `24px`.

### Product Cards

- Image aspect ratio: `3/4` (portrait) for consistency.
- Image background: `var(--color-secondary)`.
- Price: `font-weight: 600`, `color: var(--color-text)`.
- Sale price: `color: var(--color-danger)`, original price struck through in `var(--color-text-muted)`.
- "Add to Cart" button appears on hover (desktop) or always visible (mobile).

### Badges / Chips

- `font-size: 11px`, `font-weight: 600`, `text-transform: uppercase`, `letter-spacing: 0.5px`.
- `border-radius: var(--radius-full)`.
- `padding: 3px 10px`.
- Variants: `new` (primary bg), `sale` (danger bg), `low-stock` (warning bg), `sold-out` (neutral).

### Navigation / Header

- Background: `#FFFFFF`, `border-bottom: 1px solid var(--color-border)`.
- Height: `64px` desktop, `56px` mobile.
- Logo: Poppins 700, `color: var(--color-primary)`.
- Nav links: `font-weight: 500`, `font-size: 14px`, `color: var(--color-text)`.
- Active/hover: `color: var(--color-primary)`.
- Cart icon: badge count uses `var(--color-primary)` background.

### Modals & Drawers

- Backdrop: `var(--color-overlay)`, `backdrop-filter: blur(4px)`.
- Panel: `background: var(--color-surface-raised)`, `border-radius: var(--radius-xl)` (top only for mobile sheets).
- Always trap focus. Dismiss with Escape key.
- `max-width: 560px` for modals on desktop.

### Alerts / Toasts

- `border-radius: var(--radius-md)`.
- `border-left: 4px solid [variant-color]`.
- Include an icon matching the variant (✓ success, ⚠ warning, ✕ error, ℹ info).
- Auto-dismiss after 4 seconds for success toasts; info/error require manual dismiss.

### Pagination

- Current page: filled `var(--color-primary)` background.
- Other pages: `var(--color-secondary)` background, `var(--color-text)` text.
- `border-radius: var(--radius-sm)`.

---

## 4. Accessibility Requirements

- **Must** meet WCAG 2.2 AA contrast ratios: 4.5:1 for body text, 3:1 for large text.
- **Must** have visible `:focus-visible` on all interactive elements.
- **Must** use semantic HTML (`<button>`, `<nav>`, `<main>`, `<header>`, `<footer>`).
- All images **must** have descriptive `alt` text; decorative images use `alt=""`.
- Modals **must** manage focus and announce role via `aria-modal="true"`.
- Form errors **must** be associated with inputs via `aria-describedby`.
- Color **must not** be the sole indicator of state (add icons or labels).

### Testable Criteria
- [ ] Tab order is logical and matches visual order.
- [ ] All CTAs are reachable and activatable by keyboard alone.
- [ ] Screen reader announces modal open/close events.
- [ ] Error messages are read aloud when form is submitted.
- [ ] Contrast ratio ≥ 4.5:1 for all body text.

---

## 5. Content & Tone Standards

- **Labels**: Title Case for navigation, Sentence case for body and form labels.
- **CTAs**: Action verbs — "Add to Cart", "View Collection", "Continue to Shipping".
- **Error messages**: Human, specific — "That email is already in use" not "Error 409".
- **Empty states**: Helpful and warm — "No items here yet. Start exploring →".
- **Don't** use generic placeholder copy like "Lorem Ipsum" in any shipped component.

---

## 6. Anti-Patterns

| ❌ Don't                                          | ✅ Do instead                                    |
|---------------------------------------------------|--------------------------------------------------|
| Use raw hex values in components                 | Use CSS custom properties / Tailwind tokens       |
| Place text on `--color-secondary` at < 12px      | Increase size or use `--color-text` on white      |
| Stack multiple primary buttons side-by-side      | Use primary + ghost or primary + outline          |
| Use `font-weight: 400` for UI labels             | Use `font-weight: 500` for all interactive labels |
| Inconsistent border-radius across components     | Always use tokens (`--radius-sm/md/lg/xl`)        |
| Show full-page spinners for every async action   | Show inline skeletons or button loading states    |

---

## 7. QA Checklist (Code Review)

- [ ] All colors reference CSS tokens, not raw hex values.
- [ ] All interactive elements have hover, focus, active, and disabled states.
- [ ] Typography uses only Poppins (or JetBrains Mono for code).
- [ ] All spacing uses the 2/4/8/12/16/24/32/48 scale.
- [ ] Border radii use token variables only.
- [ ] Forms have labels, placeholders, and error states.
- [ ] Cards have hover transitions.
- [ ] Mobile breakpoints tested at 375px, 768px, 1024px, 1280px.
- [ ] Lighthouse accessibility score ≥ 90.
- [ ] No hardcoded color values in component files.
