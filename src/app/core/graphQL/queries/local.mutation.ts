import gql from 'graphql-tag';

export const updateUserSort = gql`
    mutation updateUserSort($sort: any) {
        updateUserSort(sort: $sort) @client
    }
`;

export const updateUserSearch = gql`
    mutation updateUserSearch($search: any) {
        updateUserSearch(search: $search) @client
    }
`;

export const updateRepositorySort = gql`
    mutation updateRepositorySort($sort: any, $direction: any) {
        updateRepositorySort(sort: $sort, direction: $direction) @client
    }
`;
