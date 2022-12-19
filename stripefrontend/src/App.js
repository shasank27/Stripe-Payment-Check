import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

function App() {
  const [product, setProduct] = useState({
    name: "Something",
    price: 10,
    productBy: "Periwal Ltd",
  });

  const makePayment = token => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch("http://localhost:8000/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then(response => {
        console.log("RESPONSE ", response);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
          stripeKey={process.env.REACT_APP_KEY}
          token={makePayment}
          name="Buy Product"
          amount={product.price * 100}
        >
          <button className="btn-large green">
            Click to buy {product.name}
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
