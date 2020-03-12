import React, { useEffect, useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import {
  FormControl,
  InputLabel,
  Input,
  TextField,
  Button
} from "@material-ui/core";
import { API } from "aws-amplify";
import { useFormFields } from "../libs/hooksLib";

// material ui and get some forms
function Stripe(props) {
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [card, setCard] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { appProps } = props;
  console.log(appProps);

  const handleChange = async event => {
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
      case "card":
        setCard(event.target.value);
        break;
    }
  };

  async function handleSubmit(event) {
    setIsLoading(true);

    try {
      console.log(" handle submit clear");
      event.preventDefault();
      setIsProcessing(true);
      const { token, error } = await props.stripe.createToken({
        name: name
      });
      setIsProcessing(false);

      let response = await API.post("vic", "/billing", {
        body: {
          name: name,
          email: email,
          street: street,
          source: token.id,
          amount: appProps.adder
        }
      });
      let transactionResponse = await API.post("vic", "/transaction", {
        body: {
          name: name,
          amount: appProps.adder
        }
      });
      console.log(response, transactionResponse);
    } catch (e) {
      console.log(e);
    }
  }
  console.log(props.adder);
  console.log("Name update: ", name);
  console.log("Street update: '", street, " email: ", email, "card :", card);

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
          label="Street"
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="address"
          label="Address"
          id="email"
          autoComplete="current-password"
          onChange={handleChange}
        />

        <CardElement
          id="card"
          className="card-field"
          name="card"
          onChange={e => {
            setIsCardComplete(e.complete);
            console.log(e);
          }}
          style={{
            base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
          }}
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
}
export default injectStripe(Stripe);
