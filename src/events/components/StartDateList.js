import React from 'react';

import StartDateItem from './StartDateItem';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './EventsList.css';

const StartDateList = props => {
    if (props.items.length === 0) {
        return (
            <div className="place-list" center="true">
                <Card>
                    <h2>No events found for this starting date. Maybe create one?</h2>
                    <Button to="/events/new" >Create Event</Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="event-list">
            {props.items.map(event => 
                <StartDateItem
                    key={event.id} 
                    id={event.id} 
                    images={JSON.parse(event.images)}  
                    title={event.title} 
                    startDate={event.startDate}
                    description={event.description}
                />
            )}
        </div>
    );
};
export default StartDateList;