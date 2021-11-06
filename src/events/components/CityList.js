import React from 'react';

import CityItem from './CityItem';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './EventsList.css';

const CityList = props => {
    if (props.items.length === 0) {
        return (
            <div className="place-list" center="true">
                <Card>
                    <h2>No events found for this city. Maybe create one?</h2>
                    <Button to="/events/new" >Create Event</Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="event-list">
            {props.items.map(event => 
                <CityItem
                    key={event.id} 
                    id={event.id} 
                    images={JSON.parse(event.images)} 
                    title={event.title} 
                    city={event.city.city}
                    description={event.description}
                />
            )}
            
        </div>
    );
};
export default CityList;