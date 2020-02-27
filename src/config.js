const dev = {
  STRIPE_KEY: "pk_test_YrkVfvkXfJctnYa9FTd6Y3P300w066reEG",
  s3: {
    REGION: "us-east-1",
    BUCKET: "bbqproj"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://vh9vwaqea0.execute-api.us-west-2.amazonaws.com/dev"
  }
  // cognito: {
  //   REGION: "us-east-1",
  //   USER_POOL_ID: "us-east-1_syH1siLmi",
  //   APP_CLIENT_ID: "3p3tqgl7gjbirfp0n7vlbk89gt",
  //   IDENTITY_POOL_ID: "us-east-1:1b812ce5-29e2-404e-8d45-f87542dfb2f7"
  // }
};

const prod = {
  STRIPE_KEY: "pk_test_YrkVfvkXfJctnYa9FTd6Y3P300w066reEG",
  s3: {
    REGION: "us-east-1",
    BUCKET: "bbqproj"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://vh9vwaqea0.execute-api.us-west-2.amazonaws.com/dev"
  }
  // cognito: {
  //   REGION: "us-east-1",
  //   USER_POOL_ID: "us-east-1_syH1siLmi",
  //   APP_CLIENT_ID: "3p3tqgl7gjbirfp0n7vlbk89gt",
  //   IDENTITY_POOL_ID: "us-east-1:1b812ce5-29e2-404e-8d45-f87542dfb2f7"
  // }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
