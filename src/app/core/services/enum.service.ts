import { Injectable } from '@angular/core';
import { RepositorySortItemLabel } from '@albert/enums/repository-sort-item';
import { SortDirectionLabel } from '@albert/enums/sort-direction';
import { UserSortItem, UserSortItemLabel } from '@albert/enums/user-sort-item';
import { ISortItem } from '@albert/interfaces/ISortItem';
import { RepositoryOrderField, OrderDirection } from '@albert/generatedGQL/graphql';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor() { }

  getRepositorySortItems() {
    const sortItems: ISortItem[] = Object.entries(RepositoryOrderField).map(([key, value]) =>
    {
      return {
        key: value,
        value: RepositorySortItemLabel.get(value) ?? ''
      };
    }).filter(sort => sort.value.length > 0);
    return sortItems;
  }

  getSortDirections() {
    const directions: ISortItem[] = Object.entries(OrderDirection).map(([key, value]) =>
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
