import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";

export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationcode: "",
  });

  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password.length === fields.confirmPassword
    );
  }
  function validateConfirmationForm() {
    return fields.confirmationcode.length > 0;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationcode);
      await Auth.signIn(fields.email, fields.password);

      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <FormControl controlId="confirmationcode">
          <InputLabel>Confirmation Code</InputLabel>
          <Input
            autoFocus
            name="confirmationcode"
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationcode}
          />
          <Alert severity="warning">
            Please check your email for the code.
          </Alert>
        </FormControl>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          // disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </form>
    );
  }
  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormControl controlId="email">
          <InputLabel>Email</InputLabel>
          <Input
            name="email"
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormControl>
        <FormControl controlId="password" bsSize="large">
          <InputLabel>Password</InputLabel>
          <Input
            name="password"
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormControl>
        <FormControl controlId="confirmPassword" bsSize="large">
          <InputLabel>Confirm Password</InputLabel>
          <Input
            name="confirmPassword"
            type="password"
            value={fields.confirmPassword}
            onChange={handleFieldChange}
          />
        </FormControl>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          onClick={handleSubmit}
          isLoading={isLoading}
          // disabled={!validateForm()}
        >
          SignUp
        </LoaderButton>
      </form>
    );
  }
  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}
