import axios from 'axios';
import {API_URL_PREFIX} from '../constants';

const buildFormData = (formData, data, parentKey) => {
  if (
    data &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    // eslint-disable-next-line no-undef
    !(data instanceof File) &&
    !data.donotConvertToJSON
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else if (data instanceof Date) {
    const value = data.toString();

    formData.append(parentKey, value);
  } else {
    data && delete data.donotConvertToJSON;

    const value = data === null ? '' : data;

    formData.append(parentKey, value);
  }
};

class ApiError extends Error {
  constructor(message = 'Oops.. Something went wrong.', code = 500, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.name = 'ApiError';
    // Custom debugging information
    this.message = message;
    this.code = code;
  }
}

class API {
  execute = (api, params) => {
    return new Promise(async (resolve, reject) => {
      let headers = {};
      headers = {
        'x-access-token': localStorage.getItem('token', null),
      };

      const formData = new FormData();
      params && api.method.dataFormat === 'formData' && buildFormData(formData, params.data);
      return axios({
        method: api.method.type,
        url: `${api.noPrefixRequired ? '' : API_URL_PREFIX}${api.path}`,
        data: params ? (api.method.dataFormat === 'formData' ? formData : params.data) : null,
        headers:
          api.method.dataFormat === 'formData'
            ? {...headers, 'Content-type': 'multipart/form-data'}
            : {...headers},
        // withCredentials: true,
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          let {message} = error;
          if (error.response && error.response.data && error.response.data.message) {
            message = error.response.data.message;
          } else if (!message) {
            message = 'Request Failed.';
          }
          if (
            (error.response && error.response.status === 401) ||
            (error.response && error.response.status === 403)
          ) {
            reject(message);
          } else {
            reject(new ApiError(message, error.response ? error.response.status : null));
          }
        });
    });
  };
}

export default new API();
