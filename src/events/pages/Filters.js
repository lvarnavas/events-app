import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { EventFieldsContext } from "../../shared/context/event-fields-context";

import "./EventForm.css";

const FilterCity = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { cities, categories, prefectures } = useContext(EventFieldsContext);

  const [formState, inputHandler] = useForm(
    {
      city: {
        value: "",
        isValid: false,
      },
      startDateOfCity: {
        value: "",
        isValid: false,
      },
      prefecture: {
        value: "",
        isValid: false,
      },
      startDateOfPrefecture: {
        value: "",
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
      startDateOfCategory: {
        value: "",
        isValid: false,
      },
      startDate: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const eventCitySubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/events/city",
        "POST",
        JSON.stringify({
          city: formState.inputs.city.value,
          startDateOfCity: formState.inputs.startDateOfCity.value,
        }),
        { "Content-Type": "application/json" }
      );
      const pickedCityId = responseData.events[0].city.id;
      let pickedDate = formState.inputs.startDateOfCity.value;
      if (pickedDate === "") {
        history.push("/city/" + pickedCityId);
      } else {
        history.push("/dateofcity/" + pickedDate + "/" + pickedCityId);
      }
    } catch (err) {}
  };

  const eventPrefectureSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/events/prefecture",
        "POST",
        JSON.stringify({
          prefecture: formState.inputs.prefecture.value,
          startDateOfPrefecture: formState.inputs.startDateOfPrefecture.value,
        }),
        { "Content-Type": "application/json" }
      );
      const pickedPrefectureId = responseData.events[0].prefecture.id;
      let pickedDate = formState.inputs.startDateOfPrefecture.value;
      if (pickedDate === "") {
        history.push("/prefecture/" + pickedPrefectureId);
      } else {
        history.push(
          "/dateofprefecture/" + pickedDate + "/" + pickedPrefectureId
        );
      }
    } catch (err) {}
  };

  const eventCategorySubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/events/category",
        "POST",
        JSON.stringify({
          category: formState.inputs.category.value,
          startDateOfCategory: formState.inputs.startDateOfCategory.value,
        }),
        { "Content-Type": "application/json" }
      );
      const pickedCategoryId = responseData.events[0].category.id;
      let pickedDate = formState.inputs.startDateOfCategory.value;
      if (pickedDate === "") {
        history.push("/category/" + pickedCategoryId);
      } else {
        history.push("/dateofcategory/" + pickedDate + "/" + pickedCategoryId);
      }
    } catch (err) {}
  };

  const eventStartDateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/events/startdate",
        "POST",
        JSON.stringify({
          startDate: formState.inputs.startDate.value,
        }),
        { "Content-Type": "application/json" }
      );
      const pickedDate = responseData.events[0].startDate;
      history.push("/startdate/" + pickedDate);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="search-form" onSubmit={eventCitySubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>
          Search by
          <span> city </span>
        </h2>
        <div className="center">
          <div>
            <Input
              id="city"
              element="cities"
              label="Pick city"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please pick a city"
              onInput={inputHandler}
              options={[" ", ...cities]}
            />
          </div>
          <div style={{ marginLeft: "50px" }}>
            <Input
              id="startDateOfCity"
              element="input"
              type="date"
              label="Pick starting date"
              errorText="Please pick a date"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </div>
        </div>
        <div className="center">
          <Button
            disabled={
              !formState.inputs.city.value &&
              !formState.inputs.startDateOfCity.value
            }
            type="submit"
          >
            SEARCH
          </Button>
        </div>
      </form>
      <br />
      <form className="search-form" onSubmit={eventPrefectureSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>
          Search by
          <span> prefecture </span> &nbsp;
        </h2>
        <div className="center">
          <div>
            <Input
              id="prefecture"
              element="prefectures"
              label="Pick prefecture"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please pick a prefecture."
              onInput={inputHandler}
              options={[" ", ...prefectures]}
            />
          </div>
          <div style={{ marginLeft: "50px" }}>
            <Input
              id="startDateOfPrefecture"
              element="input"
              type="date"
              label="Pick starting date"
              errorText="Please pick a date"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </div>
        </div>
        <div className="center">
          <Button
            disabled={
              !formState.inputs.prefecture.value &&
              !formState.inputs.startDateOfPrefecture.value
            }
            type="submit"
          >
            SEARCH
          </Button>
        </div>
      </form>
      <br />
      <form className="search-form" onSubmit={eventCategorySubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>
          Search by
          <span> category </span>
        </h2>
        <div className="center">
          <div>
            <Input
              id="category"
              element="categories"
              label="Pick category"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please pick a category."
              onInput={inputHandler}
              options={[" ", ...categories]}
            />
          </div>
          <div style={{ marginLeft: "50px" }}>
            <Input
              id="startDateOfCategory"
              element="input"
              type="date"
              label="Pick starting date"
              errorText="Please pick a date"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </div>
        </div>
        <div className="center">
          <Button
            disabled={
              !formState.inputs.category.value &&
              !formState.inputs.startDateOfCategory.value
            }
            type="submit"
          >
            SEARCH
          </Button>
        </div>
      </form>
      <br />
      <form className="search-form" onSubmit={eventStartDateSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>
          Search by
          <span> date </span> &nbsp;
        </h2>
        <div className="center">
          <Input
            id="startDate"
            element="input"
            type="date"
            label="Pick starting date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please pick a date."
            onInput={inputHandler}
          />
        </div>
        <div className="center">
          <Button disabled={!formState.inputs.startDate.value} type="submit">
            SEARCH
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default FilterCity;
