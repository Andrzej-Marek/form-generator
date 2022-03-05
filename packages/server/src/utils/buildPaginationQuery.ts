import { FindManyOptions } from 'typeorm';
import { PaginationInput } from '../inputs/pagination.input';
import { SelectQueryBuilder } from 'typeorm';

type PaginationQuery = Pick<FindManyOptions, 'take' | 'skip'>;

export const buildPaginationQuery = (
  input?: PaginationInput,
): PaginationQuery => {
  let query: PaginationQuery = {};

  if (typeof input?.limit === 'number') {
    query.take = input.limit;
  }

  if (typeof input?.offset === 'number') {
    query.skip = input.offset;
  }

  return query;
};

export const buildPaginationQueryBuilderQuery = <T>(
  query: SelectQueryBuilder<T>,
  input?: PaginationInput,
) => {
  if (typeof input?.limit === 'number') {
    query.take(input.limit);
  }

  if (typeof input?.offset === 'number') {
    query.skip(input.offset);
  }

  return query;
};
