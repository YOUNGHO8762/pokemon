import axios, { AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { ZodSchema } from 'zod';

class HttpClient {
  private instance;

  constructor(config?: CreateAxiosDefaults) {
    this.instance = axios.create(config);
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.instance.get<T>(url, config);
    return data;
  }

  public async getAndValidate<T>(
    url: string,
    schema: ZodSchema<T>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.get<T>(url, config);
    const { success, data } = schema.safeParse(response);

    if (!success) {
      throw new Error('Invalid response from server');
    }

    return data;
  }
}

export const httpClient = new HttpClient({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
