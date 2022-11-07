import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import UserList from '../component/UserList';
import LoadingSpinner from '../../shared/component/UIElement/LoadingSpinner';
import ErrorModal from '../../shared/component/UIElement/ErrorModal';


const User = () => {
    const [loadedUser, setLoadedUser] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/api/users');
                setLoadedUser(responseData?.users)
            }
            catch (err) { }
        };
        fetchUser()
    }, [sendRequest]);

    return (
        <>
            {
                isLoading && <div className='center'><LoadingSpinner asOverlay /></div>
            }
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedUser && <UserList items={loadedUser} />}
        </>
    );

}

export default User;