import React, { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";

import PrefectureList from "../components/PrefectureList";

import "./EventPages.css";

const PrefectureEvents = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEvents, setLoadedEvents] = useState();
  const [prefec, setPrefec] = useState();
  const prefectureId = useParams().prefectureId;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/events/prefecture/${prefectureId}`
        );
        setLoadedEvents(responseData.events);
        const pickedPrefecture = responseData.events[0].prefecture.prefecture;
        setPrefec(pickedPrefecture);
      } catch (err) {}
    };
    fetchEvents();
  }, [sendRequest, prefectureId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <h2 className="event-pages__title">Events located in {prefec}</h2>
      {!isLoading && loadedEvents && <PrefectureList items={loadedEvents} />}
    </React.Fragment>
  );
};

export default PrefectureEvents;
