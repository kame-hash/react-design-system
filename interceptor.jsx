// src/api/interceptor.jsx
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../store/actions/toastActions';
import { axiosInstance } from '../utils/axiosInstance';
import getToken from '../utils/getToken';

const Interceptor = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(() => getToken());

  useEffect(() => {
    const onRequest = (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    };

    const onResponse = (response) => {
      if (response.status === 401) {
        dispatch(addToast({ type: 'error', message: 'Session expired, please login again' }));
      }
      return response;
    };

    const onError = (error) => {
      if (error.response && error.response.status === 401) {
        dispatch(addToast({ type: 'error', message: 'Session expired, please login again' }));
      } else if (error.response && error.response.status === 500) {
        dispatch(addToast({ type: 'error', message: 'Internal server error, please try again later' }));
      }
      return Promise.reject(error);
    };

    axiosInstance.interceptors.request.use(onRequest);
    axiosInstance.interceptors.response.use(onResponse, onError);

    return () => {
      axiosInstance.interceptors.request.eject(onRequest);
      axiosInstance.interceptors.response.eject(onResponse);
      axiosInstance.interceptors.response.eject(onError);
    };
  }, [dispatch, token]);

  return null;
};

export default Interceptor;