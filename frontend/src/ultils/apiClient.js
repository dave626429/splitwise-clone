import axios from "axios";

const instance = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    console.log(config);
    return config;
  },
  function (error) {
    console.log(error);
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response);
    return response;
  },
  function (error) {
    console.log(error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
