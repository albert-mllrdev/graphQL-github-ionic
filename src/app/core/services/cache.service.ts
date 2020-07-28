import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { UserSortItem } from '@albert/enums/user-sort-item';
import { RepositoryOrderField, OrderDirection } from '@albert/generatedGQL/graphql';
import {
  GetUserSortGQL,
  SetUserSortGQL,
  GetUserSearchGQL,
  SetUserSearchGQL,
  GetRepositorySortGQL,
  SetRepositorySortGQL,
  GetRepositorySortDirectionGQL,
  SetRepositorySortDirectionGQL,
  GetUserAvatarFromCacheGQL
} from '@albert/generatedGQL/graphql';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(
    private setUserSortGQL: SetUserSortGQL,
    private getUserSortGQL: GetUserSortGQL,
    private setUserSearchGQL: SetUserSearchGQL,
    private getUserSearchGQL: GetUserSearchGQL,
    private setRepositorySortGQL: SetRepositorySortGQL,
    private getRepositorySortGQL: GetRepositorySortGQL,
    private setRepositorySortDirectionGQL: SetRepositorySortDirectionGQL,
    private getRepositorySortDirectionGQL: GetRepositorySortDirectionGQL,
    private getUserAvatarFromCacheGQL: GetUserAvatarFromCacheGQL
  ) { }

  setUserSort(sort: UserSortItem) {
    this.setUserSortGQL.mutate({ input: sort }).subscribe();
  }

  getUserSort() {
    return this.getUserSortGQL.watch().valueChanges.pipe(
      map(result => {
        return (result.data.userSort as UserSortItem);
      })
    );
  }

  setUserSearch(search: string) {
    this.setUserSearchGQL.mutate({ input: search }).subscribe();
  }

  getUserSearch() {
    return this.getUserSearchGQL.watch().valueChanges.pipe(
      map(result => {
        return result.data.userSearch;
      })
    );
  }

  setRepositorySort(sort: RepositoryOrderField) {
    this.setRepositorySortGQL.mutate({ input: sort }).subscribe();
  }

  getRepositorySort() {
    return this.getRepositorySortGQL.watch().valueChanges.pipe(
      map(result => {
        return (result.data.repositorySort as RepositoryOrderField);
      })
    );
  }

  setRepositorySortDirection(direction: OrderDirection) {
    this.setRepositorySortDirectionGQL.mutate({ input: direction }).subscribe();
  }

  getRepositorySortDirection() {
    return this.getRepositorySortDirectionGQL.watch().valueChanges.pipe(
      map(result => {
        return (result.data.repositorySortDirection as OrderDirection);
      })
    );
  }

  getUserAvatar(login: string) {
    return this.getUserAvatarFromCacheGQL.watch({login}).valueChanges.pipe(
      map(cachedResult => {
        if (cachedResult?.data?.user?.avatarUrl) {
          return cachedResult.data.user.avatarUrl;
        }
        return null;
      }
    ));
  }
}
