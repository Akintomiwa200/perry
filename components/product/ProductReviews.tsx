"use client";

import { useState, useEffect, useCallback } from "react";
import { reviewService } from "@/services/reviewService";
import { useAuth } from "@/hooks/useAuth";
import type { Review } from "@/types/review.types";

interface ProductReviewsProps {
  productSlug: string;
  productId: string;
  rating: number;
  reviewCount: number;
}

function StarRow({
  filled,
  total = 5,
  size = 18,
}: {
  filled: number;
  total?: number;
  size?: number;
}) {
  return (
    <span className="flex" aria-label={`${filled} out of ${total} stars`}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: size,
            color: i < Math.floor(filled) ? "#D97706" : "var(--color-border)",
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ReviewSkeleton() {
  return (
    <div
      className="p-5 animate-pulse"
      style={{
        background: "var(--color-surface-raised)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-full"
          style={{ background: "var(--color-border)" }}
        />
        <div className="flex-1 flex flex-col gap-2">
          <div
            className="h-3 w-32 rounded"
            style={{ background: "var(--color-border)" }}
          />
          <div
            className="h-3 w-20 rounded"
            style={{ background: "var(--color-border)" }}
          />
        </div>
        <div
          className="h-3 w-16 rounded"
          style={{ background: "var(--color-border)" }}
        />
      </div>
      <div
        className="h-3 w-full rounded mb-2"
        style={{ background: "var(--color-border)" }}
      />
      <div
        className="h-3 w-4/5 rounded"
        style={{ background: "var(--color-border)" }}
      />
    </div>
  );
}

export default function ProductReviews({
  productSlug,
  productId,
  rating,
  reviewCount,
}: ProductReviewsProps) {
  const { user } = useAuth();

  // --- Review list state ---
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  // --- Review form state ---
  const [showForm, setShowForm] = useState(false);
  const [formRating, setFormRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setListError(null);
    try {
      const data = await reviewService.getProductReviews(productSlug);
      setReviews(data);
    } catch {
      setListError("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  }, [productSlug]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (formRating === 0) {
      setFormError("Please select a star rating.");
      return;
    }
    if (comment.trim().length < 10) {
      setFormError("Review must be at least 10 characters.");
      return;
    }

    setSubmitting(true);
    try {
      await reviewService.createReview(productSlug, {
        productId,
        rating: formRating,
        comment: comment.trim(),
      });
      setShowForm(false);
      setFormRating(0);
      setComment("");
      setSuccessMsg("Review submitted for approval");
      setTimeout(() => setSuccessMsg(null), 4000);
      fetchReviews();
    } catch {
      setFormError("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-16">
      {/* ── Section header ──────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Customer Reviews
          </h2>
          <div className="flex items-center gap-3">
            <StarRow filled={rating} size={20} />
            <span
              className="font-semibold text-sm"
              style={{ color: "var(--color-text)" }}
            >
              {rating}/5
            </span>
            <span
              className="text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>

        {user && (
          <button
            className="btn btn-primary btn-sm self-start sm:self-auto"
            onClick={() => setShowForm((v) => !v)}
            aria-expanded={showForm}
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        )}
      </div>

      {/* ── Success toast ────────────────────────────────────────── */}
      {successMsg && (
        <div
          className="mb-6 px-4 py-3 rounded-lg text-sm font-medium"
          style={{
            background: "var(--color-success)",
            color: "#fff",
            borderRadius: "var(--radius-md)",
          }}
        >
          ✓ {successMsg}
        </div>
      )}

      {/* ── Review list ──────────────────────────────────────────── */}
      {loading ? (
        <div className="flex flex-col gap-5">
          {[0, 1, 2].map((i) => (
            <ReviewSkeleton key={i} />
          ))}
        </div>
      ) : listError ? (
        <p className="text-sm" style={{ color: "var(--color-danger)" }}>
          {listError}
        </p>
      ) : reviews.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-14 rounded-xl"
          style={{
            background: "var(--color-secondary)",
            color: "var(--color-text-muted)",
          }}
        >
          <span className="text-4xl mb-3">💬</span>
          <p className="text-sm font-medium">
            No reviews yet. Be the first to review this product.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {reviews.map((review) => {
            const initials = getInitials(review.userName);
            return (
              <div
                key={review.id}
                className="p-5"
                style={{
                  background: "var(--color-surface-raised)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 text-sm font-bold"
                      style={{
                        background: "var(--color-primary)",
                        color: "#fff",
                      }}
                    >
                      {initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="font-semibold text-sm"
                          style={{ color: "var(--color-text)" }}
                        >
                          {review.userName}
                        </span>
                        {/* The API marks reviews as approved before returning them; treat all
                            returned reviews as verified purchases */}
                        <span
                          className="badge badge-success"
                          style={{ fontSize: "9px", padding: "2px 7px" }}
                        >
                          Verified
                        </span>
                      </div>
                      <StarRow filled={review.rating} size={14} />
                    </div>
                  </div>
                  <span
                    className="text-xs flex-shrink-0"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {new Date(review.createdAt).toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text)" }}
                >
                  {review.comment}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Write a review form ──────────────────────────────────── */}
      {showForm && user && (
        <form
          onSubmit={handleSubmit}
          className="mt-8 p-6 flex flex-col gap-5"
          style={{
            background: "var(--color-surface-raised)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <h3
            className="text-lg font-bold"
            style={{ color: "var(--color-text)" }}
          >
            Write a Review
          </h3>

          {/* Star selector */}
          <div>
            <label
              className="text-sm font-medium block mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Your Rating
            </label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const starVal = i + 1;
                const filled = starVal <= (hoverRating || formRating);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormRating(starVal)}
                    onMouseEnter={() => setHoverRating(starVal)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`Rate ${starVal} star${starVal > 1 ? "s" : ""}`}
                    style={{
                      fontSize: 28,
                      color: filled ? "#D97706" : "var(--color-border)",
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      padding: 0,
                      lineHeight: 1,
                      transition: "color 0.1s",
                    }}
                  >
                    ★
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comment textarea */}
          <div>
            <label
              htmlFor="review-comment"
              className="text-sm font-medium block mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Your Review
            </label>
            <textarea
              id="review-comment"
              rows={4}
              placeholder="Share your thoughts about this product (min. 10 characters)…"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              minLength={10}
              required
              className="w-full text-sm p-3 resize-y"
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                background: "var(--color-surface)",
                color: "var(--color-text)",
                outline: "none",
              }}
            />
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-text-muted)" }}
            >
              {comment.trim().length}/10 minimum characters
            </p>
          </div>

          {/* Inline error */}
          {formError && (
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-danger)" }}
            >
              {formError}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary btn-sm"
            >
              {submitting ? "Submitting…" : "Submit Review"}
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setShowForm(false);
                setFormError(null);
                setFormRating(0);
                setComment("");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
