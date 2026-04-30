import { withAuth, ok, err } from '@/lib/middleware';

export const POST = withAuth(async (req, _ctx, session) => {
  const body = await req.json();
  const { email, amount, reference } = body; // amount in kobo (NGN)

  if (!email || !amount || !reference) {
    return err('email, amount, and reference are required', 400);
  }

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount,
      reference,
      currency: 'NGN',
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/verify`,
      metadata: {
        user_id: session.userId,
        custom_fields: [],
      },
    }),
  });

  const data = await response.json();
  if (!data.status) return err(data.message || 'Paystack initialization failed', 400);

  return ok({
    authorizationUrl: data.data.authorization_url,
    reference: data.data.reference,
    accessCode: data.data.access_code,
  });
});
