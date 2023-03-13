import React, {useCallback, useState} from "react";


// 'https://react-course-86712-default-rtdb.europe-west1.firebasedatabase.app/products.json'
const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendHttpRequest = useCallback(async (requestOptions, manageData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(requestOptions.url, {
          method: requestOptions.method ? requestOptions.method : 'GET',
          headers: requestOptions.headers ? requestOptions.headers: {},
          body: requestOptions.body ? JSON.stringify(requestOptions.body) : null,
        });

        if (!response.ok) {
          throw new Error("error.");
        }
        const data = await response.json();
        manageData(data);

      } catch (err) {
        setError(err.message || "error..");
      }
      setIsLoading(false);
    }, []) ;

    return {
      isLoading: isLoading,
      error: error,
      sendHttpRequest: sendHttpRequest
    }
}

export default useHttp;
