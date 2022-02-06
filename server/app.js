require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors')
app.use( cors({
    origin: 'http://localhost:5500'
}))

app.use(express.json());

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

console.log(process.env.STRIPE_PRIVATE_KEY,process.env.STRIPE_PRIVATE_KEY);
//Notre STORE
const storeItems = new Map(
    [
        [1, {
            priceInCents: 10000,
            name: 'Rick A.'
        }],
        [2, {
            priceInCents: 2000,
            name: 'Never gonna give you up'
        }],
    ]
)

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.
        create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`
        })
        res.json({
            url: session.url
        })

    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
})

require("./routes/article.routes.js")(app);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
  

module.exports = app;
