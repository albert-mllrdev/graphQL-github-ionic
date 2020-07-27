export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC'
}

export const SortDirectionLabel = new Map<string, string>([
    [SortDirection.ASC, 'Ascending'],
    [SortDirection.DESC, 'Descending'],
]);
