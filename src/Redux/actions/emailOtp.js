import { FORGOT_PASSWORD, SEND_OTP, VERIFY_OTP } from "../../Config/Urls";
import { apiPost } from "../../Utils/Utils";

export const sendOtp = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPost(SEND_OTP, data, headers)
      .then((res) => {
          resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const verifyOtp = (data, headers = {}) => {
    return new Promise((resolve, reject) => {
      apiPost(VERIFY_OTP, data, headers)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const forgotPassword = (data, headers = {}) => {
    return new Promise((resolve, reject) => {
      apiPost(FORGOT_PASSWORD, data, headers)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };