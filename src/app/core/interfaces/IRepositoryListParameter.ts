import { RepositorySortItem } from '../enums/repository-sort-item';
import { SortDirection } from '../enums/sort-direction';

export interface IRepositoryListParameter {
    login: string;
    cursor?: string | null;
    fetch: number;
    sortBy: RepositorySortItem;
    orderBy: SortDirection;
}
