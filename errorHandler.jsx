// src/errors/errorHandler.jsx
import React from 'react';
import { ErrorType } from '../types/errorTypes';
import logger from '../utils/logger';

const errorHandler = (error) => {
  const { message, type } = error;
  switch (type) {
    case ErrorType.API_ERROR:
      logger.error(`API error: ${message}`);
      break;
    case ErrorType.AUTH_ERROR:
      logger.error(`Auth error: ${message}`);
      break;
    case ErrorType.VALIDATION_ERROR:
      logger.error(`Validation error: ${message}`);
      break;
    default:
      logger.error(`Unknown error: ${message}`);
  }
};

const ComponentError = ({ error }) => {
  const { message, type } = error;
  return (
    <div role="alert" aria-live="assertive">
      <h2>Error: {type}</h2>
      <p>{message}</p>
    </div>
  );
};

class DesignSystemError extends Error {
  constructor(message, type) {
    super(message);
    this.type = type;
  }
}

const apiError = (message) => {
  throw new DesignSystemError(message, ErrorType.API_ERROR);
};

const authError = (message) => {
  throw new DesignSystemError(message, ErrorType.AUTH_ERROR);
};

const validationError = (message) => {
  throw new DesignSystemError(message, ErrorType.VALIDATION_ERROR);
};

const useErrorHandler = () => {
  const handleApiError = (error) => {
    // handle API error, e.g. network error
    errorHandler(error);
  };
  const handleAuthError = (error) => {
    // handle auth error, e.g. invalid credentials
    errorHandler(error);
  };
  const handleValidationError = (error) => {
    // handle validation error, e.g. invalid form data
    errorHandler(error);
  };
  return { handleApiError, handleAuthError, handleValidationError };
};

export { errorHandler, ComponentError, DesignSystemError, apiError, authError, validationError, useErrorHandler };