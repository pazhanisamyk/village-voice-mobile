import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { navigationRef } from "../Navigation/NavigationService";
import { userLogout } from "../Redux/actions/auth";
import { showError } from "./helperfunctions";

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

  export const setUserData = async (data) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };
  
  export const getUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load user data:', error);
      return null;
    }
  };

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
        .catch(async (error) => {
          console.log('API error:', error?.response?.status);
        
          if (error?.response?.status === 401) {
            await clearUserData();
            userLogout();
            showError('Session expired. Please login again.')
        
            // Reset the entire stack and navigate to Login
            navigationRef.current?.reset({
              index: 0,
              routes: [{ name: "WelcomeScreen" }],
            });
          }
        
          return rej(error);
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