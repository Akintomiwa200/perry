# Changelog

All notable changes to the **Perry** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- Notification read state persistence with `admin_notification_reads` table
- Global toast notification system (Zustand + React)
- Real-time data fetching for admin product sections (removed hardcoded data)
- Modern dashboard UI with stats cards, grid/table toggle
- New `/api/collections` endpoint

### Changed
- Refactored `AdminProductsTable` — now uses `/api/products` with live search/filter
- Refactored `AdminReviewsTable` — now uses `/api/reviews` with approve/reject actions
- Refactored `AdminCategoriesTable` — now uses `/api/categories` with real data
- Refactored `AdminTagsTable` — now uses `/api/tags` with real data
- Refactored `AdminCollectionsTable` — now uses `/api/collections`
- Updated `AdminSettingsClient` to use toast notifications instead of inline messages
- Updated `AdminHeader` to persist notification read state to backend

### Fixed
- TypeScript errors in checkout page (ShippingOptionId type mismatch)
- TypeScript errors in `AdminCustomersTable` (parameter typing)
- TypeScript errors in API routes (field name mismatches)
- Proper handling of `session.id` (string) vs `order.user_id` (number)

---

## [0.1.0] - 2024-04-28

### Added
- Initial project scaffold with Next.js 16, TypeScript, Tailwind CSS 4
- PostgreSQL database schema (`db/schema.sql`)
- User authentication (JWT-based, admin + customer roles)
- Product catalog with categories, tags, collections
- Shopping cart and checkout flow
- Paystack payment integration
- Admin dashboard (products, orders, customers, settings)
- Wishlist and product reviews
- Inventory management with stock adjustments
- Coupon system
- Address management
- Order tracking and cancellation
- Search with real-time suggestions
- Responsive design with mobile-first approach
