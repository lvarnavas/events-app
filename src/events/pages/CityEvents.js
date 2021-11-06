import React, { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";

import CityList from "../components/CityList";
import "./EventPages.css";

const CityEvents = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEvents, setLoadedEvents] = useState();
  const [cities, setCities] = useState();
  const cityId = useParams().cityId;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/events/city/${cityId}`
        );
        setLoadedEvents(responseData.events);
        const pickedCity = responseData.events[0].city.city;
        setCities(pickedCity);
      } catch (err) {}
    };
    fetchEvents();
  }, [sendRequest, cityId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <h2 className="event-pages__title">Events located in {cities}</h2>
      {!isLoading && loadedEvents && <CityList items={loadedEvents} />}
    </React.Fragment>
  );
};

export default CityEvents;
