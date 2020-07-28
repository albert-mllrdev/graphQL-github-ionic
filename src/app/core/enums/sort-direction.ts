import { OrderDirection } from '@albert/generatedGQL/graphql';

export const SortDirectionLabel = new Map<string, string>([
    [OrderDirection.Asc, 'Ascending'],
    [OrderDirection.Desc, 'Descending'],
]);
