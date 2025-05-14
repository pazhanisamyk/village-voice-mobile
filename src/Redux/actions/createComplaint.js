import { CREATE_USER_COMPLAINT, GET_ALL_USER_COMPLAINT, GET_SINGLE_USER_COMPLAINT, UPDATE_USER_COMPLAINT } from "../../Config/Urls";
import { apiGet, apiPost, apiPut } from "../../Utils/Utils";

export const createUserComplaint = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPost(CREATE_USER_COMPLAINT, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAllUserComplaint = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_ALL_USER_COMPLAINT, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateComplaintStatus = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPut(UPDATE_USER_COMPLAINT, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getSingleUserComplaint = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_SINGLE_USER_COMPLAINT, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};