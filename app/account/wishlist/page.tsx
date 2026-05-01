"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/useWishlist";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { formatNaira } from "@/lib/utils";

export default function WishlistPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { items, isLoading, remove } = useWishlist();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login?redirect=/account/wishlist");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  // Loading skeleton
  if (isLoading) {
    return (
      <div>
        <div
          className="h-8 w-40 rounded mb-6 animate-pulse"
          style={{ background: "var(--color-border)" }}
        />
        <div className="flex flex-col gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 animate-pulse"
              style={{
                background: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <div
                className="w-16 h-20 rounded shrink-0"
                style={{
                  background: "var(--color-border)",
                  borderRadius: "var(--radius-md)",
                }}
              />
              <div className="flex-1 flex flex-col gap-2">
                <div
                  className="h-4 rounded w-3/4"
                  style={{ background: "var(--color-border)" }}
                />
                <div
                  className="h-4 rounded w-1/4"
                  style={{ background: "var(--color-border)" }}
                />
              </div>
              <div className="flex gap-2 shrink-0">
                <div
                  className="h-8 w-24 rounded"
                  style={{ background: "var(--color-border)" }}
                />
                <div
                  className="h-8 w-8 rounded"
                  style={{ background: "var(--color-border)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <div>
        <h1
          className="text-2xl font-bold mb-6"
          style={{ color: "var(--color-text)" }}
        >
          Wishlist
        </h1>
        <div className="text-center py-20 flex flex-col items-center gap-3">
          <Heart size={44} style={{ color: "var(--color-border)" }} />
          <p className="font-medium" style={{ color: "var(--color-text)" }}>
            Your wishlist is empty
          </p>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Save items you love while you browse.
          </p>
          <Link href="/shop" className="btn btn-primary mt-2">
            Browse Collectibles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1
        className="text-2xl font-bold mb-6"
        style={{ color: "var(--color-text)" }}
      >
        Wishlist{" "}
        <span
          className="text-base font-normal"
          style={{ color: "var(--color-text-muted)" }}
        >
          ({items.length})
        </span>
      </h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const product = item.product;
          if (!product) return null;

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4"
              style={{
                background: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <Link href={`/products/${product.slug}`} className="shrink-0">
                <div
                  className="w-16 h-20 relative overflow-hidden"
                  style={{
                    borderRadius: "var(--radius-md)",
                    background: "var(--color-secondary)",
                  }}
                >
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      🎁
                    </div>
                  )}
                </div>
              </Link>

              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.slug}`}>
                  <p
                    className="text-sm font-semibold line-clamp-2"
                    style={{ color: "var(--color-text)" }}
                  >
                    {product.name}
                  </p>
                </Link>
                <p
                  className="text-base font-bold mt-1"
                  style={{ color: "var(--color-text)" }}
                >
                  {formatNaira(product.price)}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => dispatch(addToCart({ product }))}
                  className="btn btn-primary btn-sm"
                  aria-label="Add to cart"
                >
                  <ShoppingCart size={14} />
                  <span className="hidden sm:inline">Add to Cart</span>
                </button>
                <button
                  onClick={() => remove(item.product.id)}
                  className="btn btn-ghost btn-icon btn-sm"
                  aria-label="Remove from wishlist"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
