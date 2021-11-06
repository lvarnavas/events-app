import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      confirmPassword: {
        value: "",
        isValid: true,
      },
      images: {
        value: null,
        isValid: true,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          images: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          images: {
            value: null,
            isValid: true,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const addImages = (images) => {
    if (!images || images.length < 1) {
      return null;
    }

    const imagesArr = [];
    for (const img of images) {
      imagesArr.push(img.image);
    }
    return JSON.stringify(imagesArr);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            images: addImages(formState.inputs.images.value),
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  const resetHandler = () => {
    history.push("/reset");
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              placeholder="Enter your full name"
              validators={[VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(40)]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            placeholder="Enter your email"
            validators={[VALIDATOR_EMAIL(), VALIDATOR_MAXLENGTH(50)]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <div>
              <Input
                element="input"
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Enter your password again"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Please enter a valid password, at least 6 characters."
                onInput={inputHandler}
              />
              <div className="profile-images">
                <h4>Profile Images</h4>
                <ImageUpload center id="images" onInput={inputHandler} />
                {formState.inputs.images.value && (
                  <p> Notice! You can upload your profile images only once.</p>
                )}
              </div>
            </div>
          )}
          <div>
            {!isLoginMode && (
              <Button
                type="submit"
                disabled={
                  !formState.isValid ||
                  formState.inputs.password.value !==
                    formState.inputs.confirmPassword.value
                }
              >
                {"CREATE AN ACCOUNT"}
              </Button>
            )}
            {isLoginMode && (
              <Button type="submit" disabled={!formState.isValid}>
                {"LOGIN"}
              </Button>
            )}
          </div>
        </form>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? "CREATE AN ACCOUNT" : "LOGIN"}
        </Button>
        <button className="forgot-button" onClick={resetHandler}>
          Forgot your password?
        </button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
