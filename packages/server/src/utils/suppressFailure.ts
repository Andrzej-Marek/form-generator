export const suppressFailure = async <T>(fn: T): Promise<T | undefined> => {
  try {
    if (typeof fn === 'function') {
      return await fn();
    }
    return await fn;
  } catch (error) {
    return undefined;
  }
};
