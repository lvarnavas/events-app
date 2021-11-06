import React, { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";

import CategoryList from "../components/CategoryList";

import "./EventPages.css";

const CategoryEvents = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEvents, setLoadedEvents] = useState();
  const [categ, setCateg] = useState();
  const categoryId = useParams().categoryId;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/events/category/${categoryId}`
        );
        setLoadedEvents(responseData.events);
        const pickedCategory = responseData.events[0].category.category;
        setCateg(pickedCategory);
      } catch (err) {}
    };
    fetchEvents();
  }, [sendRequest, categoryId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <h2 className="event-pages__title">Events for {categ} category</h2>
      {!isLoading && loadedEvents && <CategoryList items={loadedEvents} />}
    </React.Fragment>
  );
};

export default CategoryEvents;
