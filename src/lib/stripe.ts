import Stripe from 'stripe';
const stripe = new Stripe(process.env.NODE_ENV == 'development' ? (process.env.STRIPE_SECRET_TEST_KEY ? "" : '') : (process.env.STRIPE_SECRET_KEY ? " ": ""));

export async function POST(req:any){
    const {cart} = await req.json()

    const session = await stripe.checkout.sessions.create({
        mode : 'payment',
        line_items: cart.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: `${item.name} ${item.selectSize ? `(${item.selectedSize})` : ''}`
                },
                unit_amount: Math.round(item.price * 100),
            
            },
            quantity: item.quantity,
        })),
        success_url: `${process.env.SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.SITE_URL}/cart`,
    })

    return Response.json({url: session.url})
}
