const dev = {
  STRIPE_KEY: "pk_test_YrkVfvkXfJctnYa9FTd6Y3P300w066reEG",
  s3: {
    REGION: "us-west-2",
    BUCKET: "venueappimages",
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://vh9vwaqea0.execute-api.us-west-2.amazonaws.com/dev",
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_EGFH684Go",
    APP_CLIENT_ID: "sjs500akrl9vq40ogm168qfnq",
    IDENTITY_POOL_ID: "us-west-2:77652e92-bc52-4388-9937-e0eabe5e44b2",
  },
};

const prod = {
  STRIPE_KEY: "pk_test_YrkVfvkXfJctnYa9FTd6Y3P300w066reEG",
  s3: {
    REGION: "us-west-2",
    BUCKET: "venueappimages",
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://vh9vwaqea0.execute-api.us-west-2.amazonaws.com/prod",
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_EGFH684Go",
    APP_CLIENT_ID: "sjs500akrl9vq40ogm168qfnq",
    IDENTITY_POOL_ID: "us-west-2:77652e92-bc52-4388-9937-e0eabe5e44b2",
  },
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
