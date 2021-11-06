import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { EventFieldsContext } from "../../shared/context/event-fields-context";

import "./EventForm.css";

const NewEvent = () => {
  const auth = useContext(AuthContext);
  const { cities, categories, prefectures } = useContext(EventFieldsContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      prefecture: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
      startDate: {
        value: "",
        isValid: false,
      },
      endDate: {
        value: "",
        isValid: false,
      },
      startTime: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      images: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

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

  const eventSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/events",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          city: formState.inputs.city.value,
          prefecture: formState.inputs.prefecture.value,
          address: formState.inputs.address.value,
          category: formState.inputs.category.value,
          startDate: formState.inputs.startDate.value,
          endDate: formState.inputs.endDate.value,
          startTime: formState.inputs.startTime.value,
          description: formState.inputs.description.value,
          images: addImages(formState.inputs.images.value),
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/");
    } catch (err) {}
  };

  const formatDate = (date) => {
    let d = date ? new Date(date) : new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  return (
    <React.Fragment>
      <h2 className="center">
        Insert the information to each field to create a new event
      </h2>
      <hr className="line" />
      <br />
      <ErrorModal error={error} onClear={clearError} />
      <form className="event-form" onSubmit={eventSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(50)]}
          errorText="Please enter a valid title (minimum 3 characters - maximum 50)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          placeholder="π.χ. Παλαιολόγου 10, 50100"
          label="Address"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(50)]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Input
          id="startDate"
          element="input"
          type="date"
          label="Start Date"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid start date."
          onInput={inputHandler}
          initialValue={formatDate()}
          initialValid={true}
        />
        <Input
          id="endDate"
          element="input"
          type="date"
          label="End Date"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid end date."
          onInput={inputHandler}
          initialValue={formatDate()}
          initialValid={true}
        />
        <Input
          id="startTime"
          element="input"
          type="time"
          label="Start Time"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid time."
          onInput={inputHandler}
        />
        <Input
          id="city"
          element="cities"
          label="City"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid city."
          onInput={inputHandler}
          options={[" ", ...cities]}
        />
        <Input
          id="prefecture"
          element="prefectures"
          type="text"
          label="Prefecture"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid prefecture."
          onInput={inputHandler}
          options={[" ", ...prefectures]}
        />
        <Input
          id="category"
          element="categories"
          label="Category"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid category."
          onInput={inputHandler}
          options={[" ", ...categories]}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          placeholder="π.χ. Η εκδήλωση..."
          validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(300)]}
          errorText="Please enter a valid description (minimum 5 characters - maximum 300)."
          onInput={inputHandler}
        />
        <ImageUpload
          id="images"
          onInput={inputHandler}
          errorText="Please provide at least one image. Notice that you can upload your images only once!"
        />
        <Button type="submit" disabled={!formState.isValid}>
          CREATE EVENT
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewEvent;
