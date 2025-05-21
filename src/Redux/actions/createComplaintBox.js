import { CREATE_COMPLAINT_BOX, GET_ALL_COMPLAINT_BOX, UPDATE_COMPLAINT_BOX } from "../../Config/Urls";
import { apiGet, apiPost, apiPut } from "../../Utils/Utils";

export const createComplaintBox = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPost(CREATE_COMPLAINT_BOX, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateComplaintBox = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPut(UPDATE_COMPLAINT_BOX, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAllComplaintBox = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_ALL_COMPLAINT_BOX, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};