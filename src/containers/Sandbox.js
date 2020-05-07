import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import Stripe from "./Stripe";

function Sandbox(props) {
  return (
    <>
      <StripeProvider apiKey={"pk_test_v1amvR35uoCNduJfkqGB8RLD"}>
        <Elements>
          <Stripe />
          <Stripe appProps={props} />
        </Elements>
      </StripeProvider>
    </>
  );
}
export default Sandbox;
