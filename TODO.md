# ProductCard Styling Fix — TODO

## Goal
Fix obstructed styling, wrong arrangement, and sizing in ProductCard to match design system.

## Steps
- [ ] Replace `aspect-[4/5]` with `aspect-[3/4]` on card and expanded images.
- [ ] Replace all hardcoded hex colors with CSS custom properties (`var(--color-*)`).
- [ ] Replace `'Jost'` font with `var(--font-primary)`.
- [ ] Fix card container: use `var(--color-surface-raised)`, `var(--color-border)`, `var(--shadow-sm)`, `var(--radius-lg)`.
- [ ] Fix badge styles: `11px`, weight `600`, `letter-spacing: 0.5px`.
- [ ] Fix price font-weight from `700` to `600`.
- [ ] Replace category pastel backgrounds with `var(--color-secondary)`.
- [ ] Add `:focus-visible` rings to all interactive buttons.
- [ ] Apply all fixes to expanded modal overlay.

