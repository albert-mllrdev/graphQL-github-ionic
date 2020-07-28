import { OrderDirection, RepositoryOrderField } from '@albert/generatedGQL/graphql';

export interface IRepositoryListParameter {
    login: string;
    cursor?: string | null;
    fetch: number;
    sortBy: RepositoryOrderField;
    orderBy: OrderDirection;
}
