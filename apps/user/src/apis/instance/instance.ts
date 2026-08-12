import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { Storage } from '../storage/storage';
import { TOKEN } from '@/constants/common/constants';

export const maru = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

maru.interceptors.request.use(
  (config) => {
    const token = Storage.getItem(TOKEN.ACCESS);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error?: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

maru.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    const isTokenExpired =
      error.response?.status === 401 &&
      !originalRequest._retry &&
      Storage.getItem(TOKEN.REFRESH);

    if (isTokenExpired) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${token}`,
            };
            return maru(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = Storage.getItem(TOKEN.REFRESH);

        const res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth`, null, {
          headers: {
            'Refresh-Token': `${refreshToken}`,
          },
        });

        const newAccessToken = res.data.data.accessToken;

        if (!newAccessToken) {
          throw new Error('토큰 재발급 응답에 accessToken이 없습니다.');
        }

        Storage.setItem(TOKEN.ACCESS, newAccessToken);
        maru.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        return maru(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        const isAuthError =
          axios.isAxiosError(refreshError) &&
          [401, 403].includes(refreshError.response?.status ?? 0);

        if (isAuthError) {
          Storage.removeItem(TOKEN.ACCESS);
          Storage.removeItem(TOKEN.REFRESH);
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
