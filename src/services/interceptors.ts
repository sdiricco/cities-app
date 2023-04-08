import axios, { AxiosError } from "axios";

import axiosRetry from "axios-retry";
import { useMainStore } from "@/store/main";


axiosRetry(axios, {
  retries: 5,
  onRetry,
  retryCondition: retryCondition,
});

function onRetry(retryCount: number) {
  const store = useMainStore();
  store.httpRequestRetryCount = retryCount;
}

function retryCondition(error: AxiosError) {
  return (
    axiosRetry.isNetworkOrIdempotentRequestError(error) ||
    error.code === "ECONNABORTED"
  );
}


export function activate() {
  // Add a request interceptor
  axios.interceptors.request.use(
    function (config) {
      const store = useMainStore();
      store.httpRequestOnGoing = true;

      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      const store = useMainStore();
      store.httpRequestOnGoing = false;
      store.httpRequestRetryCount = 0;


      // Do something with response data
      return response;
    },

    function (error) {
      const store = useMainStore();
      store.httpRequestOnGoing = false;
      store.httpRequestAborted = false;
      store.httpRequestRetryCount = 0;

      // Do something with response error
      if (error.code && error.code.lenght) {
        store.httpRequestAborted = true;
      }
      return Promise.reject(error);
    }
  );
}
