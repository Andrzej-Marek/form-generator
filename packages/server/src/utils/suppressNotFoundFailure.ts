import { NotFoundException } from '@nestjs/common';

export const suppressNotFoundFailure = async <T>(
  fn: T,
): Promise<T | undefined> => {
  try {
    if (typeof fn === 'function') {
      return await fn();
    }
    return await fn;
  } catch (error) {
    if (error instanceof NotFoundException) {
      return undefined;
    }
    throw error;
  }
};
