import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const get = async <T>(url: string, params?: object): Promise<T> => {
  const { data } = await instance.get<T>(url, { params });
  return data;
};
