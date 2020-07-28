import { ILanguage } from './ILanguage';

export interface IRepository {
    id: string;
    name: string;
    isPrivate: boolean;
    createdAt: Date;
    updatedAt: Date;
    // languages?: ILanguage[];
    repositoryLanguages?: ILanguage[];
}
