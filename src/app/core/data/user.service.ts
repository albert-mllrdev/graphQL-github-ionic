import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

import { IUser } from '@albert/interfaces/IUser';
import { getUsersQuery, getUserQuery } from '@albert/queries/users.query';
import { UserSortItem } from '@albert/enums/user-sort-item';
import { unfollowUser, followUser } from '@albert/graphQL/queries/users.mutation';
import { userSearchFragment } from '@albert/graphQL/queries/local.fragment';
import { IUserListParameter } from '../interfaces/IUserListParameter';
import { IUserFetchResult } from '../interfaces/IUserFetchResult';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userQuery!: QueryRef<any>;
  provideData = true;

  constructor(private apollo: Apollo) {  }

  initialize(parameters: IUserListParameter){
    this.userQuery = this.apollo.watchQuery<any>({
      query: getUsersQuery,
      variables: this.getVariables(parameters)
    });
  }

  getUsers(): Observable<IUserFetchResult | null> {
    return this.userQuery.valueChanges.pipe(
      map(result => {
        if (!this.provideData) {
          this.provideData = true;
          return null;
        }
        return this.parseUserData(result.data);
      })
    );
  }

  getMoreUsers(cursor?: string) {
    this.provideData = true;
    return from(this.userQuery.fetchMore({
      variables: {
        cursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        fetchMoreResult.search.nodes = [...previousResult.search.nodes, ...fetchMoreResult.search.nodes];
        return fetchMoreResult;
      }
    }));
  }

  followUser(user: IUser) {
    this.apollo.mutate({
      mutation: followUser,
      variables: {
        userId: user.id
      }
    }).subscribe((result: any) => {
      user.viewerIsFollowing = result.data.followUser.user.viewerIsFollowing;
    });
  }

  getUserFromCache(login: string): any {
    return this.apollo.getClient().readFragment({
      id: `User:${login}`,
      fragment: getUserQuery
    });
  }

  unfollowUser(user: IUser){
    this.apollo.mutate({
      mutation: unfollowUser,
      variables: {
        userId: user.id
      }
    }).subscribe((result: any) => {
      user.viewerIsFollowing = result.data.unfollowUser.user.viewerIsFollowing;
    });
  }

  updateVariables(parameters: IUserListParameter) {
    const variables = this.getVariables(parameters);
    this.userQuery.setVariables(variables);
    let result;
    // const fragment = this.apollo.getClient().readFragment({
    //   id: `$ROOT_QUERY.search({"after":null,"first":${parameters.fetch},"query":"${variables.searchQuery}","type":"USER"})`,
    //   fragment: userSearchFragment
    // });
    // this.provideData = true;
    // if (fragment) {
    try {
      const cachedResult = this.apollo.getClient().readQuery({
        query : getUsersQuery,
        variables
      });
      result = this.parseUserData(cachedResult);
      this.provideData = false;
    } catch {}
    // }
    return result;
  }

  private parseUserData(data: any){
    const users: IUser[] = [];
    data.search.nodes.map((node: any) => {
      const user: any = node;
      if (user.followers){
        user.totalFollowers = user.followers.totalCount;
      }
      if (user.repositories){
        user.totalRepositories = user.repositories.totalCount;
      }
      users.push(user);
    });
    const result: IUserFetchResult = {
      users,
      hasNextPage:  data.search.pageInfo.hasNextPage,
      cursor: data.search.pageInfo.endCursor
    };

    return result;
  }

  private getVariables(args: any){
    const countFollowers = (args.sortBy === UserSortItem.FOLLOWERS_ASC || args.sortBy === UserSortItem.FOLLOWERS_DESC);
    const countRepositories = (args.sortBy === UserSortItem.REPOSITORIES_ASC || args.sortBy === UserSortItem.REPOSITORIES_DESC);
    const getCreatedDate = (args.sortBy === UserSortItem.JOINED_ASC || args.sortBy === UserSortItem.JOINED_DESC);

    return {
      fetch: args.fetch,
      cursor: args.cursor,
      searchQuery: this.getSearchQuery(args),
      countFollowers,
      countRepositories,
      getCreatedDate
    };
  }

  private getSearchQuery(parameters: IUserListParameter) {
    const searchQuery = (parameters.searchText) ? `${parameters.searchText} in:login,name,fullname type:user sort:${parameters.sortBy}` : `type:user sort:${parameters.sortBy}`;
    return searchQuery;
  }
}
