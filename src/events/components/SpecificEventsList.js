import React from 'react';

import SpecificEventItem from './SpecificEventItem';

import './SpecificEventsList.css';

const SpecificEventsList = props => {
    return (
        <ul className="specific-list">
            {props.items.map(event => 
                <SpecificEventItem 
                    key={event.id} 
                    id={event.id} 
                    images={JSON.parse(event.images)} 

                    title={event.title}
                    address={event.address}
                    startDate={event.startDate}
                    endDate={event.endDate}
                    startTime={event.startTime} 
                    description={event.description}

                    category={event.category.category}
                    city={event.city.city}
                    prefecture={event.prefecture.prefecture}

                    creator={event.user.name}
                    creatorId={event.userId} 
                    lat={event.lat}
                    lng={event.lng}
                />

            )}
        </ul>
    );
};

export default SpecificEventsList;