require('dotenv').config()

const sql = require("./models/db.js");

const express = require('express');
const app = express();
const cors = require('cors')
app.use( cors({
    origin: '*'
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
        [1,  {
            "id": 1,
            "label": "t-shirt",
            "img": "https://tommy-europe.scene7.com/is/image/TommyEurope/KG0KG03705_123_alternate1?$main$",
            "ref": "SHIRT1W",
            "price": 1499
        }],
        [2, {
            "id": 2,
            "label": "pantalon",
            "img": "https://www.procouteaux.com/716-large_default/pantalon-de-cuisine-pantastyle-kentaur.jpg",
            "ref": "PTL1B",
            "price": 3499
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
                            name: storeItem.label
                        },
                        unit_amount: storeItem.price
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

  function fetchArticleData(id) {
    let query = `SELECT * FROM products`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("articles: ", res);
        result(null, res);
    });
}

require("./routes/article.routes.js")(app);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
  

module.exports = app;
