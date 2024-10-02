import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;
// Structure for rest apis
export const post = async (
  url,
  data,
  authenticationRequired = true,
  contentType = "application/json"
) => {
  let options = {
    url,
    data,
    method: "post",
    responseType: "json",
  };

  options = await addRequestHeaders(
    options,
    authenticationRequired,
    contentType
  );
  return axios(options);
};

export const put = async (url, data, authenticationRequired = true) => {
  let options = {
    url,
    data,
    method: "put",
    responseType: "json",
  };

  options = await addRequestHeaders(options, authenticationRequired);
  return axios(options);
};

export const deleteReq = async (url, data, authenticationRequired = true) => {
  let options = {
    url,
    data,
    method: "delete",
    responseType: "json",
  };

  options = await addRequestHeaders(options, authenticationRequired);
  return axios(options);
};

export const patch = async (url, data, authenticationRequired = true) => {
  let options = {
    url,
    data,
    method: "patch",
    responseType: "json",
  };

  options = await addRequestHeaders(options, authenticationRequired);
  return axios(options);
};

export const get = async (
  url,
  data = null,
  authenticationRequired = true,
  responseType = "json"
) => {
  let options = {
    url,
    data,
    method: "get",
    responseType,
  };

  options = await addRequestHeaders(options, authenticationRequired);

  return axios(options);
};

export const remove = async (url, authenticationRequired = true) => {
  let options = {
    url,
    method: "delete",
    responseType: "json",
  };

  options = await addRequestHeaders(options, authenticationRequired);
  return axios(options);
};

const addRequestHeaders = async (
  options,
  authenticationRequired,
  contentType = "application/json"
) => {
  options.headers = {};
  let token = localStorage.getItem("token");
  if (token) token = JSON.parse(token);
  if (authenticationRequired && token) {
    options.headers.Authorization = `Bearer ${token}`;
    options.headers["Content-Type"] = contentType;
  }
  return options;
};

// Add a request interceptor
axios.interceptors.request.use(
  (interceptedRequest) => {
    return interceptedRequest;
  },
  (interceptedRequestError) => {
    return Promise.reject(interceptedRequestError);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (interceptedResponse) => {
    return interceptedResponse;
  },
  (interceptedResponseError) => {
    if (
      interceptedResponseError.response &&
      interceptedResponseError.response.status === 401
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      window.location.href = "/";
    } else {
      throw interceptedResponseError.response
        ? interceptedResponseError.response.data
        : interceptedResponseError;
    }
    return Promise.reject(interceptedResponseError);
  }
);
