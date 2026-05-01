# Perry — Luxury Fashion & Beauty E-Commerce Platform

![Perry Logo](public/logo.png)

Perry is a modern, full-stack e-commerce platform built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS**, **PostgreSQL**, and **Redux Toolkit**. It features a luxury fashion & beauty storefront with a comprehensive admin dashboard.

## Features

### Customer-Facing
- 🛍️ **Product Browse** — Filter by category, price, brand, tags
- 🔍 **Advanced Search** with real-time suggestions
- 🛒 **Shopping Cart** — Add, update, remove items
- 💳 **Checkout** — Address management, shipping options, Paystack integration
- 👤 **User Accounts** — Profile, order history, wishlist
- ⭐ **Reviews & Ratings** — Product reviews with moderation
- 📱 **Fully Responsive** — Mobile-first design

### Admin Dashboard
- 📊 **Dashboard** — Stats, revenue charts, traffic sources
- 📦 **Product Management** — CRUD, categories, tags, collections
- 📋 **Order Management** — Status tracking, cancellations
- 👥 **Customer Management** — Customer list with stats
- ⚙️ **Settings** — Store config, notifications, shipping, payments
- 🔔 **Real-time Notifications** — Per-admin read state persistence
- 🍞 **Toast Notifications** — Success/error feedback for all actions

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| State Mgmt | Redux Toolkit + Zustand |
| Database | PostgreSQL (pg) |
| Auth | JWT (jose) |
| Payments | Paystack |
| UI Library | Lucide React (icons) |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Animations | Framer Motion |

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Paystack account (for payments)

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/perry.git
cd perry
npm install
```

### 2. Environment Setup

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Fill in the required variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/perry

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# Paystack
PAYSTACK_PUBLIC_KEY=your-paystack-public-key
PAYSTACK_SECRET_KEY=your-paystack-secret-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

```bash
# Create the database
createdb perry

# Run the schema
psql perry -f db/schema.sql
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

## Project Structure

```
perry/
├── app/                    # Next.js App Router
│   ├── (shop)/            # Customer-facing routes
│   │   ├── page.tsx           # Homepage
│   │   ├── shop/              # Shop/products
│   │   ├── product/           # Product details
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout flow
│   │   └── account/           # User account
│   ├── admin/             # Admin dashboard
│   │   ├── products/          # Product management
│   │   ├── orders/           # Order management
│   │   ├── customers/        # Customer management
│   │   └── settings/         # Admin settings
│   └── api/               # API routes
│       ├── products/          # Products API
│       ├── orders/            # Orders API
│       ├── auth/              # Authentication API
│       └── admin/            # Admin APIs
├── components/             # React components
│   ├── ui/                 # UI primitives
│   ├── shop/               # Shop components
│   └── admin/              # Admin components
├── lib/                    # Utilities & helpers
├── hooks/                  # Custom React hooks
├── store/                  # Redux store
├── db/                     # Database schema & migrations
└── public/                 # Static assets
```

## Database Schema

The database schema is defined in `db/schema.sql`. Key tables:

- `users` — User accounts
- `products` — Product catalog
- `categories` — Product categories
- `orders` — Customer orders
- `order_items` — Order line items
- `reviews` — Product reviews
- `wishlists` — User wishlists
- `carts` — Shopping carts
- `admin_settings` — Admin configuration
- `admin_notification_reads` — Notification read state

## Admin Access

1. Register an admin account at `/auth/admin/register`
2. Login at `/auth/admin/login`
3. Access the admin dashboard at `/admin`

## API Endpoints

### Public APIs
- `GET /api/products` — List products (with filters)
- `GET /api/products/[slug]` — Get single product
- `GET /api/categories` — List categories
- `GET /api/search` — Search products

### Admin APIs
- `GET /api/admin/settings` — Get admin settings
- `PUT /api/admin/settings` — Update settings
- `GET /api/admin/notifications` — Get notifications
- `PUT /api/admin/notifications` — Update read state
- `GET /api/admin/stats` — Get dashboard stats

### Protected APIs
- `GET /api/orders` — List user orders
- `POST /api/orders` — Create new order
- `GET /api/cart` — Get user cart
- `POST /api/cart/items` — Add to cart

## Key Features Implementation

### Notification Read State Persistence
Per-admin notification read state is persisted in `admin_notification_reads` table:
- Tracks which notifications each admin has read
- Persists across sessions
- Real-time updates when marking as read

### Toast Notification System
Global toast notifications using Zustand:
- Success, error, and info toast types
- Auto-dismiss with configurable duration
- Stack multiple toasts

### Modern Admin Dashboard
- Real-time data fetching (no hardcoded data)
- Stats cards with live counts
- Grid/Table view toggle for products
- Advanced filtering and search

## Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) before submitting PRs.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Support

For support, email hello@perrycollectibles.com or open an issue on GitHub.

---

**Built with ❤️ using Next.js**
