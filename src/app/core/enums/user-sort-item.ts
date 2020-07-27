export enum UserSortItem {
    JOINED_ASC = 'joined-asc',
    JOINED_DESC = 'joined-desc',
    FOLLOWERS_DESC = 'followers-desc',
    FOLLOWERS_ASC = 'followers-asc',
    REPOSITORIES_DESC = 'repositories-desc',
    REPOSITORIES_ASC = 'repositories-asc'
}

export const UserSortItemLabel = new Map<string, string>([
    [UserSortItem.JOINED_ASC, 'Sort by Oldest'],
    [UserSortItem.JOINED_DESC, 'Sort by Newest'],
    [UserSortItem.FOLLOWERS_ASC, 'Sort by Least Followers'],
    [UserSortItem.FOLLOWERS_DESC, 'Sort by Most Followers'],
    [UserSortItem.REPOSITORIES_ASC, 'Sort by Least Repositories'],
    [UserSortItem.REPOSITORIES_DESC, 'Sort by Most Repositories']
]);
