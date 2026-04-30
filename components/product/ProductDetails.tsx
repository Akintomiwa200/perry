"use client";
import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { Product } from "@/types/product.types";
import { formatNaira, calculateDiscount } from "@/lib/utils";
import { useWishlist } from "@/hooks/useWishlist";
import {
  ShoppingCart,
  Heart,
  Share2,
  Package,
  Shield,
  RotateCcw,
} from "lucide-react";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const {
    add: wishlistAdd,
    remove: wishlistRemove,
    isInWishlist,
  } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: qty }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      {/* Images */}
      <div className="flex flex-col gap-3">
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "3/4",
            borderRadius: "var(--radius-lg)",
            background: "var(--color-secondary)",
          }}
        >
          {product.images?.[activeImage] ? (
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-8xl">🎁</span>
            </div>
          )}
          {product.isSale && product.compareAtPrice && (
            <span className="badge badge-danger absolute top-4 left-4">
              -{calculateDiscount(product.price, product.compareAtPrice)}% OFF
            </span>
          )}
        </div>
        {product.images?.length > 1 && (
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className="relative w-16 h-16 overflow-hidden flex-shrink-0"
                style={{
                  borderRadius: "var(--radius-md)",
                  border: `2px solid ${i === activeImage ? "var(--color-primary)" : "var(--color-border)"}`,
                  background: "var(--color-secondary)",
                }}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-5">
        <div>
          <p
            className="text-sm font-medium uppercase tracking-wider mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            {product.category}
          </p>
          <h1
            className="text-3xl font-bold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            {product.name}
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="flex"
              aria-label={`Rated ${product.rating} out of 5`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    color:
                      i < Math.floor(product.rating)
                        ? "#D97706"
                        : "var(--color-border)",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <span
              className="text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span
              className="text-3xl font-bold"
              style={{
                color: product.isSale
                  ? "var(--color-danger)"
                  : "var(--color-text)",
              }}
            >
              {formatNaira(product.price)}
            </span>
            {product.compareAtPrice && (
              <span
                className="text-lg line-through"
                style={{ color: "var(--color-text-muted)" }}
              >
                {formatNaira(product.compareAtPrice!)}
              </span>
            )}
          </div>
        </div>

        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          {product.description}
        </p>

        {/* Stock */}
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background:
                product.stock > 0
                  ? "var(--color-success)"
                  : "var(--color-danger)",
            }}
          />
          <span
            className="text-sm font-medium"
            style={{
              color:
                product.stock > 0
                  ? "var(--color-success)"
                  : "var(--color-danger)",
            }}
          >
            {product.stock === 0
              ? "Out of Stock"
              : product.stock <= 3
                ? `Only ${product.stock} left!`
                : "In Stock"}
          </span>
        </div>

        {/* Quantity + Add */}
        {product.stock > 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <label
                className="text-sm font-medium"
                style={{ color: "var(--color-text)" }}
              >
                Qty
              </label>
              <div
                className="flex items-center"
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg font-medium transition-colors"
                  style={{ color: "var(--color-text)" }}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span
                  className="w-10 text-center text-sm font-semibold"
                  style={{
                    borderLeft: "1px solid var(--color-border)",
                    borderRight: "1px solid var(--color-border)",
                    lineHeight: "40px",
                  }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg font-medium transition-colors"
                  style={{ color: "var(--color-text)" }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-lg flex-1"
              >
                <ShoppingCart size={18} />
                {added ? "Added!" : "Add to Cart"}
              </button>
              <button
                onClick={() =>
                  inWishlist
                    ? wishlistRemove(product.id)
                    : wishlistAdd(product.id)
                }
                className="btn btn-outline btn-icon btn-lg"
                aria-label={
                  inWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
              </button>
              <button
                className="btn btn-ghost btn-icon btn-lg"
                aria-label="Share"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Tags */}
        {product.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="badge badge-secondary">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Perks */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl"
          style={{ background: "var(--color-secondary)" }}
        >
          {[
            { icon: Package, label: "Free shipping over $75" },
            { icon: Shield, label: "Authenticity guaranteed" },
            { icon: RotateCcw, label: "30-day easy returns" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-xs font-medium"
              style={{ color: "var(--color-text)" }}
            >
              <Icon size={14} style={{ color: "var(--color-primary)" }} />
              {label}
            </div>
          ))}
        </div>

        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          SKU: {product.sku}
        </p>
      </div>
    </div>
  );
}
