// src/types/components.jsx
import PropTypes from 'prop-types';

export const ButtonType = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
};

export const ButtonSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

export const ModalType = {
  ALERT: 'alert',
  CONFIRM: 'confirm',
  PROMPT: 'prompt',
};

export const DatePickerFormat = {
  DATE: 'date',
  DATE_TIME: 'date-time',
  TIME: 'time',
};

export const ToastType = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

export const InputType = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  NUMBER: 'number',
};

export const DropdownPosition = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
};

export const ComponentProps = {
  button: {
    type: PropTypes.shape({
      children: PropTypes.node,
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
      type: PropTypes.oneOf(Object.values(ButtonType)),
      size: PropTypes.oneOf(Object.values(ButtonSize)),
    }),
  },
  modal: {
    type: PropTypes.shape({
      isOpen: PropTypes.bool,
      onClose: PropTypes.func,
      title: PropTypes.string,
      type: PropTypes.oneOf(Object.values(ModalType)),
    }),
  },
  dropdown: {
    type: PropTypes.shape({
      children: PropTypes.node,
      isOpen: PropTypes.bool,
      onClose: PropTypes.func,
      position: PropTypes.oneOf(Object.values(DropdownPosition)),
    }),
  },
  datePicker: {
    type: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func,
      format: PropTypes.oneOf(Object.values(DatePickerFormat)),
    }),
  },
  toast: {
    type: PropTypes.shape({
      message: PropTypes.string,
      onClose: PropTypes.func,
      type: PropTypes.oneOf(Object.values(ToastType)),
    }),
  },
  input: {
    type: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func,
      type: PropTypes.oneOf(Object.values(InputType)),
    }),
  },
};