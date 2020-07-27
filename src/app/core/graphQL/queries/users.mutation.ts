import gql from 'graphql-tag';

export const followUser = gql`
    mutation unfollowUser($userId: String) {
        followUser(input: {userId: $userId}) {
            user {
                id
                viewerIsFollowing
                followers {
                    totalCount
                }
            }
        }
    }
`;

export const unfollowUser = gql`
    mutation unfollowUser($userId: String) {
        unfollowUser(input: {userId: $userId}) {
            user{
                id
                viewerIsFollowing
                followers {
                    totalCount
                }
            }
        }
    }
`;
