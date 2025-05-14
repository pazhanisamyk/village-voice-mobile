import { CREATE_EVENT, GET_ALL_EVENTS, REMOVE_EVENT } from "../../Config/Urls";
import { apiDelete, apiGet, apiPost } from "../../Utils/Utils";

export const createEvent = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPost(CREATE_EVENT, data, headers)
      .then((res) => {
          resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deletedEvent = (id, data, headers = {}) => {
    return new Promise((resolve, reject) => {
      apiDelete(REMOVE_EVENT + id, data, headers)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getallEvents = (query, data, headers = {}) => {
    return new Promise((resolve, reject) => {
      apiGet(GET_ALL_EVENTS + query, data, headers)
        .then((res) => {
            resolve(res?.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };