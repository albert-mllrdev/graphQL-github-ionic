import { UserSortItem } from '@albert/enums/user-sort-item';

export interface IUserListParameter {
    cursor?: string | null;
    fetch: number;
    searchText: string;
    sortBy: UserSortItem;
}
