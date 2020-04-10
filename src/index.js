import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import Amplify from "aws-amplify";
import App from "./App";
import store from "./store";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: "us-west-2",
    userPoolId: "us-west-2_EGFH684Go",
    identityPoolId: "us-west-2:77652e92-bc52-4388-9937-e0eabe5e44b2",
    userPoolWebClientId: "sjs500akrl9vq40ogm168qfnq"
    // userPoolWebClientId: "5d9sm8a5a3vuqaoq1rucitnr7g"
  },
  Storage: {
    region: "us-west-2",
    bucket: "venueappimages"
  },
  API: {
    endpoints: [
      {
        name: "vic",
        endpoint: "https://3hoi6nu0ng.execute-api.us-west-2.amazonaws.com/prod",
        region: "us-west-2"
      }
    ]
  }
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
