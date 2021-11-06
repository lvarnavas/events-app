import React, {useEffect, useState} from  'react';
import { useParams } from 'react-router-dom';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

import SpecificEventsList from '../components/SpecificEventsList';
  
const SpecificEvent = () => {  
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    let [loadedEvents, setLoadedEvents] = useState();
    const eventId = useParams().eventId;

    useEffect(() => {
        const fetchEvents = async () => {
        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/events/specific/${eventId}`
            );
            setLoadedEvents(responseData.specEvent);
        } catch (err) {}
        };
        fetchEvents();
    }, [sendRequest, eventId]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedEvents && 
                <SpecificEventsList 
                    items={loadedEvents}
                />}
        </React.Fragment>
        );
    };

export default SpecificEvent;