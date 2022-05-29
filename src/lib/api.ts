import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENV_API_BASE_URL,
    timeout: 7000,
  });
  