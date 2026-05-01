"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface Product {
  id: string | number;
  name: string;
  slug: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  rating: number;
  reviewCount: number;
  images?: string[];
  featured?: boolean;
  isSale?: boolean;
  isNew?: boolean;
}

interface CategoryColor {
  hex: string;
  accent: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS & HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const fmt = (n: number): string =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);

const CATEGORY_COLORS: Record<string, CategoryColor> = {
  accessories: { hex: "#FEF3C7", accent: "#F59E0B" },
  footwear:    { hex: "#E0F2FE", accent: "#0EA5E9" },
  "wigs-hair": { hex: "#FCE7F3", accent: "#EC4899" },
  handbags:    { hex: "#D1FAE5", accent: "#10B981" },
  beauty:      { hex: "#FFE4E6", accent: "#F43F5E" },
  clothing:    { hex: "#EDE9FE", accent: "#8B5CF6" },
};

const DEFAULT_COLOR: CategoryColor = { hex: "#DBEAFE", accent: "#3B82F6" };

const CATEGORIES = [
  "all",
  "accessories",
  "footwear",
  "wigs-hair",
  "handbags",
  "beauty",
  "clothing",
];

const CARD_W = 192; // w-48
const GAP    = 14;
const STEP   = CARD_W + GAP;

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .font-display { font-family: 'DM Serif Display', serif !important; }
  body, input, button { font-family: 'Outfit', sans-serif; }

  @keyframes panelUp {
    from { transform: translateY(100%); }
    to   { transform: translateY(0); }
  }
  @keyframes backdropIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes panelDown {
    from { transform: translateY(0); }
    to   { transform: translateY(100%); }
  }
  @keyframes backdropOut {
    from { opacity: 1; }
    to   { opacity: 0; }
  }

  .panel-enter  { animation: panelUp      0.38s cubic-bezier(0.22,1,0.36,1) both; }
  .panel-exit   { animation: panelDown    0.30s cubic-bezier(0.55,0,1,0.45) both; }
  .bd-enter     { animation: backdropIn   0.25s ease both; }
  .bd-exit      { animation: backdropOut  0.28s ease both; }

  @keyframes cardReveal {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  .card-reveal {
    animation: cardReveal 0.45s cubic-bezier(0.22,1,0.36,1) both;
  }

  .dot-pill {
    height: 6px;
    border-radius: 9999px;
    transition: width 0.22s ease, background-color 0.22s ease;
    cursor: pointer;
    border: none;
    padding: 0;
  }

  .slider-track {
    display: flex;
    gap: ${GAP}px;
    will-change: transform;
    user-select: none;
    -webkit-user-select: none;
    cursor: grab;
  }
  .slider-track.is-dragging { cursor: grabbing; }
  .slider-track.snap {
    transition: transform 0.38s cubic-bezier(0.22,1,0.36,1);
  }

  .mob-card-active { outline: 2px solid var(--ring-color); }

  .plus-btn {
    transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1);
  }
  .plus-btn:hover  { transform: scale(1.14); }
  .plus-btn:active { transform: scale(0.88); }

  .desk-card {
    transition: box-shadow 0.28s ease, transform 0.28s cubic-bezier(0.22,1,0.36,1);
  }
  .desk-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.13) !important;
  }
  .desk-card:hover .desk-img { transform: scale(1.06); }
  .desk-img { transition: transform 0.5s ease; }

  .cat-pill {
    transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease, transform 0.12s ease;
  }
  .cat-pill:active { transform: scale(0.95); }

  .offer-thumb {
    transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
  }
  .offer-thumb:hover  { transform: scale(1.05); }
  .offer-thumb:active { transform: scale(0.95); }

  .swatch {
    transition: box-shadow 0.2s ease, transform 0.15s ease;
  }
  .swatch:active { transform: scale(0.88); }

  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { scrollbar-width: none; }

  .add-btn {
    transition: opacity 0.18s ease, transform 0.14s cubic-bezier(0.34,1.56,0.64,1);
  }
  .add-btn:hover  { opacity: 0.88; }
  .add-btn:active { transform: scale(0.96); }

  .icon-btn {
    transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1);
  }
  .icon-btn:hover  { transform: scale(1.07); }
  .icon-btn:active { transform: scale(0.93); }

  .size-btn {
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.12s ease;
  }
  .size-btn:active { transform: scale(0.92); }

  .rating-dot {
    transition: transform 0.18s ease;
  }
  .desk-card:hover .rating-dot { transform: scale(1.25); }

  .panel-overlay.closing .panel-sheet { animation: panelDown   0.30s cubic-bezier(0.55,0,1,0.45) both; }
  .panel-overlay.closing .panel-bd    { animation: backdropOut 0.28s ease both; }
