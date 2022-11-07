import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import ErrorModal from '../../shared/component/UIElement/ErrorModal';
import LoadingSpinner from '../../shared/component/UIElement/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import PlaceList from '../component/PlaceList';
const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState([]);

    const userId = useParams()?.userId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/places/user/${userId}`, 'GET');
                setLoadedPlaces(responseData?.places)
            } catch (err) {
                setLoadedPlaces([])
            }
        }
        fetchPlaces()
    }, [sendRequest, userId]);

    const placeDeleteHandler = (deletedPlaceId) => {
        setLoadedPlaces(prevPlace => prevPlace.filter(place => place.id !== deletedPlaceId))
    }
    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {
                isLoading &&
                <div className='center'>
                    <LoadingSpinner asOverlay />
                </div>
            }
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />}
        </>

    );
}

export default UserPlaces;