import { IUser } from "common/models/user";

export interface Action {
    type: string;
    data: any;
}

export type Store = {
    title: string;
    user?: IUser;
};

export const initialState: Store = {
    title: "Hello World!"
};