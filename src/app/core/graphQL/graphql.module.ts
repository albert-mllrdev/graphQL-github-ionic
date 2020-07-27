import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { environment } from '@albert/environments/environment';
import { graphQLMutations } from '@albert/mutations/graphQL.mutation';

export function createApollo(httpLink: HttpLink) {
  const Link =  httpLink.create({
    uri : environment.GRAPHQL_URI
  });

  const modifyLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: `token ${ environment.GITHUB_AUTH_TOKEN }`
      }
    });
    return forward(operation);
  });

  const link = modifyLink.concat(Link);

  const inMemCache = new InMemoryCache({
    dataIdFromObject(responseObject: any) {
      switch (responseObject.__typename) {
        case 'User': return `User:${responseObject.login}`;
        default: return defaultDataIdFromObject(responseObject);
      }
    }
  });

  return {
    link,
    cache: inMemCache,
    resolvers: {
      Mutation: graphQLMutations
    }
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