`;

// ─────────────────────────────────────────────────────────────────────────────
// SMALL SHARED ATOMS
// ─────────────────────────────────────────────────────────────────────────────

const StarRating = ({ rating }: { rating: number }) => (
  <span className="text-xs tracking-wider">
    {[1, 2, 3, 4, 5].map((s) => (
      <span
        key={s}
        style={{ color: s <= Math.round(rating) ? "#FFB800" : "#D1D5DB" }}
      >
        ★
      </span>
    ))}
  </span>
);

const Badge = ({ product }: { product: Product }) => {
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
// MOBILE EXPANDED PANEL
// ─────────────────────────────────────────────────────────────────────────────

interface MobileExpandedPanelProps {
  product: Product;
  onClose: () => void;
}

const MobileExpandedPanel = ({ product, onClose }: MobileExpandedPanelProps) => {
  const [closing, setClosing]         = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);

  const colors = ["#111111", "#0EA5E9"];
  const sizes  = ["5", "6", "7", "8", "9"];
  const { hex, accent } = CATEGORY_COLORS[product.category] ?? DEFAULT_COLOR;

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  return (
    <div
      className={`panel-overlay fixed inset-0 z-50 flex items-end justify-center ${
        closing ? "closing" : ""
      }`}
    >
      {/* Backdrop */}
      <div
        className="panel-bd absolute inset-0 bg-black/40 backdrop-blur-[2px] bd-enter"
        onClick={handleClose}
      />

      {/* Sheet */}
      <div className="panel-sheet relative w-full max-w-md bg-white rounded-t-[2rem] overflow-hidden z-10 panel-enter">

        {/* Hero image */}
        <div
          className="relative h-64 overflow-hidden flex items-center justify-center"
          style={{ background: hex }}
        >
          <button
            onClick={handleClose}
            className="icon-btn absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-lg font-light"
          >
            ←
          </button>

          <div className="absolute top-4 right-4 z-10">
            <button className="icon-btn w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-base relative">
              ♡
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>

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
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold"
              style={{ background: `${accent}33`, color: accent }}
            >
              {product.name[0]}
            </div>
          )}

          <div className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-zinc-900 flex items-center justify-center text-white text-lg shadow-lg">
            ⬡
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pt-5 pb-8">
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

          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={product.rating} />
            <span className="text-[11px] text-zinc-400">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <p className="text-[13px] text-zinc-500 leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Sizes */}
          {["footwear", "clothing"].includes(product.category) && (
            <div className="flex gap-2 mb-4">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className="size-btn w-9 h-9 rounded-full text-sm font-medium border"
                  style={
                    selectedSize === s
                      ? { background: accent, borderColor: accent, color: "#fff" }
                      : { background: "#fff", borderColor: "#E5E7EB", color: "#52525B" }
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
              <button
                key={i}
                className="swatch w-7 h-7 rounded-full border-2 border-white"
                style={{
                  background: c,
                  boxShadow:
                    selectedColor === i
                      ? `0 0 0 2px #fff, 0 0 0 4px ${c}`
                      : "none",
                }}
                onClick={() => setSelectedColor(i)}
              />
            ))}
          </div>

          <button className="add-btn w-full py-4 rounded-full bg-zinc-900 text-white text-sm font-semibold tracking-wide">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE CARD
// ─────────────────────────────────────────────────────────────────────────────

