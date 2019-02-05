import { Iuser } from 'src/app/auth/interfaces/iuser';

export interface IComment {
    id?: number;
    stars: number;
    text: string;
    date?: string;
    user?: Iuser;
}
