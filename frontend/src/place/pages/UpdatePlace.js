import React, { useState, useEffect, useContext } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Input from '../../shared/component/FormElement/Input';
import Button from '../../shared/component/FormElement/Button';
import Card from '../../shared/component/UIElement/Card';
import LoadingSpinner from '../../shared/component/UIElement/LoadingSpinner';
import ErrorModal from '../../shared/component/UIElement/ErrorModal';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/utils/validators';

const UpdatePlace = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const placeId = useParams()?.placeId;
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const navigate = useNavigate();
    const auth = useContext(AuthContext)

    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        false
    );

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`, 'GET');
                setLoadedPlaces(responseData?.place);

                setFormData(
                    {
                        title: {
                            value: responseData?.place?.title,
                            isValid: true
                        },
                        description: {
                            value: responseData?.place?.description,
                            isValid: true
                        }
                    },
                    true
                );
            } catch (err) {
                setLoadedPlaces()
                setFormData(
                    {
                        title: {
                            value: '',
                            isValid: true
                        },
                        description: {
                            value: '',
                            isValid: true
                        }
                    },
                    true
                );
            }
        }
        fetchPlaces()
    }, [sendRequest, placeId, setFormData])

    const placeUpdateSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            navigate(`/${auth?.userId}/places`)
        }
        catch (err) {

        }
    };

    if (!loadedPlaces) {
        return (

            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>

        );
    }
    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner asOverlay />
            </div>
        );
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                    initialValue={loadedPlaces?.title}
                    initialValid={true}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (min. 5 characters)."
                    onInput={inputHandler}
                    initialValue={loadedPlaces?.description}
                    initialValid={true}
                />
                <Button type="submit" disabled={!formState?.isValid}>
                    UPDATE PLACE
                </Button>
            </form>
        </>
    );
};

export default UpdatePlace;