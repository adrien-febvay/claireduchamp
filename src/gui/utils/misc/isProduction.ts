/**
 * Is the environment production?
 * @returns
 * - `true`: Yes, it is production
 * - `false`: No, it is not production
 * - `null`: Maybe? Cannot tell because `process.env.NODE_ENV` is not properly set.
 */
export const isProduction = () => {
  if (process.env.NODE_ENV === 'production') {
    return true;
  } else if (typeof location === 'undefined') {
    return null;
  } else {
    return process.env.NODE_ENV !== 'development' && null;
  }
};
