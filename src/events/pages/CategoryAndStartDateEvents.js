import React, { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";

import CategoryAndStartDateList from "../components/CategoryAndStartDateList";

import "./EventPages.css";

const CategoryAndStartDateEvents = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEvents, setLoadedEvents] = useState();
  const [categories, setCategories] = useState();
  const categoryId = useParams().categoryId;
  const exactdate = useParams().date;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/events/category/${categoryId}/startdate/${exactdate}`
        );
        setLoadedEvents(responseData.events);
        const pickedCategory = responseData.events[0].category.category;
        setCategories(pickedCategory);
      } catch (err) {}
    };
    fetchEvents();
  }, [sendRequest, categoryId, exactdate]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <h2 className="event-pages__title">
        Events for {categories} category at {exactdate}
      </h2>
      {!isLoading && loadedEvents && (
        <CategoryAndStartDateList items={loadedEvents} />
      )}
    </React.Fragment>
  );
};

export default CategoryAndStartDateEvents;