interface MobileCardProps {
  product: Product;
  onExpand: (product: Product) => void;
  isActive: boolean;
}

const MobileCard = ({ product, onExpand, isActive }: MobileCardProps) => {
  const { hex, accent } = CATEGORY_COLORS[product.category] ?? DEFAULT_COLOR;

  return (
    <div
      className="relative bg-white rounded-2xl overflow-hidden flex-shrink-0 select-none"
      style={{
        width: CARD_W,
        boxShadow: isActive
          ? `0 0 0 2px ${accent}, 0 4px 16px rgba(0,0,0,0.10)`
          : "0 2px 12px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.22s ease",
      }}
    >
      <Link href={`/products/${product.slug}`} className="block no-underline">
        <div
          className="relative flex items-center justify-center"
          style={{ height: 176, background: hex }}
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
              style={{ background: `${accent}33`, color: accent }}
            >
              {product.name[0]}
            </div>
          )}
        </div>
        <div className="px-3.5 pt-3 pb-10">
          <p className="font-display text-[15px] font-bold text-zinc-900 leading-tight mb-1">
            {product.name}
          </p>
          <p className="text-sm font-semibold text-zinc-700">{fmt(product.price)}</p>
        </div>
      </Link>

      <button
        className="plus-btn absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center text-xl text-zinc-800 font-light leading-none"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
        onClick={(e) => {
          e.preventDefault();
          onExpand(product);
        }}
      >
        +
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE SLIDER
// ─────────────────────────────────────────────────────────────────────────────

interface MobileSliderProps {
  title: string;
  products: Product[];
  onExpand: (product: Product) => void;
  showSeeAll?: boolean;
}

