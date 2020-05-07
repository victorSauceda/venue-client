import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { TextField, Button } from "@material-ui/core";
import { API } from "aws-amplify";
import { uuid } from "uuidv4";
import UIfx from "uifx";
import CashSound from "./cashsound.mp3";
const cashMoney = new UIfx(CashSound);
// material ui and get some forms
function Stripe(props) {
  const [isCardComplete, setIsCardComplete] = useState(false);
  // const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");

  // const [isLoading, setIsLoading] = useState(false);
  const { appProps } = props;

  const handleChange = async (event) => {
    switch (event.target.id) {
      case "name":
        setName(event.target.value);
        break;
      case "street":
        setStreet(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      default:
        console.error("invalid value");
    }
  };

  async function handleSubmit(event) {
    // setIsLoading(true);

    try {
      event.preventDefault();
      // setIsProcessing(true);     //not sure if using

      //there was an error argument after {token, error} took it out because it was not being used
      const { token } = await props.stripe.createToken({
        name: name,
      });
      let transactionResponseBody = {
        restaurantId: uuid(),
        orderId: uuid(),
        createdAt: Date.now(),
        restaurantName: name,
        customerName: name,
        salesTax: "0.3%",
        total: appProps.adder,
        cartItems: appProps.appProps.cartItems,
      };
      // setIsProcessing(false);
      localStorage.setItem("travic", transactionResponseBody);

      let billingBody = {
        name: name,
        email: email,
        street: street,
        source: token.id,
        amount: appProps.appProps.adder,
      };
      await API.post("vic", "/billing", {
        body: billingBody,
      });

      await API.post("vic", "/transaction", {
        body: transactionResponseBody,
      });
      cashMoney.play();
      props.onClose();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />

        <TextField
          id="street"
          label="Address"
          value={street}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="email"
          label="Email"
          id="email"
          autoComplete="current-password"
          onChange={handleChange}
        />
        {/* <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="address"
          label="Address"
          id="email"
          autoComplete="current-password"
          onChange={handleChange}
          style={{ marginBottom: "2rem" }}
        /> */}
        <div style={{ marginBottom: "2rem" }}>
          <CardElement
            id="card"
            className="card-field"
            name="card"
            onChange={(e) => {
              setIsCardComplete(e.complete);
            }}
            style={{
              base: {
                fontSize: "18px",
                fontFamily: '"Open Sans", sans-serif',
              },
            }}
          />
        </div>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
}
export default injectStripe(Stripe);
