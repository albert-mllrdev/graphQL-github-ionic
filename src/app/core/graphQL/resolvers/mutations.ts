import {
  MutationSetUserSortArgs,
  GetUserSortDocument,
  MutationSetUserSearchArgs,
  GetUserSearchDocument,
  MutationSetRepositorySortArgs,
  GetRepositorySortDocument,
  MutationSetRepositorySortDirectionArgs,
  GetRepositorySortDirectionDocument
} from '@albert/generatedGQL/graphql';
import { CustomResolver } from './common';

export const setUserSort: CustomResolver<any, MutationSetUserSortArgs> = (_, { input }, { cache }) => {
  cache.writeQuery({
    query: GetUserSortDocument,
    data : {
      userSort: input
    }
  });
};

export const setUserSearch: CustomResolver<any, MutationSetUserSearchArgs> = (_, { input }, { cache }) => {
  cache.writeQuery({
    query: GetUserSearchDocument,
    data : {
      userSearch: input
    }
  });
};

export const setRepositorySort: CustomResolver<any, MutationSetRepositorySortArgs> = (_, { input }, { cache }) => {
  cache.writeQuery({
    query: GetRepositorySortDocument,
    data : {
      repositorySort: input
    }
  });
};

export const setRepositorySortDirection: CustomResolver<any, MutationSetRepositorySortDirectionArgs> = (_, { input }, { cache }) => {
  cache.writeQuery({
    query: GetRepositorySortDirectionDocument,
    data : {
      repositorySortDirection: input
    }
  });
};
