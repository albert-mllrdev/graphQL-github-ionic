import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { getRepositoriesQuery } from '@albert/queries/repositories.query';
import { IRepository } from '@albert/interfaces/IRepository';
import { ILanguage } from '@albert/interfaces/ILanguage';
import { RepositorySortItem } from '@albert/enums/repository-sort-item';
import { SortDirection } from '@albert/enums/sort-direction';
import { repositoryFragment } from '@albert/queries/local.fragment';
import { IRepositoryListParameter } from '../interfaces/IRepositoryListParameter';
import { IRepositoryFetchResult } from '../interfaces/IRepositoryFetchResult';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  repositoryQuery!: QueryRef<any>;
  provideData = true;

  constructor(private apollo: Apollo) {  }

  initialize(parameters: IRepositoryListParameter) {
    this.repositoryQuery = this.apollo.watchQuery<any>({
      query: getRepositoriesQuery,
      variables: this.getVariables(parameters)
    });
  }

  getRepositories(): Observable<IRepositoryFetchResult | null> {
    return this.repositoryQuery.valueChanges.pipe(
      map(result => {
        if (!this.provideData) {
          this.provideData = true;
          return null;
        }
        return this.parseRepositoryData(result.data);
      })
    );
  }

  updateVariables(parameters: IRepositoryListParameter) {
    // this.parameters = {...this.parameters, ... args};
    const variables = this.getVariables(parameters);
    this.repositoryQuery.setVariables(variables);
    let result = null;
    // const fragment = this.apollo.getClient().readFragment({
    //   id: this.getFragmentKey(variables),
    //   fragment: repositoryFragment
    // });
    this.provideData = true;
    try {
      variables.cursor = null;
      const cachedResult = this.apollo.getClient().readQuery({
        query : getRepositoriesQuery,
        variables
      });
      result = this.parseRepositoryData(cachedResult);
      this.provideData = false;
    } catch {}
    return result;
  }

  getMoreRepositories(cursor?: string) {
    this.provideData = true;
    return from(this.repositoryQuery.fetchMore({
      variables: {
        cursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        fetchMoreResult.user.repositories.nodes = [...previousResult.user.repositories.nodes,
          ...fetchMoreResult.user.repositories.nodes];
        return fetchMoreResult;
      }
    }));
  }

  private parseRepositoryData(data: any){
    const repositories: IRepository[] = [];
    const repositoryData = data.user.repositories;
    repositoryData.nodes.map((node: any) => {
      const repository: any = node;
      repository.languages = this.getLanguages(node.repositoryLanguages);
      repositories.push(repository);
    });

    const result: IRepositoryFetchResult = {
      repositories,
      hasNextPage: repositoryData.pageInfo.hasNextPage,
      totalCount: repositoryData.totalCount,
      cursor: repositoryData.pageInfo.endCursor
    };
    return result;
  }

  // private getFragmentKey(variables: any) {
  //   return `$User:${this.parameters.login}.repositories({"after":null,"first":${this.parameters.fetch},"orderBy":{"direction":
  //   "${variables.orderBy}","field":"${variables.sortBy}"}})`;
  // }

  private getVariables(args: IRepositoryListParameter) {
    // direction seems to be reversed on dates, ascending shows oldest first instead of newest
    if (args.sortBy === RepositorySortItem.UPDATED_AT || args.sortBy === RepositorySortItem.CREATED_AT){
      args.orderBy = (args.orderBy === SortDirection.ASC) ? SortDirection.DESC : SortDirection.ASC;
    }
    return {
      login: args.login,
      fetch: args.fetch,
      cursor: args.cursor,
      orderBy: args.orderBy,
      sortBy: args.sortBy
    };
  }

  private getLanguages(repositoryLanguages: any){
    const totalSize = repositoryLanguages.totalSize;
    const languages: ILanguage[] = [];
    repositoryLanguages.edges.forEach((edge: any) => {
      const percentage = ((edge.size / totalSize) * 100).toFixed(1).replace('.0', '');
      edge.node.usage = (percentage !== '0') ? `${percentage}%` : '';
      languages.push(edge.node);
    });
    return languages;
  }
}
