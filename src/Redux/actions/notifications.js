import { GET_NOTIFICATIONS_API, GET_UNREAD_NOTIFICATIONS_COUNT_API, MARK_NOTIFICATION_READ_API, MARK_ALL_NOTIFICATIONS_READ_API } from "../../Config/Urls";
import { apiGet, apiPut } from "../../Utils/Utils";

export const getNotifications = (headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_NOTIFICATIONS_API, {}, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUnreadNotificationsCount = (headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_UNREAD_NOTIFICATIONS_COUNT_API, {}, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const markNotificationRead = (id, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPut(MARK_NOTIFICATION_READ_API + id, {}, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const markAllNotificationsRead = (headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPut(MARK_ALL_NOTIFICATIONS_READ_API, {}, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
