import { notFound } from "next/navigation";
import ProductDetails from "@/components/product/ProductDetails";
import ProductReviews from "@/components/product/ProductReviews";
import ProductList from "@/components/product/ProductList";
import type { Metadata } from "next";
import type { Product } from "@/types/product.types";

interface Props {
  params: Promise<{ slug: string }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/products/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) notFound();

  // Fetch related products by category, exclude current
  let related: Product[] = [];
  if (product.categorySlug) {
    try {
      const relRes = await fetch(
        `${BASE_URL}/api/products?category=${product.categorySlug}&limit=4`,
        { cache: "no-store" },
      );
      if (relRes.ok) {
        const relData = await relRes.json();
        const all: Product[] = relData.products ?? relData;
        related = all.filter((p) => p.id !== product.id).slice(0, 4);
      }
    } catch {
      // Non-fatal — related section simply won't show
    }
  }

  return (
    <div className="py-6">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-xs mb-8"
        aria-label="Breadcrumb"
        style={{ color: "var(--color-text-muted)" }}
      >
        <a href="/" style={{ color: "var(--color-primary)" }}>
          Home
        </a>
        <span>/</span>
        <a href="/shop" style={{ color: "var(--color-primary)" }}>
          Shop
        </a>
        <span>/</span>
        <a
          href={`/categories/${product.categorySlug ?? product.category}`}
          style={{ color: "var(--color-primary)" }}
        >
          {(product.categoryName ?? product.category).replace(/-/g, " ")}
        </a>
        <span>/</span>
        <span className="truncate max-w-xs">{product.name}</span>
      </nav>

      <ProductDetails product={product} />
      <ProductReviews
        productSlug={slug}
        productId={product.id}
        rating={product.rating}
        reviewCount={product.reviewCount}
      />

      {related.length > 0 && (
        <section className="mt-16">
          <ProductList products={related} title="You Might Also Like" />
        </section>
      )}
    </div>
  );
}
