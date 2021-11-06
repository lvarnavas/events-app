import React, { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";

import PrefectureAndStartDateList from "../components/PrefectureAndStartDateList";

import "./EventPages.css";

const PrefectureAndStartDateEvents = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEvents, setLoadedEvents] = useState();
  const [prefectures, setPrefectures] = useState();
  const prefectureId = useParams().prefectureId;
  const exactdate = useParams().date;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/events/prefecture/${prefectureId}/startdate/${exactdate}`
        );
        setLoadedEvents(responseData.events);
        const pickedPrefecture = responseData.events[0].prefecture.prefecture;
        setPrefectures(pickedPrefecture);
      } catch (err) {}
    };
    fetchEvents();
  }, [sendRequest, prefectureId, exactdate]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <h2 className="event-pages__title">
        Events located in {prefectures} at {exactdate}
      </h2>
      {!isLoading && loadedEvents && (
        <PrefectureAndStartDateList items={loadedEvents} />
      )}
    </React.Fragment>
  );
};

export default PrefectureAndStartDateEvents;
