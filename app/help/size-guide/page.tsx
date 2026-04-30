import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SizeGuidePage() {
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
            Size Guide
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--mid)",
              marginBottom: "2rem",
            }}
          >
            Find your perfect fit. Measurements are in inches.
          </p>

          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.1rem",
                color: "var(--deep)",
                marginBottom: "0.75rem",
              }}
            >
              Footwear
            </h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "1rem",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "0.75rem",
                      textAlign: "center",
                      border: "1px solid var(--blush)",
                      background: "var(--light-gold)",
                      color: "var(--deep)",
                    }}
                  >
                    US
                  </th>
                  <th
                    style={{
                      padding: "0.75rem",
                      textAlign: "center",
                      border: "1px solid var(--blush)",
                      background: "var(--light-gold)",
                      color: "var(--deep)",
                    }}
                  >
                    UK
                  </th>
                  <th
                    style={{
                      padding: "0.75rem",
                      textAlign: "center",
                      border: "1px solid var(--blush)",
                      background: "var(--light-gold)",
                      color: "var(--deep)",
                    }}
                  >
                    EU
                  </th>
                  <th
                    style={{
                      padding: "0.75rem",
                      textAlign: "center",
                      border: "1px solid var(--blush)",
                      background: "var(--light-gold)",
                      color: "var(--deep)",
                    }}
                  >
                    Length (in)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { us: "5", uk: "2.5", eu: "35", len: '9"' },
                  { us: "6", uk: "3.5", eu: "36", len: '9.5"' },
                  { us: "7", uk: "4.5", eu: "37", len: '9.8"' },
                  { us: "8", uk: "5.5", eu: "38", len: '10"' },
                  { us: "9", uk: "6.5", eu: "39", len: '10.5"' },
                  { us: "10", uk: "7.5", eu: "40", len: '11"' },
                ].map((s, i) => (
                  <tr key={i}>
                    <td
                      style={{
                        padding: "0.75rem",
                        textAlign: "center",
                        border: "1px solid var(--blush)",
                        color: "var(--mid)",
                      }}
                    >
                      {s.us}
                    </td>
                    <td
                      style={{
                        padding: "0.75rem",
                        textAlign: "center",
                        border: "1px solid var(--blush)",
                        color: "var(--mid)",
                      }}
                    >
                      {s.uk}
                    </td>
                    <td
                      style={{
                        padding: "0.75rem",
                        textAlign: "center",
                        border: "1px solid var(--blush)",
                        color: "var(--mid)",
                      }}
                    >
                      {s.eu}
                    </td>
                    <td
                      style={{
                        padding: "0.75rem",
                        textAlign: "center",
                        border: "1px solid var(--blush)",
                        color: "var(--mid)",
                      }}
                    >
                      {s.len}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.1rem",
                color: "var(--deep)",
                marginBottom: "0.75rem",
              }}
            >
              How to Measure
            </h3>
            <ol
              style={{
                listStyle: "decimal",
                paddingLeft: "1.5rem",
                color: "var(--mid)",
                lineHeight: 2,
              }}
            >
              <li>Stand on a piece of paper with your heel against a wall</li>
              <li>Mark the longest part of your foot</li>
              <li>Measure from wall to mark</li>
              <li>Add 0.5&quot; for comfort</li>
            </ol>
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
            <strong>Tip:</strong> If between sizes, we recommend sizing up for
            comfort.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
