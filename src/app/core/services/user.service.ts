import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

import { IUser } from '@albert/interfaces/IUser';
import { UserSortItem } from '@albert/enums/user-sort-item';
import { IUserListParameter } from '@albert/interfaces/IUserListParameter';
import { IUserFetchResult } from '@albert/interfaces/IUserFetchResult';
import {
  GetUsersGQL,
  GetUsersQueryVariables,
  GetUsersQuery,
  FollowUserGQL,
  UnfollowUserGQL,
  GetUsersFromCacheGQL,
  User
} from '@albert/generatedGQL/graphql';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsersQueryRef!: QueryRef<GetUsersQuery, GetUsersQueryVariables>;
  provideData = true;

  constructor(
    private getUsersGQL: GetUsersGQL,
    private getUsersFromCacheGQL: GetUsersFromCacheGQL,
    private followUserGQL: FollowUserGQL,
    private unfollowUserGQL: UnfollowUserGQL) {  }

  initialize(parameters: IUserListParameter) {
    this.getUsersQueryRef = this.getUsersGQL.watch(this.getVariables(parameters));
  }

  loadUsers(): Observable<IUserFetchResult | null> {
    return this.getUsersQueryRef.valueChanges.pipe(
      map(result => {
        if (!this.provideData) {
          this.provideData = true;
          return null;
        }
        return this.parseUserData(result.data);
      })
    );
  }

  loadMoreUsers(cursor?: string | null) {
    this.provideData = true;
    return from(this.getUsersQueryRef.fetchMore({
      variables : {
        cursor
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {
        if (!fetchMoreResult?.search.nodes){
          return previousResult;
        }

        if (previousResult.search.nodes) {
          fetchMoreResult.search.nodes = [...previousResult.search.nodes, ...fetchMoreResult.search.nodes];
        }
        const result: GetUsersQuery = {...fetchMoreResult};
        return result;
      }
    }));
  }

  followUser(id: string) {
    return this.followUserGQL.mutate({
      userId: id
    }).pipe(
      map(result => {
        return result;
      })
    );
  }

  unfollowUser(id: string) {
    return this.unfollowUserGQL.mutate({
      userId: id
    }).pipe(
      map(result => {
        return result;
      })
    );
  }

  updateVariables(parameters: IUserListParameter) {
    const variables = this.getVariables(parameters);
    this.getUsersQueryRef.setVariables(variables);
    variables.cursor = null;
    this.provideData = true;
    return this.getUsersFromCacheGQL.fetch(variables).pipe(
      map(cachedResult => {
        if (cachedResult.data) {
          this.provideData = false;
          return this.parseUserData(cachedResult.data);
        }
        return null;
      }
    ));
  }

  private parseUserData(data: GetUsersQuery) {
    if (!data.search.nodes){
      return null;
    }
    const users: IUser[] = [];
    data.search.nodes.map(node => {
      const nodeUser = (node as User);
      const user: IUser = {... nodeUser };
      if (nodeUser.followers){
        user.totalFollowers = nodeUser.followers.totalCount;
      }
      if (nodeUser.followers){
        user.totalFollowers = nodeUser.followers.totalCount;
      }
      if (nodeUser.repositories){
        user.totalRepositories = nodeUser.repositories.totalCount;
      }
      users.push(user);
    });
    const result: IUserFetchResult = {
      users,
      hasNextPage: data.search.pageInfo.hasNextPage,
      cursor: data.search.pageInfo.endCursor
    };

    return result;
  }

  private getVariables(parameters: IUserListParameter){
    const countFollowers = (parameters.sortBy === UserSortItem.FOLLOWERS_ASC || parameters.sortBy === UserSortItem.FOLLOWERS_DESC);
    const countRepositories = (parameters.sortBy === UserSortItem.REPOSITORIES_ASC || parameters.sortBy === UserSortItem.REPOSITORIES_DESC);
    const getCreatedDate = (parameters.sortBy === UserSortItem.JOINED_ASC || parameters.sortBy === UserSortItem.JOINED_DESC);

    return {
      fetch: parameters.fetch,
      cursor: parameters.cursor,
      searchQuery: this.getSearchQuery(parameters),
      countFollowers,
      countRepositories,
      getCreatedDate
    };
  }

  private getSearchQuery(parameters: IUserListParameter) {
    const searchText = (parameters.searchText) ? `${parameters.searchText} in:login,name,fullname ` : '';
    const searchQuery = `${searchText}type:user sort:${parameters.sortBy}`;
    return searchQuery;
  }
}
