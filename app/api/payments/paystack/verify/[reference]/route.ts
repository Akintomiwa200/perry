import { ok, err } from '@/lib/middleware';
import { queryOne } from '@/lib/db';

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ reference: string }> },
) {
  const { reference } = await ctx.params;

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    },
  );

  const data = await response.json();
  if (!data.status || data.data.status !== 'success') {
    return err('Payment not verified', 400);
  }

  // Update order payment status
  const order = await queryOne(
    `UPDATE orders
        SET payment_status = 'paid',
            payment_reference = $1,
            status = 'processing',
            updated_at = NOW()
      WHERE payment_reference = $1 OR order_number = $1
  RETURNING *`,
    [reference],
  );

  return ok({ verified: true, order });
}
