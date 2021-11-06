import React from "react";

import EventItemOfUser from "./EventItemOfUser";
import Button from "../../shared/components/FormElements/Button";
import "./EventListOfUser.css";

const EventListOfUser = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="not-own">
        <h2>You don't own any event. Maybe create one?</h2>
        <Button to="/events/new">CREATE EVENT</Button>
      </div>
    );
  }

  return (
    <ul className="event-list-of-user">
      {props.items.map((event) => (
        <EventItemOfUser
          key={event.id}
          id={event.id}
          images={JSON.parse(event.images)}
          title={event.title}
          address={event.address}
          startDate={event.startDate}
          endDate={event.endDate}
          startTime={event.startTime}
          description={event.description}
          lat={event.lat}
          lng={event.lng}
          category={event.category.category}
          city={event.city.city}
          prefecture={event.prefecture.prefecture}
          creatorId={event.userId}
          onDelete={props.onDeleteEvent}
          eventsCount={props.eventsCount}
        />
      ))}
    </ul>
  );
};

export default EventListOfUser;
