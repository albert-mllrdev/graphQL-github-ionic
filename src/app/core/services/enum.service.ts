import { Injectable } from '@angular/core';
import { RepositorySortItem, RepositorySortItemLabel } from '@albert/enums/repository-sort-item';
import { SortDirection, SortDirectionLabel } from '@albert/enums/sort-direction';
import { UserSortItem, UserSortItemLabel } from '@albert/enums/user-sort-item';
import { ISortItem } from '@albert/interfaces/ISortItem';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor() { }

  getSortItems() {
    const sortItems: ISortItem[] = Object.entries(RepositorySortItem).map(([key, value]) =>
    {
      return {
        key: value,
        value: RepositorySortItemLabel.get(value) ?? ''
      };
    });
    return sortItems;
  }

  getSortDirections() {
    const directions: ISortItem[] = Object.entries(SortDirection).map(([key, value]) =>
    {
      return {
        key: value,
        value: SortDirectionLabel.get(value) ?? ''
      };
    });
    return directions;
  }

  getUserSortItems() {
    const sortItems: ISortItem[] = Object.entries(UserSortItem).map(([key, value]) =>
    {
      return {
        key: value,
        value: UserSortItemLabel.get(value) ?? ''
      };
    });
    return sortItems;
  }
}
