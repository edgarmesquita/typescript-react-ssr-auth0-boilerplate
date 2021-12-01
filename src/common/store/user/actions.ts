import { Action } from "..";

export const login = (username: string, password: string): Action => ({
    type: "LOGIN",
    data: { username: username, password: password }
});