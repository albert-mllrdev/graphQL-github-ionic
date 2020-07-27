import { UserSortItem } from '../enums/user-sort-item';

export interface IUserListParameter {
    cursor?: string | null;
    fetch: number;
    searchText: string;
    sortBy: UserSortItem;
}
