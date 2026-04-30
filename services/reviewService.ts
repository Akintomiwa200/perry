import api from '@/lib/api';
import { Review, CreateReviewData } from '@/types/review.types';

export const reviewService = {
  async getProductReviews(slug: string): Promise<Review[]> {
    const { data } = await api.get<Review[]>(`/products/${slug}/reviews`);
    return data;
  },

  async createReview(slug: string, reviewData: CreateReviewData): Promise<Review> {
    const { data } = await api.post<Review>(`/products/${slug}/reviews`, reviewData);
    return data;
  },
};
