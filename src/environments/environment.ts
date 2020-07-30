// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { UserSortItem } from '@albert/enums/user-sort-item';
import { RepositoryOrderField, OrderDirection } from '@albert/generatedGQL/graphql';

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
