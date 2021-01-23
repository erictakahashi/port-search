import { create } from 'axios';

import { API_KEY, API_PATH } from '../constants/api';

export const axiosInstance = create({
  baseURL: API_PATH,
  headers: {
    "X-Api-Key": API_KEY
  }
});

export default axiosInstance;
