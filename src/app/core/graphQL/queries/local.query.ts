import gql from 'graphql-tag';

export const userSort = gql`
    {
        userSort @client {
            sort
        }
    }
`;

export const userSearch = gql`
    {
        userSearch @client {
            search
        }
    }
`;

export const repositorySort = gql`
    {
        repositorySort @client {
            sort,
            direction
        }
    }
`;

export const repositoryDirection = gql`
    {
        repositorySort @client {
            direction
        }
    }
`;
