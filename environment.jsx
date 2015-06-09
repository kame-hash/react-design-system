// src/config/environment.jsx
import { useState, useEffect } from 'react';
import cookies from 'js-cookie';
import { config } from './config';
import { EnvironmentType } from './types';

const getEnvironment = () => {
  const env = process.env.REACT_APP_ENV;
  if (!env) {
    throw new Error('REACT_APP_ENV environment variable is not defined');
  }
  return env as EnvironmentType;
};

const getApiUrl = (environment: EnvironmentType) => {
  switch (environment) {
    case 'production':
      return 'https://api.example.com';
    case 'staging':
      return 'https://stg-api.example.com';
    case 'development':
      return 'http://localhost:3000/api';
    default:
      throw new Error(`Unsupported environment: ${environment}`);
  }
};

const getTheme = () => {
  const theme = cookies.get('theme');
  return theme ? theme : 'light';
};

const setTheme = (theme: string) => {
  cookies.set('theme', theme, { expires: 365 });
};

const Configuration = () => {
  const [environment, setEnvironment] = useState(getEnvironment());
  const [apiUrl, setApiUrl] = useState(getApiUrl(environment));
  const [theme, setThemeState] = useState(getTheme());

  useEffect(() => {
    setEnvironment(getEnvironment());
    setApiUrl(getApiUrl(environment));
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setThemeState(newTheme);
  };

  return {
    environment,
    apiUrl,
    theme,
    handleThemeChange,
  };
};

export const { environment, apiUrl, theme, handleThemeChange } = Configuration();