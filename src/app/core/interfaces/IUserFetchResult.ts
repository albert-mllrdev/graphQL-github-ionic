import { IUser } from './IUser';

export interface IUserFetchResult {
    users: IUser[];
    hasNextPage: boolean;
    cursor?: string | null;
}
