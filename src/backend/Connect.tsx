import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import Keys from "./Keys";
import ApiResponse from './models/ApiResponse';
import { Notify } from '@serchservice/web-ui-kit';

interface ConnectProps {
    withError?: boolean;
}

class ConnectInstance {
    private api: AxiosInstance;
    private withError: boolean;

    constructor({ withError = true }: ConnectProps) {
        this.api = axios.create({
            baseURL: Keys.BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.withError = withError;

        // Response interceptor setup
        this.api.interceptors.response.use(
            this.handleResponse.bind(this),
            this.handleError.bind(this)
        );
    }

    private handleResponse<T>(response: AxiosResponse<T>): AxiosResponse<T> | Promise<AxiosResponse<T>> {
        // Handle successful responses
        if (response.status >= 200 && response.status <= 299) {
            return response;
        } else {
            // Handle non-200 responses if needed
            Notify.error(`Unexpected status code: ${response.status}`);
            return Promise.reject(response);
        }
    }

    private async handleError(error: AxiosError): Promise<AxiosError> {
        // Handle errors
        if (error.response) {
            Notify.error(error.message);
        } else if (error.request) {
            // Request was made but no response received
            Notify.error('Network error. Please check your internet connection');
        } else {
            // Something else happened while setting up the request
            Notify.error('An unexpected error occurred. Please try again.');
        }
        return Promise.reject(error);
    }

    public async get<T>(url: string): Promise<ApiResponse<T> | undefined> {
        try {
            const response = await this.api.get<T>(url);
            const apiResponse = ApiResponse.fromJson(response.data);
            if(!apiResponse.isSuccess) {
                Notify.error(apiResponse.message);
            }

            return apiResponse;
        } catch (error: AxiosError | any) {
            if(this.withError) {
                Notify.error(error?.message || "An error occurred while fetching request");
            }
        }
    }

    public async post<T>(url: string, data: any): Promise<ApiResponse<T> | undefined> {
        try {
            const response = await this.api.post<T>(url, data);
            const apiResponse = ApiResponse.fromJson(response.data);
            if(!apiResponse.isSuccess) {
                Notify.error(apiResponse.message);
            }

            return apiResponse;
        } catch (error: AxiosError | any) {
            if(this.withError) {
                Notify.error(error?.message || "An error occurred while fetching request");
            }
        }
    }

    public async patch<T>(url: string, data?: any): Promise<ApiResponse<T> | undefined> {
        try {
            const response = await this.api.patch<T>(url, data);
            const apiResponse = ApiResponse.fromJson(response.data);
            if(!apiResponse.isSuccess) {
                Notify.error(apiResponse.message);
            }

            return apiResponse;
        } catch (error: AxiosError | any) {
            if(this.withError) {
                Notify.error(error?.message || "An error occurred while fetching request");
            }
        }
    }

    public async delete<T>(url: string, data?: any): Promise<ApiResponse<T> | undefined> {
        try {
            const response = await this.api.delete<T>(url, data);
            const apiResponse = ApiResponse.fromJson(response.data);
            if(!apiResponse.isSuccess) {
                Notify.error(apiResponse.message);
            }

            return apiResponse;
        } catch (error: AxiosError | any) {
            if(this.withError) {
                Notify.error(error?.message || "An error occurred while fetching request");
            }
        }
    }
}

const Connect = new ConnectInstance({withError: true});
export default Connect;