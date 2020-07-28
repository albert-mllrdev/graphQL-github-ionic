import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

import { UserSortItem } from '@albert/enums/user-sort-item';
import { userSort, repositorySort, userSearch } from '@albert/queries/local.query';
import { updateUserSort, updateRepositorySort, updateUserSearch } from '@albert/core/graphQL/queries/local.mutation';
import { RepositoryOrderField, OrderDirection } from '@albert/generatedGQL/graphql';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private apollo: Apollo) { }

  setUserSort(sort: UserSortItem){
    this.apollo.mutate({
      mutation: updateUserSort,
      variables: {
        sort
      }
    }).subscribe();
  }

  getUserSort(){
    return this.apollo.watchQuery({
        query: userSort
    })
    .valueChanges.pipe(
        map(result => {
            return (!result.data) ? UserSortItem.JOINED_ASC : (result.data as any).userSort.sort;
        })
    );
  }

  setUserSearch(search: string){
    this.apollo.mutate({
      mutation: updateUserSearch,
      variables: {
        search
      }
    }).subscribe();
  }

  getUserSearch(){
    return this.apollo.watchQuery({
        query: userSearch
    })
    .valueChanges.pipe(
        map(result => {
            return (!result.data) ? '' : (result.data as any).userSearch.search;
        })
    );
  }

  setRepositorySort(sort: RepositoryOrderField, direction: OrderDirection){
    this.apollo.mutate({
      mutation: updateRepositorySort,
      variables: {
        sort,
        direction
      }
    }).subscribe();
  }

  getRepositorySort(){
    return this.apollo.watchQuery({
        query: repositorySort
    })
    .valueChanges.pipe(
        map(result => {
            return (!result.data) ? { sort: RepositoryOrderField.Name, direction: OrderDirection.Asc } :
            (result.data as any).repositorySort;
        })
    );
  }
}
