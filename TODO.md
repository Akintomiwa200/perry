# Fix Scattered Auth UI (login, signup, forgot-password)

## Plan Overview
- Create shared auth components for consistency
- Remove inline styles → use CSS classes/CSS vars
- Unify forms with artisan boutique theme
- Ensure responsive/mobile-first

## Steps
- [x] Step 1: Create new shared components (AuthCard.tsx, AuthInput.tsx, ErrorAlert.tsx)
- [x] Step 2: Update ui/Input.tsx and ui/Button.tsx (remove inline styles)
- [x] Step 3: Refactor app/(auth)/layout.tsx (pure classes)
- [x] Step 4: Refactor login/page.tsx using new components
- [x] Step 5: Refactor register/page.tsx
- [ ] Step 6: Refactor forgot-password/page.tsx
- [ ] Step 7: Test UI (pnpm dev, check all pages/states)
- [ ] Step 8: Minor globals.css tweaks if needed

**Current Progress: Step 6 ✅ Complete. All auth pages refactored with unified UI. Step 7: Test (run `pnpm dev`, check /login, /register, /forgot-password for consistent artisan theme, no scattered styles). No globals.css changes needed.**
