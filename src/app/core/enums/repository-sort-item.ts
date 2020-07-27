export enum RepositorySortItem {
    NAME = 'NAME',
    CREATED_AT = 'CREATED_AT',
    UPDATED_AT = 'UPDATED_AT'
}

export const RepositorySortItemLabel = new Map<string, string>([
    [RepositorySortItem.NAME, 'Sort by Name'],
    [RepositorySortItem.CREATED_AT, 'Sort by Date Created'],
    [RepositorySortItem.UPDATED_AT, 'Sort by Date Updated']
]);
