import { RepositoryOrderField } from '@albert/generatedGQL/graphql';

export const RepositorySortItemLabel = new Map<string, string>([
    [RepositoryOrderField.Name, 'Sort by Name'],
    [RepositoryOrderField.CreatedAt, 'Sort by Date Created'],
    [RepositoryOrderField.UpdatedAt, 'Sort by Date Updated']
]);
