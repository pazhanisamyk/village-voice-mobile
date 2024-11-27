import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

export async function getHeaders() {
    let userData = await AsyncStorage.getItem('userData');
    if (userData) {
      userData = JSON.parse(userData);
      return {
        authorization: `${userData?.token}`,
      };
    }
    return {};
  }

  export function setUserData(data) {
    return AsyncStorage.setItem('userData', JSON.stringify(data));
  }

  export async function getUserData() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('userData').then((data) => {
        resolve(JSON.parse(data));
      }).catch(error => reject(error));
    });
  }

  export function setItem(key, data) {
    data = JSON.stringify(data);
    return AsyncStorage.setItem(key, data);
  }
  
  export function getItem(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key).then((data) => {
        resolve(JSON.parse(data));
      });
    });
  }
  
  export function removeItem(key) {
    return AsyncStorage.removeItem(key);
  }

  export async function clearUserData() {
    return AsyncStorage.removeItem('userData');
  } 

  export async function apiReq(
    endPoint,
    data,
    method,
    headers,
    requestOptions = {},
  ) {

    console.log('endPoint:', endPoint, 'data:', data, 'method:', method, 'headers:', headers, 'requestOptions:', requestOptions);
  
    return new Promise(async (res, rej) => {
      const getTokenHeader = await getHeaders();
  
      headers = {
        ...getTokenHeader,
        ...headers,
      };
  
      if (method === 'get' || method === 'delete') {
        data = {
          ...requestOptions,
          ...data,
          headers,
        };
      }

      axios[method](endPoint, data, { headers })
        .then((result) => {
          const { data } = result;
          if (data.status === false) {
            return rej(data);
          }
  
          return res(data);
        })
        .catch((error) => { 
          console.log(error, 'error from api request')
        });
    });
  }

  export function apiPost(endPoint, data, headers = {}) {
    return apiReq(endPoint, data, 'post', headers);
  }
  
  export function apiDelete(endPoint, data, headers = {}) {
    return apiReq(endPoint, data, 'delete', headers);
  }
  
  export function apiGet(endPoint, data, headers = {}, requestOptions = {}) {
    return apiReq(endPoint, data, 'get', headers, requestOptions);
  }
  
  export function apiPut(endPoint, data, headers = {}) {
    return apiReq(endPoint, data, 'put', headers);
  }