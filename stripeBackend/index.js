const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.SECRET_KEY);

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("IT WORKS");
});

app.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log(product);
  console.log(product.price);

  const idempontencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then(customer => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchanse of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey },
      );
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err));
});

app.listen(process.env.PORT, () =>
  console.log(`LISTENING AT PORT ${process.env.PORT}`),
);
