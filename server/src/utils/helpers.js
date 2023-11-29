export const randomAlphaNumeric = () =>
  Array.from(Array(20), () => Math.floor(Math.random() * 36).toString(36)).join(
    ''
  );

/*
 * Check if global object window is defined
 */
export const isBrowser = () => typeof window !== 'undefined';

/*
 * Decode base64 value, returns string
 * @Params: string
 */
export const decodeValue = (value) => {
  if (!value) {
    return null;
  }

  const valueToString = value.toString();

  if (isBrowser()) {
    return btoa(valueToString);
  }

  const buff = Buffer.from(valueToString, 'ascii');
  return buff.toString('base64');
};
