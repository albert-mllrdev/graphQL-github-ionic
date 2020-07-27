export const graphQLMutations = {
    updateUserSort: (_: any , { sort }: any, { cache }: any) => {
        const data = {
            userSort: {
                __typename: 'UserSort',
                sort
            }
        };
        cache.writeData({ data });
        return null;
    },
    updateUserSearch: (_: any, { search }: any, { cache }: any) => {
        const data = {
            userSearch: {
                __typename: 'UserSearch',
                search
            }
        };
        cache.writeData({ data });
        return null;
    },
    updateRepositorySort: (_: any, { sort, direction }: any, { cache }: any) => {
        const data = {
            repositorySort: {
                __typename: 'RepositorySort',
                sort,
                direction
            }
        };
        cache.writeData({ data });
        return null;
    }
};
