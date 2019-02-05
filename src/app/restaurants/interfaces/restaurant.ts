import { Iuser } from 'src/app/auth/interfaces/iuser';

export interface Restaurant {
  id?: number;
    name: string;
    description: string;
    cuisine: string[];
    daysOpen: number[];
    image: string;
    phone: string;
    creator?: Iuser;
    mine?: boolean;
    distance?: number;
    commented?: boolean;
    stars?: number;
    address: string;
    lat: number;
    lng: number;
    state?: string;
}
