"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import { mockProducts } from "@/lib/db";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS & HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const fmt = (n) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);

const CATEGORY_COLORS = {
  accessories: { hex: "#FEF3C7", accent: "#F59E0B" },
  footwear:    { hex: "#E0F2FE", accent: "#0EA5E9" },
  "wigs-hair": { hex: "#FCE7F3", accent: "#EC4899" },
  handbags:    { hex: "#D1FAE5", accent: "#10B981" },
  beauty:      { hex: "#FFE4E6", accent: "#F43F5E" },
  clothing:    { hex: "#EDE9FE", accent: "#8B5CF6" },
};

const DEFAULT_COLOR = { hex: "#DBEAFE", accent: "#3B82F6" };

const CATEGORIES = [
  "all",
  "accessories",
  "footwear",
  "wigs-hair",
  "handbags",
  "beauty",
  "clothing",
];

// ─── Star rating ─────────────────────────────────────────────────────────────
const StarRating = ({ rating }) => (
  <span className="text-xs tracking-wider">
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} style={{ color: s <= Math.round(rating) ? "#FFB800" : "#D1D5DB" }}>
        ★
      </span>
    ))}
  </span>
);

// ─── Sale / New badge ─────────────────────────────────────────────────────────
const Badge = ({ product }) => {
  if (product.isSale)
    return (
      <span className="absolute top-2.5 left-2.5 z-10 bg-red-500 text-white text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full">
        SALE
      </span>
    );
  if (product.isNew)
    return (
      <span className="absolute top-2.5 left-2.5 z-10 bg-emerald-500 text-white text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full">
        NEW
      </span>
    );
  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE EXPANDED PANEL  (matches right side of Image 1)
// ─────────────────────────────────────────────────────────────────────────────

const MobileExpandedPanel = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const colors = ["#111111", "#0EA5E9"];
  const sizes = ["5", "6", "7", "8", "9"];
  const { hex, accent } = CATEGORY_COLORS[product.category] || DEFAULT_COLOR;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Sliding panel */}
      <motion.div
        className="relative w-full max-w-md bg-white rounded-t-[2rem] overflow-hidden z-10"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 340 }}
      >
        {/* Hero image area */}
        <div
          className="relative h-64 overflow-hidden"
          style={{ background: hex }}
        >
          {/* Back button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-lg font-light hover:scale-105 transition-transform"
          >
            ←
          </button>

          {/* Wishlist button */}
          <div className="absolute top-4 right-4 z-10">
            <button className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-base hover:scale-105 transition-transform relative">
              ♡
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>

          {/* Product image */}
          {product.images?.[0] ? (
            <div className="absolute inset-4">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold"
                style={{ background: accent + "33", color: accent }}
              >
                {product.name[0]}
              </div>
            </div>
          )}

          {/* 3D badge */}
          <div className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-zinc-900 flex items-center justify-center text-white text-lg shadow-lg">
            ⬡
          </div>
        </div>

        {/* Body content */}
        <div className="px-5 pt-5 pb-8">
          {/* Name + Price row */}
          <div className="flex items-start justify-between gap-3 mb-1">
            <div>
              <h2 className="font-display text-xl font-bold text-zinc-900 leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-zinc-400 capitalize mt-0.5">
                {product.category.replace(/-/g, " ")}
              </p>
            </div>
            <p className="font-display text-xl font-bold text-zinc-900 whitespace-nowrap">
              {fmt(product.price)}
            </p>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={product.rating} />
            <span className="text-[11px] text-zinc-400">({product.reviewCount} reviews)</span>
          </div>

          {/* Description */}
          <p className="text-[13px] text-zinc-500 leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Sizes – only for footwear & clothing */}
          {["footwear", "clothing"].includes(product.category) && (
            <div className="flex gap-2 mb-4">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className="w-9 h-9 rounded-full text-sm font-medium transition-all duration-150 border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400"
                  style={
                    selectedSize === s
                      ? { background: accent, borderColor: accent, color: "#fff" }
                      : {}
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Color swatches */}
          <div className="flex items-center gap-3 mb-6">
            {colors.map((c, i) => (
              <motion.button
                key={i}
                onClick={() => setSelectedColor(i)}
                className="w-7 h-7 rounded-full border-2 border-white"
                style={{
                  background: c,
                  boxShadow:
                    selectedColor === i
                      ? `0 0 0 2px #fff, 0 0 0 4px ${c}`
                      : "none",
                }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Add to cart */}
          <motion.button
            className="w-full py-4 rounded-full bg-zinc-900 text-white text-sm font-semibold tracking-wide"
            whileTap={{ scale: 0.97 }}
            whileHover={{ opacity: 0.88 }}
          >
            Add to cart
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE CARD  (single card inside the slider)
// ─────────────────────────────────────────────────────────────────────────────

const MobileCard = ({ product, onExpand, isActive }) => {
  const { hex, accent } = CATEGORY_COLORS[product.category] || DEFAULT_COLOR;

  return (
    <div
      className="relative bg-white rounded-2xl overflow-hidden flex-shrink-0 w-48 select-none"
      style={{
        boxShadow: isActive
          ? `0 0 0 2px ${accent}, 0 4px 16px rgba(0,0,0,0.10)`
          : "0 2px 12px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.2s",
      }}
    >
      <Link href={`/products/${product.slug}`} className="block no-underline">
        {/* Image area */}
        <div
          className="relative h-44 flex items-center justify-center"
          style={{ background: hex }}
        >
          <Badge product={product} />
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          ) : (
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold"
              style={{ background: accent + "33", color: accent }}
            >
              {product.name[0]}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="px-3.5 pt-3 pb-10">
          <p className="font-display text-[15px] font-bold text-zinc-900 leading-tight mb-1">
            {product.name}
          </p>
          <p className="text-sm font-semibold text-zinc-700">{fmt(product.price)}</p>
        </div>
      </Link>

      {/* Plus button */}
      <motion.button
        className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center text-xl text-zinc-800 font-light leading-none"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
        onClick={(e) => {
          e.preventDefault();
          onExpand(product);
        }}
        whileTap={{ scale: 0.88 }}
        whileHover={{ scale: 1.12 }}
      >
        +
      </motion.button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE SLIDER  (drag + snap, matches figma scroll behaviour)
// ─────────────────────────────────────────────────────────────────────────────

const CARD_W = 192; // w-48
const GAP    = 14;  // gap-3.5
const STEP   = CARD_W + GAP;

const MobileSlider = ({ title, products, onExpand, showSeeAll = true }) => {
  const [index, setIndex] = useState(0);

  const clamp = (v) => Math.max(0, Math.min(v, products.length - 1));

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    if (offset.x < -40 || velocity.x < -300) setIndex((i) => clamp(i + 1));
    else if (offset.x > 40 || velocity.x > 300) setIndex((i) => clamp(i - 1));
  };

  return (
    <section className="mb-7">
      {/* Header */}
      <div className="flex items-center justify-between px-5 mb-3">
        <h2 className="font-display text-lg font-bold text-zinc-900">{title}</h2>
        {showSeeAll && (
          <button className="text-xs text-zinc-400 font-medium hover:text-zinc-600 transition-colors">
            See All
          </button>
        )}
      </div>

      {/* Track */}
      <div className="overflow-hidden pl-5">
        <motion.div
          className="flex gap-3.5 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{
            left: -((products.length - 1) * STEP),
            right: 0,
          }}
          dragElastic={0.12}
          animate={{ x: -(index * STEP) }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onDragEnd={handleDragEnd}
        >
          {products.map((p, i) => (
            <MobileCard
              key={p.id}
              product={p}
              onExpand={onExpand}
              isActive={i === index}
            />
          ))}
          {/* Trailing spacer so last card doesn't sit at edge */}
          <div className="w-5 flex-shrink-0" />
        </motion.div>
      </div>

      {/* Pill indicators */}
      {products.length > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-3.5">
          {products.map((_, i) => (
            <motion.button
              key={i}
              className="h-1.5 rounded-full"
              animate={{
                width: i === index ? 20 : 6,
                backgroundColor: i === index ? "#111111" : "#D1D5DB",
              }}
              transition={{ duration: 0.22 }}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE OFFERS ROW  (small thumbnail row)
// ─────────────────────────────────────────────────────────────────────────────

const MobileOffersRow = ({ products }) => (
  <section className="mb-7">
    <div className="flex items-center justify-between px-5 mb-3">
      <h2 className="font-display text-lg font-bold text-zinc-900">Offers</h2>
      <button className="text-xs text-zinc-400 font-medium hover:text-zinc-600 transition-colors">
        See All
      </button>
    </div>
    <div className="flex gap-3 px-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
      {products.map((p) => {
        const { hex } = CATEGORY_COLORS[p.category] || DEFAULT_COLOR;
        return (
          <Link key={p.id} href={`/products/${p.slug}`} className="flex-shrink-0">
            <motion.div
              className="w-[88px] h-[88px] rounded-2xl overflow-hidden relative"
              style={{ background: hex }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {p.images?.[0] ? (
                <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-zinc-400">
                  {p.name[0]}
                </div>
              )}
            </motion.div>
          </Link>
        );
      })}
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP CARD  (3-per-row, matches Image 2)
// ─────────────────────────────────────────────────────────────────────────────

const DesktopCard = ({ product, index }) => {
  const { hex, accent } = CATEGORY_COLORS[product.category] || DEFAULT_COLOR;
  const filled = Math.round(product.rating);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.055, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/products/${product.slug}`} className="block group no-underline">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative">

          {/* Coloured top section */}
          <div
            className="relative px-5 pt-5 pb-16 overflow-hidden min-h-[190px]"
            style={{ background: hex }}
          >
            {/* Category + name + description */}
            <div className="max-w-[56%]">
              <p className="text-[9px] font-bold tracking-[2px] text-zinc-400 uppercase mb-1">
                {product.category.replace(/-/g, " ")}
              </p>
              <h3 className="font-display text-[17px] font-bold text-zinc-900 leading-tight mb-2">
                {product.name}
              </h3>
              <p className="text-[11px] text-zinc-500 leading-snug line-clamp-2">
                {product.description}
              </p>
            </div>

            {/* Price badge (top right) */}
            <div className="absolute top-3.5 right-3.5 bg-white rounded-full px-3.5 py-1.5 shadow-md">
              <span className="font-display text-[15px] font-bold text-zinc-900">
                {fmt(product.price)}
              </span>
            </div>

            {/* Circular product image (overlaps bottom edge) */}
            <div className="absolute -bottom-6 right-3 w-[110px] h-[110px] rounded-full overflow-hidden bg-white shadow-lg ring-4 ring-white">
              {product.images?.[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-3xl font-bold"
                  style={{ background: accent + "33", color: accent }}
                >
                  {product.name[0]}
                </div>
              )}
            </div>

            <Badge product={product} />
          </div>

          {/* White bottom section */}
          <div className="flex items-center justify-between px-5 pt-8 pb-5 bg-white">
            {/* Dot rating */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full inline-block transition-transform group-hover:scale-110"
                  style={{ background: i <= filled ? accent : "#E5E7EB" }}
                />
              ))}
            </div>

            {/* CTA */}
            <motion.button
              className="text-[10px] font-bold tracking-[1.5px] text-white px-4 py-2 rounded-full"
              style={{ background: "#1A3560" }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ opacity: 0.88 }}
              onClick={(e) => e.preventDefault()}
            >
              ADD TO CART
            </motion.button>
          </div>

          {/* Strike-through compare price */}
          {product.compareAtPrice && (
            <div className="absolute bottom-[54px] right-5 text-[10px] text-zinc-400 line-through">
              {fmt(product.compareAtPrice)}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SHARED HEADER
// ─────────────────────────────────────────────────────────────────────────────

const Header = ({ search, setSearch }) => (
  <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-100">
    <div className="px-5 py-3.5 md:px-12">
      {/* Top row */}
      <div className="flex items-center justify-between mb-3.5">
        <button className="text-2xl text-zinc-700 hover:text-zinc-900 transition-colors">☰</button>
        <span className="font-display text-xl font-bold text-zinc-900 hidden md:block">
          Shop
        </span>
        <div className="relative">
          <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-lg hover:scale-105 transition-transform relative">
            ♡
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-2 bg-zinc-100 rounded-2xl px-4 py-2.5">
        <span className="text-zinc-400 text-base">🔍</span>
        <input
          className="flex-1 bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="text-zinc-400 text-base cursor-pointer">⊞</span>
      </div>
    </div>
  </header>
);

// ─────