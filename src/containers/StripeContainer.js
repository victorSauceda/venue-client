import React, { useEffect, useState } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import Stripe from "./Stripe";
import config from "../config";

function StripeContainer(props) {
  // const [isCardComplete, setIsCardComplete] = useState(false);
  // const { appProps } = props;
  return (
    <>
      <StripeProvider apiKey={"pk_test_YrkVfvkXfJctnYa9FTd6Y3P300w066reEG"}>
        <Elements>
          <Stripe {...props} />
        </Elements>
      </StripeProvider>
    </>
  );
}
export default StripeContainer;
