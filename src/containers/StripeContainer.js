import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import Stripe from "./Stripe";

function StripeContainer(props) {
  return (
    <>
      <StripeProvider apiKey={"pk_test_YrkVfvkXfJctnYa9FTd6Y3P300w066reEG"}>
        <Elements>
          <Stripe {...props} onClose={props.onClose} />
        </Elements>
      </StripeProvider>
    </>
  );
}
export default StripeContainer;
