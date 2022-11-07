import { useCallback, useState } from "react"
export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState();
    const sendRequest = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setIsLoading(true)
            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                })
                const responseData = await response.json();
                clearError()


                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setIsLoading(false);
                return responseData;
            }
            catch (err) {
                console.log("err", err)
                setError(err.message);
                setIsLoading(false);
                throw err;
            }


        }, [])

    const clearError = () => {
        setError(null)
    }

    return {
        isLoading,
        error,
        sendRequest,
        clearError
    }
}