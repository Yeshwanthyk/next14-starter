/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import DOMPurify from 'isomorphic-dompurify';

// Helpers
const isObjectOrArray = (value) =>
  value &&
  ((typeof value === 'object' && value.constructor === Object) ||
    Object.prototype.toString.call(value) === '[object Array]');

const isBoolean = (value) => typeof value === 'boolean';

// Main iterator - diving into object parameters
const iterateObject = (object) => {
  for (const key in object) {
    const property = object[key];
    let clean = null;

    if (isObjectOrArray(property)) {
      clean = iterateObject(property);
    } else if (isBoolean(property)) {
      clean = property;
    } else if (Number.isNaN(Number(property))) {
      clean = DOMPurify.sanitize(property);
    } else {
      clean = property;
    }

    object[key] = clean;
  }

  return object;
};

export default function sanitizeBodyAndQueryParameters(req, res, next) {
  // This process covers post & get requests by sanitizing its properties before moving to to the controller
  // Iterating all body properties
  let { body, query } = req;

  if (body) {
    body = iterateObject(body);
  }

  // Iterating all query parameters
  if (query) {
    query = iterateObject(query);
  }

  // Moving on to the next step (controller method)
  next();
}
