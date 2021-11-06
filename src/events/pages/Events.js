import React, { useEffect, useState } from 'react';

import EventsList from '../components/EventsList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Events = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedEvents, setLoadedEvents] = useState();
    
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/events' 
                );
                setLoadedEvents(eventData.events);    
            } catch (err) {}
        };
        fetchEvent();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedEvents && <EventsList items={loadedEvents} />}
        </React.Fragment>
    );
};

export default Events;