const MobileSlider = ({
  title,
  products,
  onExpand,
  showSeeAll = true,
}: MobileSliderProps) => {
  const [index, setIndex]       = useState(0);
  const [snapping, setSnapping] = useState(true);
  const [dragX, setDragX]       = useState(0);

  const dragging  = useRef(false);
  const startX    = useRef(0);
  const startTime = useRef(0);
  const trackRef  = useRef<HTMLDivElement>(null);

  const clamp = (v: number) => Math.max(0, Math.min(v, products.length - 1));

  const baseX  = -(index * STEP);
  const totalX = baseX + dragX;

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    dragging.current  = true;
    startX.current    = e.clientX;
    startTime.current = Date.now();
    setSnapping(false);
    trackRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const delta   = e.clientX - startX.current;
    const maxLeft = (products.length - 1) * STEP;
    if (baseX + delta > 0 || baseX + delta < -maxLeft) {
      setDragX(delta * 0.25);
    } else {
      setDragX(delta);
    }
  };

  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;

    const elapsed  = Date.now() - startTime.current;
    const velocity = dragX / elapsed;

    let next = index;
    if (dragX < -40 || velocity < -0.35) next = clamp(index + 1);
    else if (dragX > 40 || velocity > 0.35) next = clamp(index - 1);

    setSnapping(true);
    setDragX(0);
    setIndex(next);
  };

  return (
    <section className="mb-7">
      <div className="flex items-center justify-between px-5 mb-3">
        <h2 className="font-display text-lg font-bold text-zinc-900">{title}</h2>
        {showSeeAll && (
          <button className="cat-pill text-xs text-zinc-400 font-medium hover:text-zinc-600">
            See All
          </button>
        )}
      </div>

      <div className="overflow-hidden pl-5">
        <div
          ref={trackRef}
          className={`slider-track${snapping ? " snap" : ""}${
            dragging.current ? " is-dragging" : ""
          }`}
          style={{ transform: `translateX(${totalX}px)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {products.map((p, i) => (
            <MobileCard
              key={p.id}
              product={p}
              onExpand={onExpand}
              isActive={i === index}
            />
          ))}
          <div style={{ width: 20, flexShrink: 0 }} />
        </div>
      </div>

      {products.length > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-3.5">
          {products.map((_, i) => (
            <button
              key={i}
              className="dot-pill"
              style={{
                width: i === index ? 20 : 6,
                backgroundColor: i === index ? "#111111" : "#D1D5DB",
              }}
              onClick={() => {
                setSnapping(true);
                setIndex(i);
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE OFFERS ROW
// ─────────────────────────────────────────────────────────────────────────────

const MobileOffersRow = ({ products }: { products: Product[] }) => (
  <section className="mb-7">
    <div className="flex items-center justify-between px-5 mb-3">
      <h2 className="font-display text-lg font-bold text-zinc-900">Offers</h2>
      <button className="text-xs text-zinc-400 font-medium hover:text-zinc-600 transition-colors">
        See All
      </button>
    </div>
    <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-1">
      {products.map((p) => {
        const { hex } = CATEGORY_COLORS[p.category] ?? DEFAULT_COLOR;
        return (
          <Link key={p.id} href={`/products/${p.slug}`} className="flex-shrink-0">
            <div
              className="offer-thumb rounded-2xl overflow-hidden relative"
              style={{ width: 88, height: 88, background: hex }}
            >
              {p.images?.[0] ? (
                <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-zinc-400">
                  {p.name[0]}
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP CARD
// ─────────────────────────────────────────────────────────────────────────────

interface DesktopCardProps {
  product: Product;
  index: number;
}

const DesktopCard = ({ product, index }: DesktopCardProps) => {
  const { hex, accent } = CATEGORY_COLORS[product.category] ?? DEFAULT_COLOR;
  const filled = Math.round(product.rating);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block no-underline card-reveal"
      style={{ animationDelay: `${index * 0.055}s` }}
    >
      <div className="desk-card bg-white rounded-2xl overflow-hidden shadow-sm relative">

        {/* Coloured top */}
        <div
          className="relative px-5 pt-5 pb-16 min-h-[190px]"
          style={{ background: hex }}
        >
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

          {/* Price badge */}
          <div className="absolute top-3.5 right-3.5 bg-white rounded-full px-3.5 py-1.5 shadow-md">
            <span className="font-display text-[15px] font-bold text-zinc-900">
              {fmt(product.price)}
            </span>
          </div>

          {/* Circular image */}
          <div className="absolute -bottom-6 right-3 w-[110px] h-[110px] rounded-full overflow-hidden bg-white shadow-lg ring-4 ring-white">
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="desk-img object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-3xl font-bold"
                style={{ background: `${accent}33`, color: accent }}
              >
                {product.name[0]}
              </div>
            )}
          </div>

          <Badge product={product} />
        </div>

        {/* White bottom */}
        <div className="flex items-center justify-between px-5 pt-8 pb-5 bg-white">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className="rating-dot w-2 h-2 rounded-full inline-block"
                style={{ background: i <= filled ? accent : "#E5E7EB" }}
              />
            ))}
          </div>
          <button
            className="add-btn text-[10px] font-bold tracking-[1.5px] text-white px-4 py-2 rounded-full"
            style={{ background: "#1A3560" }}
            onClick={(e) => e.preventDefault()}
          >
            ADD TO CART
          </button>
        </div>

        {/* Compare price */}
        {product.compareAtPrice && (
          <div className="absolute bottom-[54px] right-5 text-[10px] text-zinc-400 line-through">
            {fmt(product.compareAtPrice)}
          </div>
        )}
      </div>
    </Link>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SHARED HEADER
// ─────────────────────────────────────────────────────────────────────────────

interface HeaderProps {
  search: string;
  setSearch: (v: string) => void;
}

const Header = ({ search, setSearch }: HeaderProps) => (
  <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-100">
    <div className="px-5 py-3.5 md:px-12">
      <div className="flex items-center justify-between mb-3.5">
        <button className="icon-btn text-2xl text-zinc-700 hover:text-zinc-900">☰</button>
        <span className="font-display text-xl font-bold text-zinc-900 hidden md:block">Shop</span>
        <div className="relative">
          <button className="icon-btn w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-lg relative">
            ♡
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </button>
        </div>
      </div>
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

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY PILLS
// ─────────────────────────────────────────────────────────────────────────────

interface CategoryPillsProps {
  active: string;
  setActive: (c: string) => void;
}

const CategoryPills = ({ active, setActive }: CategoryPillsProps) => (
  <div className="flex gap-2 px-5 py-3.5 md:px-12 overflow-x-auto no-scrollbar">
    {CATEGORIES.map((c) => (
      <button
        key={c}
        onClick={() => setActive(c)}
        className={`cat-pill flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold capitalize border ${
          active === c
            ? "bg-zinc-900 text-white border-zinc-900"
            : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400"
        }`}
      >
        {c === "all" ? "All" : c.replace(/-/g, " ")}
      </button>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function ProductPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedProduct, setExpandedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch("/api/products?limit=60")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        const mapped = (data.products ?? []).map((p: any): Product => ({
          id: String(p.id),
          name: p.name,
          slug: p.slug,
          category: p.category_slug ?? p.category_name ?? "uncategorized",
          price: Number(p.price ?? 0),
          compareAtPrice: p.compare_at_price ?? undefined,
          description: p.description ?? "",
          rating: Number(p.rating ?? 0),
          reviewCount: Number(p.review_count ?? 0),
          images: p.images ?? [],
          featured: Boolean(p.featured),
          isSale: Boolean(p.is_sale),
          isNew: Boolean(p.is_new),
        }));
        setProducts(mapped);
      })
      .catch(() => {
        if (mounted) setProducts([]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = products.filter((p) => {
    const matchCat    = activeCategory === "all" || p.category === activeCategory;
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured    = filtered.filter((p) => p.featured);
  const offers      = filtered.filter((p) => p.isSale).slice(0, 6);
  const newArrivals = filtered.filter((p) => p.isNew);

  const displayFeatured = featured.length    ? featured    : filtered.slice(0, 5);
  const displayNew      = newArrivals.length ? newArrivals : filtered.slice(0, 5);
  const displayOffers   = offers.length      ? offers      : filtered.slice(0, 4);

  const empty = (
    <div className="flex flex-col items-center justify-center h-60 text-zinc-400 gap-3">
      <span className="text-5xl">🔍</span>
      <p className="text-sm font-medium">No products found</p>
    </div>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <div className="min-h-screen bg-[#F8F8FB]">
        <Header search={search} setSearch={setSearch} />
        <CategoryPills active={activeCategory} setActive={setActiveCategory} />

        {/* ══════════════ MOBILE  (< md) ══════════════ */}
        <main className="block md:hidden pb-16">
          {filtered.length === 0 ? (
            empty
          ) : (
            <>
              <MobileSlider
                title="Featured"
                products={displayFeatured}
                onExpand={setExpandedProduct}
              />
              <MobileOffersRow products={displayOffers} />
              {displayNew.length > 0 && (
                <MobileSlider
                  title="New Arrivals"
                  products={displayNew}
                  onExpand={setExpandedProduct}
                />
              )}
              <MobileSlider
                title="All Products"
                products={filtered}
                onExpand={setExpandedProduct}
                showSeeAll={false}
              />
            </>
          )}
        </main>

        {/* ═════════════ DESKTOP  (≥ md) ═════════════ */}
        <main className="hidden md:block">
          <div className="max-w-7xl mx-auto px-12 py-10 pb-24">
            <div className="flex items-baseline gap-3 mb-8">
              <h1 className="font-display text-3xl font-bold text-zinc-900 capitalize">
                {activeCategory === "all"
                  ? "All Products"
                  : activeCategory.replace(/-/g, " ")}
              </h1>
              <span className="text-base text-zinc-400 font-medium">
                ({filtered.length})
              </span>
            </div>
            {filtered.length === 0 ? (
              empty
            ) : (
              <div className="grid grid-cols-3 gap-6 xl:gap-8">
                {filtered.map((p, i) => (
                  <DesktopCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Mobile expanded panel */}
        {expandedProduct && (
          <MobileExpandedPanel
            product={expandedProduct}
            onClose={() => setExpandedProduct(null)}
          />
        )}
      </div>
    </>
  );
}
