import React from "react";

import EventItem from "./EventItem";
import Button from "../../shared/components/FormElements/Button";
import "./EventsList.css";

const EventList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="not-found">
        <h2>
          No events found. <br />
          Would you like to be the first to create one?
        </h2>
        <Button to="/events/new">CREATE EVENT</Button>
      </div>
    );
  }

  return (
    <ul className="event-list">
      {props.items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          images={JSON.parse(event.images)}
          title={event.title}
          address={event.address}
          description={event.description}
        />
      ))}
    </ul>
  );
};
export default EventList;
