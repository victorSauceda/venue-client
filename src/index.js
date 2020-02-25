import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import Amplify from "aws-amplify";
import App from "./App";
import store from "./store";
import config from "./config";
Amplify.configure({
  // Auth: {
  //   mandatorySignIn: true,
  //   region: config.cognito.REGION,
  //   userPoolId: config.cognito.USER_POOL_ID,
  //   identityPoolId: config.cognito.IDENTITY_POOL_ID,
  //   userPoolWebClientId: config.cognito.APP_CLIENT_ID
  // },
  // Storage: {
  //   region: config.s3.REGION,
  //   bucket: config.s3.BUCKET,
  //   identityPoolId: config.cognito.IDENTITY_POOL_ID
  // },
  API: {
    endpoints: [
      {
        name: "vic",
        endpoint: "https://vh9vwaqea0.execute-api.us-west-2.amazonaws.com/dev",
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
