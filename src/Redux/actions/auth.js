import { LOGIN_API, LOGOUT_API, SIGN_UP_API } from "../../Config/Urls";
import { sessionHandler } from "../../Utils/helperfunctions";
import { apiGet, apiPost, clearUserData } from "../../Utils/Utils";
import store from '../store';
import types from '../types';
const { dispatch } = store;

export const saveUserData = (data) => {
  dispatch({
    type: types.LOGIN,
    payload: data,
  });
};

export function userLogout() {
  clearUserData();
  dispatch({
    type: types.USER_LOGOUT,
    payload: {}
  });
}

export const signUpApi = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPost(SIGN_UP_API, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const login = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPost(LOGIN_API, data, headers)
      .then((res) => {
          resolve(res?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const logout = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(LOGOUT_API, data, headers)
      .then((res) => {
        sessionHandler();
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
