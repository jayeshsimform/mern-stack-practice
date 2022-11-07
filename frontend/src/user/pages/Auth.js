import React, {
    useState,
    useContext
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ImageUpload from '../../shared/component/FormElement/ImageUpload';
import Card from '../../shared/component/UIElement/Card';
import Input from '../../shared/component/FormElement/Input';
import Button from '../../shared/component/FormElement/Button';
import LoadingSpinner from '../../shared/component/UIElement/LoadingSpinner';
import ErrorModal from '../../shared/component/UIElement/ErrorModal';

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import './Auth.css'

const Auth = () => {
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );
    const [isLoginMode, setIsLoginMode] = useState(true);

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const authSubmitHandler = async (e) => {
        e.preventDefault();
        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/api/users/login',
                    'POST',
                    JSON.stringify({
                        email: formState?.inputs?.email?.value,
                        password: formState?.inputs?.password?.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    })
                auth.login(responseData?.userId, responseData.token);
                navigate('/')
            }
            catch (err) {

            }
        }
        else {
            try {
                const formData = new FormData();
                formData.append('email', formState?.inputs?.email?.value);
                formData.append('name', formState?.inputs?.name?.value);
                formData.append('password', formState?.inputs?.password?.value);
                formData.append('image', formState?.inputs?.image?.value);

                await sendRequest(process.env.REACT_APP_BACKEND_URL + '/api/users/signup',
                    'POST',
                    formData,
                );

                setIsLoginMode(true)
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                    image: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    },
                    image: {
                        value: null,
                        isValid: false
                    }
                },
                false
            );
        }
        setIsLoginMode(prevMode => !prevMode);
    }
    const errorHandler = () => {
        clearError(null)
    }
    return (
        <>
            <ErrorModal error={error} onClear={errorHandler} />
            <Card className="authentication">

                {
                    isLoading ? <LoadingSpinner asOverlay /> : ""
                }
                <h2>Login Required</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    {
                        !isLoginMode && <Input
                            id="name"
                            type="text"
                            label="Your Name"
                            element="input"
                            errorText="Please enter a valid name"
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={inputHandler}
                        />
                    }
                    {!isLoginMode &&
                        <ImageUpload
                            center
                            id="image"
                            onInput={inputHandler}
                            errorText='Please provide an image.'
                        />
                    }
                    <Input
                        id="email"
                        type="email"
                        label="E-mail"
                        element="input"
                        errorText="Please enter a valid email address"
                        validators={[VALIDATOR_EMAIL()]}
                        onInput={inputHandler}
                    />
                    <Input
                        id="password"
                        type="password"
                        label="Password"
                        element="input"
                        errorText="Please enter a valid password, at least 5 characters"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        onInput={inputHandler}
                    />

                    <Button type="submit" disabled={!formState.isValid}>
                        {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                    SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
                </Button>
            </Card>
        </>
    );
}


export default Auth;