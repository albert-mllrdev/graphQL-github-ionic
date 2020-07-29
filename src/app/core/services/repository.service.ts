import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRepository } from '@albert/interfaces/IRepository';
import { ILanguage } from '@albert/interfaces/ILanguage';
import { IRepositoryListParameter } from '@albert/interfaces/IRepositoryListParameter';
import { IRepositoryFetchResult } from '@albert/interfaces/IRepositoryFetchResult';
import {
  GetRepositoriesGQL,
  GetRepositoriesFromCacheGQL,
  GetRepositoriesQueryVariables,
  GetRepositoriesQuery,
  RepositoryOrderField,
  OrderDirection,
  Repository,
  LanguageConnection
} from '@albert/generatedGQL/graphql';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  getRepositoriesQueryRef!: QueryRef<GetRepositoriesQuery, GetRepositoriesQueryVariables>;

  constructor(
    private getRepositoriesGQL: GetRepositoriesGQL,
    private getRepositoriesFromCacheGQL: GetRepositoriesFromCacheGQL) {  }

  initialize(parameters: IRepositoryListParameter) {
    this.getRepositoriesQueryRef = this.getRepositoriesGQL.watch(this.getVariables(parameters));
  }

  getRepositories(): Observable<IRepositoryFetchResult | null> {
    return this.getRepositoriesQueryRef.valueChanges.pipe(
      map(result => {
        return this.parseRepositoryData(result.data);
      })
    );
  }

  getMoreRepositories(cursor?: string | null) {
    return from(this.getRepositoriesQueryRef.fetchMore({
      variables : {
        cursor
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {
        if (!fetchMoreResult?.user?.repositories.nodes){
          return previousResult;
        }

        if (previousResult.user && previousResult.user.repositories.nodes) {
          fetchMoreResult.user.repositories.nodes = [...previousResult.user.repositories.nodes,
            ...fetchMoreResult.user.repositories.nodes];
        }
        const result: GetRepositoriesQuery = {...fetchMoreResult};
        return result;
      }
    }));
  }

  updateVariables(parameters: IRepositoryListParameter) {
    const variables = this.getVariables(parameters);
    this.getRepositoriesQueryRef.setVariables(variables);
    variables.cursor = null;
    return this.getRepositoriesFromCacheGQL.fetch(variables).pipe(
      map(cachedResult => {
        if (cachedResult.data) {
          return this.parseRepositoryData(cachedResult.data);
        }
        return null;
      }
    ));
  }

  private parseRepositoryData(data: GetRepositoriesQuery) {
    if (!data.user?.repositories.nodes){
      return null;
    }
    const repositories: IRepository[] = [];
    data.user.repositories.nodes.map(node => {
      const nodeRepository = (node as Repository);
      const repository: IRepository = {... nodeRepository };
      repository.repositoryLanguages = this.getLanguages(nodeRepository.languages);
      repositories.push(repository);
    });

    const result: IRepositoryFetchResult = {
      repositories,
      hasNextPage: data.user.repositories.pageInfo.hasNextPage,
      totalCount: data.user.repositories.totalCount,
      cursor: data.user.repositories.pageInfo.endCursor
    };
    return result;
  }

  private getVariables(parameters: IRepositoryListParameter) {
    let orderBy =  parameters.orderBy;
    // direction seems to be reversed on dates, ascending shows oldest first instead of newest
    if (parameters.sortBy === RepositoryOrderField.UpdatedAt || parameters.sortBy === RepositoryOrderField.CreatedAt){
      orderBy = (orderBy === OrderDirection.Asc) ? OrderDirection.Desc : OrderDirection.Asc;
    }
    return {
      login: parameters.login,
      fetch: parameters.fetch,
      cursor: parameters.cursor,
      orderBy,
      sortBy: parameters.sortBy
    };
  }

  private getLanguages(repositoryLanguages: LanguageConnection | null | undefined){
    const languages: ILanguage[] = [];
    if (!repositoryLanguages){
      return languages;
    }
    const totalSize = repositoryLanguages.totalSize;
    if (repositoryLanguages.edges) {
      repositoryLanguages.edges.forEach(edge => {
        if (edge?.node) {
          const percentage = ((edge.size / totalSize) * 100).toFixed(1).replace('.0', '');
          const usage = (percentage !== '0') ? `${percentage}%` : '';
          const language: ILanguage = {usage, ...edge.node};
          languages.push(language);
        }
      });
    }
    return languages;
  }
}
