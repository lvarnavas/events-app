import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import { useHttpClient } from "../../shared/hooks/http-hook";

import "../../events/pages/EventForm.css";

const NewPassword = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUserId, setLoadedUserId] = useState();
  const [loadedToken, setLoadedToken] = useState();
  const token = useParams().token;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      password: {
        value: "",
        isValid: false,
      },
      retypepassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/reset/${token}`
        );
        setLoadedUserId(responseData.userId);
        setLoadedToken(responseData.passwordToken);
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest, token, setFormData]);

  const userUpdateSubmitHandler = async (user) => {
    user.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/newpassword`,
        "POST",
        JSON.stringify({
          password: formState.inputs.password.value,
          userId: loadedUserId,
          passwordToken: loadedToken,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedUserId && loadedToken && (
        <form className="event-form" onSubmit={userUpdateSubmitHandler}>
          <h2 className="center"> Enter your new password </h2>
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_REQUIRE(6)]}
            errorText="Please enter a valid password."
            onInput={inputHandler}
            initialValid={true}
          />
          <Input
            id="retypepassword"
            element="input"
            type="password"
            label="Re-type the new password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password."
            onInput={inputHandler}
          />
          {formState.inputs.password.value ===
            formState.inputs.retypepassword.value &&
            formState.isValid && <Button type="submit">UPDATE PASSWORD</Button>}
        </form>
      )}
    </React.Fragment>
  );
};

export default NewPassword;
