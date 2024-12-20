import { UPDATE_PROFILE_API, CHANGE_PASSWORD_API, CHANGE_DARKMODE_API, CHANGE_LANGUAGE_API, REPORT_PROBLEM_API, POLICIES_API, HELP_API, VIEW_PROFILE_API } from "../../Config/Urls";
import { apiGet, apiPost } from "../../Utils/Utils";
import store from '../store';
import types from '../types';
const { dispatch } = store;

export const saveUserData = (data) => {
  dispatch({
    type: types.LOGIN,
    payload: data,
  });
};

export const updateProfile = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPost(UPDATE_PROFILE_API, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const changePassword = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPost(CHANGE_PASSWORD_API, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const changeDarkmode = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPost(CHANGE_DARKMODE_API, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const changeLanguage = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPost(CHANGE_LANGUAGE_API, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const help = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(HELP_API, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const policies = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(POLICIES_API, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const reportProblem = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(REPORT_PROBLEM_API, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const viewProfile = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(VIEW_PROFILE_API, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
