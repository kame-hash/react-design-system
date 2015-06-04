// src/utils/helpers.jsx
import { jsx, css } from '@emotion/react';
import { getDOMNode } from '@react-design-system/utils';
import { merge } from 'lodash';

const dataAttributes = ['data-dismiss', 'data-toggle', 'data-target'];
const ariaAttributes = ['aria-haspopup', 'aria-expanded', 'aria-controls'];

export const getComponentId = (prefix, index) => `${prefix}_${index}`;

export const getAriaAttributes = (props) => {
  const attributes = {};
  ariaAttributes.forEach((attribute) => {
    if (Object.hasOwn(props, attribute)) {
      attributes[attribute] = props[attribute];
    }
  });
  return attributes;
};

export const getDataAttributes = (props) => {
  const attributes = {};
  dataAttributes.forEach((attribute) => {
    if (Object.hasOwn(props, attribute)) {
      attributes[attribute] = props[attribute];
    }
  });
  return attributes;
};

export const mergeStyles = (defaultStyles, userStyles) => merge({}, defaultStyles, userStyles);

export const isFunction = (func) => typeof func === 'function';

export const getDOMNodeAttributes = (node) => {
  if (!node) return {};
  const attributes = {};
  Array.from(node.attributes).forEach((attribute) => {
    attributes[attribute.nodeName] = attribute.nodeValue;
  });
  return attributes;
};

export const getDOMNodeRole = (node) => {
  const role = node.getAttribute('role');
  return role ? role : null;
};

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const isElement = (element) => element instanceof Object && element.nodeType === 1;

export const focusElement = (element) => {
  if (isElement(element)) {
    element.focus();
  }
};

export const getElementRect = (element) => {
  if (isElement(element)) {
    return element.getBoundingClientRect();
  }
  return null;
};