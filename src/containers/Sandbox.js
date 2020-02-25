import React, { useEffect, useState } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import Stripe from "./Stripe";
import config from "../config";

function Sandbox(props) {
  const [isCardComplete, setIsCardComplete] = useState(false);
  return (
    <>
      <StripeProvider apiKey={"pk_test_v1amvR35uoCNduJfkqGB8RLD"}>
        <Elements>
          <Stripe />
        </Elements>
      </StripeProvider>
    </>
  );
}
export default Sandbox;