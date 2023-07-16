import axios from 'axios';
import {HttpConfig} from './config';
import Toast from 'react-native-toast-message';

// Create an instance of Axios with a base URL
const Http = axios.create({baseURL: HttpConfig.baseURL});

// Export the Http instance as the default export
export default Http;

// Add a response interceptor to handle errors globally
Http.interceptors.response.use(null, ({response, config, message}) => {
  const {status} = response || {};

  // Convert the response data to a string and remove unnecessary characters
  const errorMessage = JSON.stringify(response?.data)?.replace(/["{}]/g, ' ');

  // Determine the type of Toast message based on the status code
  const type = status >= 400 && status < 500 ? 'error' : 'default';

  // Show a Toast message with the error details
  Toast.show({
    type,
    text1: 'Error',
    text2: errorMessage || message,
    autoHide: true,
    visibilityTime: 2000
  });

  // Reject the promise with the error details
  return Promise.reject({response, config, message});
});
