import { OrderDirection, RepositoryOrderField } from '../graphQL/generated/graphql';

export interface IRepositoryListParameter {
    login: string;
    cursor?: string | null;
    fetch: number;
    sortBy: RepositoryOrderField;
    orderBy: OrderDirection;
}
