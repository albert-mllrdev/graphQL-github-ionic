export interface IUser {
    id: string;
    name?: string | null;
    login: string;
    createdAt?: Date;
    avatarUrl: string;
    viewerIsFollowing: boolean;
    totalFollowers?: number;
    totalRepositories?: number;
}