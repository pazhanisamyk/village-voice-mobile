import { CREATE_SCHEME_API, UPDATE_SCHEME_API, GET_ALL_SCHEMES_API, REMOVE_SCHEME_API } from "../../Config/Urls";
import { apiDelete, apiGet, apiPost, apiPut } from "../../Utils/Utils";

export const createScheme = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPost(CREATE_SCHEME_API, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateScheme = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPut(UPDATE_SCHEME_API, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAllSchemes = (headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_ALL_SCHEMES_API, {}, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteScheme = (id, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiDelete(REMOVE_SCHEME_API + id, {}, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
