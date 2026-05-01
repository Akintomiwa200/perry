# Release Process#

## Pre-release Checklist#

- [ ] All tests pass (`npm test` or manual verification)
- [ ] Lint passes (`npm run lint`)
- [ ] TypeScript check passes (`npm run type-check`)
- [ ] Build succeeds (`npm run build`)
- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md` with all notable changes
- [ ] Update `README.md` if there are breaking changes
- [ ] Ensure `.env.example` is up to date
- [ ] Database migrations are documented
- [ ] All new APIs are documented
- [ ] Security review completed (if applicable)

## Release Steps#

### 1. Prepare Release Branch#

```bash
git checkout main
git pull origin main
git checkout -b release/vX.X.X
```

### 2. Update Version#

Update `package.json`:

```json
{
  "version": "X.X.X"
}
```

### 3. Update Changelog#

Follow the format in `CHANGELOG.md`:

```markdown
## [X.X.X] - YYYY-MM-DD

### Added
- New feature A
- New feature B

### Changed
- Modified feature C
- Updated dependency D

### Fixed
- Bug fix E
- Security fix F

### Removed
- Deprecated feature G
```

### 4. Commit & Push#

```bash
git add .
git commit -m "chore: release vX.X.X"
git push origin release/vX.X.X
```

### 5. Create GitHub Release#

1. Go to [GitHub Releases](https://github.com/yourusername/perry/releases/new)
2. Tag version: `vX.X.X`
3. Release title: `Perry vX.X.X`
4. Copy changelog entries for this version
5. Attach build artifacts if applicable
6. Publish release

### 6. Merge to Main#

```bash
git checkout main
git merge release/vX.X.X
git push origin main
```

### 7. Deploy#

```bash
# Deploy to production
npm run build
npm run start
```

## Semantic Versioning#

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (`X.0.0`) — Breaking changes
- **MINOR** (`0.X.0`) — New features (backward compatible)
- **PATCH** (`0.0.X`) — Bug fixes (backward compatible)

## Release Types#

### 🚀 Major Release (X.0.0)#

**Criteria:**
- Breaking API changes
- Database schema changes requiring migration
- Major UI/UX overhaul
- Dependencies with breaking changes

**Examples:**
- `1.0.0` — Initial stable release
- `2.0.0` — Complete admin dashboard rewrite

### ✨️ Minor Release (0.X.0)#

**Criteria:**
- New features
- New API endpoints
- New admin sections
- Non-breaking enhancements

**Examples:**
- `0.2.0` — Add product reviews feature
- `0.3.0` — Add real-time notifications

### 🐛 Patch Release (0.0.X)#

**Criteria:**
- Bug fixes
- Security patches
- Performance improvements
- Documentation updates

**Examples:**
- `0.1.1` — Fix checkout page TypeScript errors
- `0.1.2` — Fix SQL query in orders API

## Hotfix Process#

For critical production issues:

```bash
git checkout main
git checkout -b hotfix/critical-bug
# Make minimal fix
git commit -m "fix: critical bug in checkout"
git push origin hotfix/critical-bug
# Create PR to main
# After merge, cherry-pick to release branch if needed
```

## Pre-release Testing#

```bash
# Full build test
npm run build

# Manual testing checklist:
# [ ] Homepage loads
# [ ] Products can be browsed
# [ ] Cart functionality works
# [ ] Checkout flow completes
# [ ] Admin dashboard accessible
# [ ] Products can be added/edited
# [ ] Orders display correctly
# [ ] Payments process (test mode)
```

## Post-release#

- [ ] Monitor error tracking (if configured)
- [ ] Update documentation site (if applicable)
- [ ] Announce release (if public project)
- [ ] Close associated milestones/issues

## Example Release Notes#

```markdown
## Perry v0.2.0 — "Notification Persistence & Modern UI"

### 🎉️ New Features#
- ✅ Notification read state persistence (per-admin)
- ✅ Global toast notification system
- ✅ Real-time data in admin product sections
- ✅ Modern dashboard UI with stats cards
- ✅ Grid/Table view toggle for products

### 🔧 Refactored#
- Removed all hardcoded data from admin sections
- Admin products, categories, tags, collections now use live APIs
- Checkout page TypeScript fixes

### 🐛 Bug Fixes#
- Fixed TypeScript errors in orders API
- Fixed products API field name mismatches
- Fixed admin customers table type issues

### 📦 Documentation#
- Added LICENSE (MIT)
- Added CONTRIBUTING.md
- Added SECURITY.md
- Added CHANGELOG.md
- Updated README.md with full documentation

### ⬆️ Breaking Changes#
None in this release.
```
