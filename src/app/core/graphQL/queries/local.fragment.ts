import gql from 'graphql-tag';

export const userSearchFragment = gql`
    fragment search on SearchResultItemConnection {
        nodes {
            ... on User {
                id
            }
        }
    }
`;

export const repositoryFragment = gql`
    fragment repository on RepositoryConnection {
        nodes {
            id
        }
    }
`;
