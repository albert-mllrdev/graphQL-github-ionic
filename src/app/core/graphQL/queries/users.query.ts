import gql from 'graphql-tag';

export const getUsersQuery = gql`
query ($fetch: Int!, $cursor: String, $searchQuery: String!, $getCreatedDate: Boolean = true, $countFollowers: Boolean = false, $countRepositories: Boolean = false) {
  search(query: $searchQuery, type: USER, first: $fetch, after: $cursor) {
    nodes {
      ... on User {
        id
        name
        login
        avatarUrl
        viewerIsFollowing
        createdAt @include(if: $getCreatedDate)
        followers @include(if: $countFollowers) {
          totalCount
        }
        repositories @include(if: $countRepositories) {
          totalCount
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`;

export const getUserQuery = gql`
  fragment user on User {
    id
    name
    login
    avatarUrl
  }
`;
