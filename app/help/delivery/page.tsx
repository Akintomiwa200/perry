import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DeliveryPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          padding: "8rem 1.5rem 4rem",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Link
          href="/help"
          style={{
            display: "inline-block",
            marginBottom: "1.5rem",
            color: "var(--terracotta)",
            textDecoration: "none",
            fontSize: ".85rem",
          }}
        >
          ← Back to Help Center
        </Link>

        <div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.2rem",
              color: "var(--deep)",
              marginBottom: "0.5rem",
            }}
          >
            Delivery Information
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--mid)",
              marginBottom: "2rem",
            }}
          >
            We deliver across Nigeria. Here&apos;s everything you need to know
            about shipping.
          </p>

          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.1rem",
                color: "var(--deep)",
                marginBottom: "0.75rem",
              }}
            >
              Delivery Areas
            </h3>
            <p style={{ color: "var(--mid)" }}>
              We deliver to all 36 states in Nigeria through our courier
              partners.
            </p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.1rem",
                color: "var(--deep)",
                marginBottom: "0.75rem",
              }}
            >
              Delivery Times
            </h3>
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "1.5rem",
                color: "var(--mid)",
                lineHeight: 2,
              }}
            >
              <li>
                <strong style={{ color: "var(--deep)" }}>Lagos:</strong> 1-2
                business days
              </li>
              <li>
                <strong style={{ color: "var(--deep)" }}>Ogun State:</strong>{" "}
                1-2 business days
              </li>
              <li>
                <strong style={{ color: "var(--deep)" }}>
                  Other SW states:
                </strong>{" "}
                2-3 business days
              </li>
              <li>
                <strong style={{ color: "var(--deep)" }}>Other regions:</strong>{" "}
                3-5 business days
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.1rem",
                color: "var(--deep)",
                marginBottom: "0.75rem",
              }}
            >
              Delivery Fees
            </h3>
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "1.5rem",
                color: "var(--mid)",
                lineHeight: 2,
              }}
            >
              <li>
                <strong style={{ color: "var(--deep)" }}>Lagos:</strong> ₦1,500
              </li>
              <li>
                <strong style={{ color: "var(--deep)" }}>Other cities:</strong>{" "}
                ₦2,000 - ₦3,000
              </li>
              <li>
                <strong style={{ color: "var(--deep)" }}>Free delivery:</strong>{" "}
                Orders above ₦50,000
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.1rem",
                color: "var(--deep)",
                marginBottom: "0.75rem",
              }}
            >
              Tracking
            </h3>
            <p style={{ color: "var(--mid)" }}>
              Once your order ships, you&apos;ll receive a tracking number via
              WhatsApp. Track your package on the courier&apos;s website.
            </p>
          </section>

          <div
            style={{
              marginTop: "2rem",
              padding: "1.5rem",
              background: "var(--light-gold)",
              fontSize: ".9rem",
              color: "var(--deep)",
            }}
          >
            <strong>Note:</strong> Delivery times are estimates. Weather delays
            may occur.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
