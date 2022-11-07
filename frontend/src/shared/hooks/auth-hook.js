import { useState, useCallback, useEffect } from 'react';
let logoutTimer;
export const useAuth = () => {

    const [token, setToken] = useState(false);
    let [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(false);



    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        setUserId(uid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpirationDate);


        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId: uid,
                token: token,
                expiration: new Date(tokenExpirationDate).toISOString()
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);
        localStorage.removeItem('userData');

    }, []);


    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = new Date(tokenExpirationDate).getTime() - new Date().getTime();

            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {

            login(storedData.userId, storedData.token, new Date(storedData.expiration));
        }
    }, [login]);

    useEffect(() => {
        const storageData = JSON.parse(localStorage.getItem('userData'));
        if (
            storageData &&
            storageData.token &&
            new Date(storageData.expiration) > new Date()
        ) {
            login(storageData.id, storageData.token, storageData.expiration)
        }
    }, [login])

    return {
        login,
        logout,
        token,
        userId
    }
}