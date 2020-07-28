import { IRepository } from './IRepository';

export interface IRepositoryFetchResult {
    repositories: IRepository[];
    totalCount: number;
    hasNextPage: boolean;
    cursor?: string | null;
}
