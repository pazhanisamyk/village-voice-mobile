import { CREATE_POLL_API, GET_ALL_POLLS_API, VOTE_POLL_API, REMOVE_POLL_API } from "../../Config/Urls";
import { apiDelete, apiGet, apiPost } from "../../Utils/Utils";

export const createPoll = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPost(CREATE_POLL_API, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAllPolls = (headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_ALL_POLLS_API, {}, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const voteInPoll = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPost(VOTE_POLL_API, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deletePoll = (id, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiDelete(REMOVE_POLL_API + id, {}, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
