import Stripe from 'stripe';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {

    if (req.method === 'POST') {
        try {
            const params = {
                submit_type: 'pay',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: 'shr_1MnkaQSCNDcsYKGjc8up6cDf' },
                    { shipping_rate: 'shr_1MnkbySCNDcsYKGjKPdV3sYs' }
                ],
                line_items: req.body.map((item) => {
                    // const img = item.image[0].asset[0]._ref;
                    // const newImage = img.replace('image-', 'https://cdn.sanity.io/images/kaj4jp18/production/').replace('-webp', '.webp');

                    return {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: item.name
                            },
                            unit_amount: item.price * 100
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity
                    }

                }),
                mode: 'payment',
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`,
            }

            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}