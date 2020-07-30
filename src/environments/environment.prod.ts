import { UserSortItem } from '@albert/enums/user-sort-item';
import { RepositoryOrderField, OrderDirection } from '@albert/generatedGQL/graphql';

export const environment = {
  production: true,
  GRAPHQL_URI: 'https://api.github.com/graphql',
  GITHUB_AUTH_TOKEN: '<GITHUB_AUTH_TOKEN>',
  GITHUB_AUTH_URI: 'https://github.com/login/oauth/authorize',
  GITHUB_CLIENT_ID: '<GITHUB_CLIENT_ID>',
  GITHUB_SECRET: '<GITHUB_SECRET>',
  GITHUB_REDIRECT_URI: 'http://localhost:8100/authenticate',
  RECORD_FETCH_COUNT: 10,
  DEFAULT_USER_SORT: UserSortItem.JOINED_ASC,
  DEFAULT_REPOSITORY_SORT: RepositoryOrderField.Name,
  DEFAULT_REPOSITORY_DIRECTION: OrderDirection.Asc
};
