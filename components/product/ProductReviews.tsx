import { Product } from '@/types/product.types';

const MOCK_REVIEWS = [
  { id: '1', author: 'James T.', rating: 5, date: '2024-03-10', body: 'Incredible quality. Arrived perfectly packaged and exactly as described. Will definitely buy again!', verified: true },
  { id: '2', author: 'Sarah M.', rating: 4, date: '2024-02-28', body: 'Beautiful piece, slight delay in shipping but the item itself is perfect. Very happy overall.', verified: true },
  { id: '3', author: 'Derek R.', rating: 5, date: '2024-01-15', body: 'Perry Collectibles never disappoints. Authentic, well-packaged, and fast shipping.', verified: false },
];

interface ProductReviewsProps {
  product: Product;
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
          Customer Reviews
          <span className="ml-2 text-base font-normal" style={{ color: 'var(--color-text-muted)' }}>
            ({product.reviewCount})
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ color: i < Math.floor(product.rating) ? '#D97706' : 'var(--color-border)' }}>★</span>
            ))}
          </div>
          <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{product.rating}/5</span>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {MOCK_REVIEWS.map((review) => (
          <div
            key={review.id}
            className="p-5"
            style={{
              background: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{review.author}</span>
                  {review.verified && (
                    <span className="badge badge-success" style={{ fontSize: '9px', padding: '2px 7px' }}>Verified</span>
                  )}
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-sm" style={{ color: i < review.rating ? '#D97706' : 'var(--color-border)' }}>★</span>
                  ))}
                </div>
              </div>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>{review.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
