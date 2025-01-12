import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const get = async <T>(url: string, config?: AxiosRequestConfig) => {
  const { data } = await instance.get<T>(url, config);
  return data;
};
