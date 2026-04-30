import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          padding: "8rem 1.5rem 4rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 300,
              color: "var(--deep)",
            }}
          >
            Shop by Category
          </h1>
          <p style={{ color: "var(--mid)", marginTop: "0.5rem" }}>
            Browse our curated collection
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
                padding: "2.5rem 1.5rem",
                textAlign: "center",
                background: "var(--cream)",
                border: "1px solid var(--blush)",
                borderRadius: 4,
                textDecoration: "none",
                transition: "all .3s",
              }}
            >
              <span style={{ fontSize: "3rem" }}>{cat.icon}</span>
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "var(--deep)",
                }}
              >
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
