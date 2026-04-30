-- ============================================================
-- Perry E-Commerce — PostgreSQL Schema
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Trigger: set_updated_at ───────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── Enum Types ────────────────────────────────────────────────────────────────
CREATE TYPE user_role          AS ENUM ('user', 'admin', 'super_admin');
CREATE TYPE collection_status  AS ENUM ('published', 'draft');
CREATE TYPE product_status     AS ENUM ('active', 'draft', 'archived');
CREATE TYPE order_status       AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');
CREATE TYPE payment_status     AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE coupon_type        AS ENUM ('percent', 'fixed', 'free_shipping');
CREATE TYPE inventory_adj_type AS ENUM ('addition', 'reduction', 'correction');
CREATE TYPE ticket_status      AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE ticket_priority    AS ENUM ('low', 'medium', 'high');

-- ── users ─────────────────────────────────────────────────────────────────────
CREATE TABLE users (
  id             UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  email          TEXT        NOT NULL UNIQUE,
  password_hash  TEXT        NOT NULL,
  first_name     TEXT        NOT NULL,
  last_name      TEXT        NOT NULL,
  phone          TEXT,
  avatar_url     TEXT,
  role           user_role   NOT NULL DEFAULT 'user',
  is_active      BOOLEAN     NOT NULL DEFAULT TRUE,
  email_verified BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── addresses ─────────────────────────────────────────────────────────────────
CREATE TABLE addresses (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  label      TEXT        NOT NULL,
  first_name TEXT        NOT NULL,
  last_name  TEXT        NOT NULL,
  street     TEXT        NOT NULL,
  city       TEXT        NOT NULL,
  state      TEXT        NOT NULL,
  zip        TEXT        NOT NULL,
  country    TEXT        NOT NULL,
  is_default BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_addresses_updated_at
  BEFORE UPDATE ON addresses
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── categories ────────────────────────────────────────────────────────────────
CREATE TABLE categories (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT        NOT NULL,
  slug        TEXT        NOT NULL UNIQUE,
  description TEXT,
  parent_id   UUID        REFERENCES categories(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── tags ──────────────────────────────────────────────────────────────────────
CREATE TABLE tags (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT        NOT NULL UNIQUE,
  slug       TEXT        NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── collections ───────────────────────────────────────────────────────────────
CREATE TABLE collections (
  id          UUID               PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT               NOT NULL,
  slug        TEXT               NOT NULL UNIQUE,
  description TEXT,
  status      collection_status  NOT NULL DEFAULT 'draft',
  created_at  TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ        NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_collections_updated_at
  BEFORE UPDATE ON collections
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── products ──────────────────────────────────────────────────────────────────
CREATE TABLE products (
  id               UUID           PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT           NOT NULL,
  slug             TEXT           NOT NULL UNIQUE,
  description      TEXT           NOT NULL,
  price            NUMERIC(10, 2) NOT NULL,
  compare_at_price NUMERIC(10, 2),
  images           TEXT[]         NOT NULL DEFAULT '{}',
  category_id      UUID           REFERENCES categories(id) ON DELETE SET NULL,
  stock            INT            NOT NULL DEFAULT 0,
  sku              TEXT           NOT NULL UNIQUE,
  rating           NUMERIC(3, 2)  NOT NULL DEFAULT 0,
  review_count     INT            NOT NULL DEFAULT 0,
  featured         BOOLEAN        NOT NULL DEFAULT FALSE,
  is_new           BOOLEAN        NOT NULL DEFAULT TRUE,
  is_sale          BOOLEAN        NOT NULL DEFAULT FALSE,
  status           product_status NOT NULL DEFAULT 'active',
  created_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── product_tags ──────────────────────────────────────────────────────────────
CREATE TABLE product_tags (
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  tag_id     UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, tag_id)
);

-- ── product_collections ───────────────────────────────────────────────────────
CREATE TABLE product_collections (
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, collection_id)
);

-- ── inventory_adjustments ─────────────────────────────────────────────────────
CREATE TABLE inventory_adjustments (
  id         UUID               PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID               NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  type       inventory_adj_type NOT NULL,
  quantity   INT                NOT NULL,
  reason     TEXT               NOT NULL,
  admin_id   UUID               REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ        NOT NULL DEFAULT NOW()
);

-- ── reviews ───────────────────────────────────────────────────────────────────
CREATE TABLE reviews (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID        NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id     UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating      INT         NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment     TEXT        NOT NULL,
  is_approved BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── orders ────────────────────────────────────────────────────────────────────
CREATE TABLE orders (
  id                UUID           PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID           REFERENCES users(id) ON DELETE SET NULL,
  order_number      TEXT           NOT NULL UNIQUE,
  shipping_address  JSONB          NOT NULL,
  status            order_status   NOT NULL DEFAULT 'pending',
  subtotal          NUMERIC(10, 2) NOT NULL,
  tax               NUMERIC(10, 2) NOT NULL DEFAULT 0,
  shipping_cost     NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total             NUMERIC(10, 2) NOT NULL,
  payment_method    TEXT           NOT NULL,
  payment_status    payment_status NOT NULL DEFAULT 'pending',
  payment_reference TEXT,
  tracking_number   TEXT,
  notes             TEXT,
  created_at        TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── order_items ───────────────────────────────────────────────────────────────
CREATE TABLE order_items (
  id            UUID           PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id      UUID           NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id    UUID           REFERENCES products(id) ON DELETE SET NULL,
  product_name  TEXT           NOT NULL,
  product_sku   TEXT           NOT NULL,
  product_image TEXT,
  unit_price    NUMERIC(10, 2) NOT NULL,
  quantity      INT            NOT NULL,
  total         NUMERIC(10, 2) NOT NULL,
  created_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- ── coupons ───────────────────────────────────────────────────────────────────
CREATE TABLE coupons (
  id          UUID           PRIMARY KEY DEFAULT uuid_generate_v4(),
  code        TEXT           NOT NULL UNIQUE,
  type        coupon_type    NOT NULL,
  value       NUMERIC(10, 2) NOT NULL,
  min_order   NUMERIC(10, 2) NOT NULL DEFAULT 0,
  usage_limit INT,
  usage_count INT            NOT NULL DEFAULT 0,
  is_active   BOOLEAN        NOT NULL DEFAULT TRUE,
  expires_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_coupons_updated_at
  BEFORE UPDATE ON coupons
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── cart_items ────────────────────────────────────────────────────────────────
CREATE TABLE cart_items (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID        NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity   INT         NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, product_id)
);

CREATE TRIGGER trg_cart_items_updated_at
  BEFORE UPDATE ON cart_items
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── wishlists ─────────────────────────────────────────────────────────────────
CREATE TABLE wishlists (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID        NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, product_id)
);

-- ── support_tickets ───────────────────────────────────────────────────────────
CREATE TABLE support_tickets (
  id          UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID            REFERENCES users(id) ON DELETE SET NULL,
  subject     TEXT            NOT NULL,
  message     TEXT            NOT NULL,
  status      ticket_status   NOT NULL DEFAULT 'open',
  priority    ticket_priority NOT NULL DEFAULT 'medium',
  admin_notes TEXT,
  created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_support_tickets_updated_at
  BEFORE UPDATE ON support_tickets
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── Indexes ───────────────────────────────────────────────────────────────────
CREATE INDEX idx_products_category_id   ON products(category_id);
CREATE INDEX idx_products_status        ON products(status);
CREATE INDEX idx_products_slug          ON products(slug);
CREATE INDEX idx_orders_user_id         ON orders(user_id);
CREATE INDEX idx_orders_status          ON orders(status);
CREATE INDEX idx_orders_order_number    ON orders(order_number);
CREATE INDEX idx_reviews_product_id     ON reviews(product_id);
CREATE INDEX idx_cart_items_user_id     ON cart_items(user_id);
CREATE INDEX idx_wishlists_user_id      ON wishlists(user_id);
