import { OrderDirection } from '../graphQL/generated/graphql';

export const SortDirectionLabel = new Map<string, string>([
    [OrderDirection.Asc, 'Ascending'],
    [OrderDirection.Desc, 'Descending'],
]);
