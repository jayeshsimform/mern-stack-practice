import React, { useState, useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import Card from '../../shared/component/UIElement/Card';
import Button from '../../shared/component/FormElement/Button';
import Modal from '../../shared/component/UIElement/Modal';
import Map from '../../shared/component/UIElement/Map';
import ErrorModal from '../../shared/component/UIElement/ErrorModal';
import LoadingSpinner from '../../shared/component/UIElement/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './PlaceItem.css'
const PlaceItem = ({ id, image, title, address, creatorId, coordinates, description, onDelete }) => {
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const { isLoggedIn, token } = useContext(AuthContext)
    const onMapHandler = () => {
        setShowMap(!showMap)
    }
    const onConfirmModalHandler = () => {
        setShowConfirmModal(!showConfirmModal);
    }
    const onDeletePlaceHandler = async () => {
        try {

            await sendRequest(process.env.REACT_APP_BACKEND_URL + `/api/places/${id}`,
                'DELETE',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            );

            onDelete(id)
        }
        catch (err) {
            setShowConfirmModal(!showConfirmModal);
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {
                isLoading && <LoadingSpinner asOverlay />
            }
            <Modal
                show={showMap}
                onCancel={onMapHandler}
                header={address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={onMapHandler}>CLOSE</Button>}
            >
                <div className='map-container'>
                    <Map center={coordinates} zoom={16} />
                </div>
            </Modal>
            <Modal
                show={showConfirmModal}
                header="Are you sure?"
                footerClass="place-item__modal-actions"
                footer={<>
                    <Button inverse onClick={onConfirmModalHandler}>Cancel</Button>
                    <Button danger onClick={onDeletePlaceHandler}>Delete</Button>
                </>}>
                <p>Do you want to proceed and delete and delete this place? please note that it can't be undone thereafter.</p>
            </Modal>

            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} alt={title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{title}</h2>
                        <h3>{address}</h3>
                        <p>{description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={onMapHandler}>VIEW ON MAP</Button>

                        {
                            isLoggedIn &&
                            <><Button to={`/places/${id}`}>EDIT</Button>
                                <Button danger onClick={onConfirmModalHandler}>DELETE</Button>
                            </>
                        }

                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
}

export default PlaceItem;