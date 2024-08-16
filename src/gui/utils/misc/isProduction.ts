/**
 * Is the environment production?
 * - `true`: Yes, it is production
 * - `false`: No, it is not production
 * - `null`: Maybe? Cannot tell because `process.env.NODE_ENV` is not properly set.
 */
export const isProduction = process.env.NODE_ENV === 'production' || (process.env.NODE_ENV !== 'development' && null);
