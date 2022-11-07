import React from 'react';
import Card from '../../shared/component/UIElement/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/component/FormElement/Button';

import './PlaceList.css'
const PlaceList = ({ items, onDeletePlace }) => {
    if (items?.length === 0) {
        return (
            <div className='place-list center'>
                <Card>
                    <h2>No place found. Maybe create one?</h2>
                    <Button to="/place/new">Share places</Button>
                </Card>
            </div>
        );
    }
    return <ul className='place-list'>
        {
            items?.map(place => <PlaceItem
                key={place?.id}
                id={place?.id}
                image={place?.image}
                title={place.title}
                address={place?.address}
                creatorId={place?.creatorId}
                coordinates={place?.location}
                description={place?.description}
                onDelete={onDeletePlace}
            />)
        }
    </ul>
}

export default PlaceList;