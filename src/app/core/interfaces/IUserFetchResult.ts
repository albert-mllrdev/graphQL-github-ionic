import { IUser } from './IUser';

export interface IUserFetchResult {
    users: IUser[];
    hasNextPage: true;
    cursor?: string | null;
}
