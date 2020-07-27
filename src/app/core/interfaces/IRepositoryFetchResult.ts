import { IRepository } from './IRepository';

export interface IRepositoryFetchResult {
    repositories: IRepository[];
    totalCount: number;
    hasNextPage: true;
    cursor?: string | null;
}
