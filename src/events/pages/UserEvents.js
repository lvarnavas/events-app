import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EventListOfUser from "../components/EventListOfUser";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "../../events/components/EventItem.css";
import "../pages/EventPages.css";

const UserEvents = () => {
  const [loadedEvents, setLoadedEvents] = useState();
  const [length, setLength] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/events/user/${userId}`
        );
        setLoadedEvents(responseData.events);
        setLength(responseData.events.length);
      } catch (err) {}
    };
    fetchEvents();
  }, [sendRequest, userId]);

  const eventDeletedHandler = (deletedEventId) => {
    setLoadedEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== deletedEventId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {length > 0 && (
        <div className="created-events">
          <h2>
            You have created {length} {length === 1 ? "event" : "events"}
          </h2>
          <hr className="line" />
        </div>
      )}
      <br />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedEvents && (
        <EventListOfUser
          items={loadedEvents}
          onDeleteEvent={eventDeletedHandler}
          eventsCount={length}
        />
      )}
    </React.Fragment>
  );
};

export default UserEvents;
