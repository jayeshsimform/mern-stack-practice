import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/component/FormElement/Button';
import Input from '../../shared/component/FormElement/Input';
import ErrorModal from '../../shared/component/UIElement/ErrorModal';
import LoadingSpinner from '../../shared/component/UIElement/LoadingSpinner';
import ImageUpload from '../../shared/component/FormElement/ImageUpload';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './NewPlace.css';



const NewPlace = () => {
    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        }
    }, false);

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const placeSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', formState?.inputs?.title?.value)
            formData.append('description', formState?.inputs?.description?.value)
            formData.append('address', formState?.inputs?.address?.value)
            formData.append('image', formState?.inputs?.image?.value)
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/api/places/',
                'POST',
                formData,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            navigate('/');

        }
        catch (err) {

        }

    }

    return (<>
        {isLoading && <LoadingSpinner asOverlay />}
        <ErrorModal error={error} onClear={clearError} />
        <form className='place-form' onSubmit={placeSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
            />
            <Input
                id="description"
                element="textarea"
                type="text"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 character)."
                onInput={inputHandler}
            />
            <Input
                id="address"
                element="input"
                type="text"
                label="Address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid address."
                onInput={inputHandler}
            />

            <ImageUpload
                id="image"
                onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    </>
    );
}



export default NewPlace;