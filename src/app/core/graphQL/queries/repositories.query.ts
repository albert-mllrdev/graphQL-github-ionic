import gql from 'graphql-tag';

export const getRepositoriesQuery = gql`
query ($login: String!, $fetch: Int!, $cursor: String, $sortBy: String!, $orderBy: String!) {
  user(login: $login) {
    login
    repositories(first: $fetch, orderBy: {field: $sortBy, direction: $orderBy}, after: $cursor) {
      nodes {
        id
        name
        isPrivate
        updatedAt
        createdAt
        repositoryLanguages: languages(first: 20) {
          edges {
            node {
              name
              color
            }
            size
          }
          totalSize
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`;
