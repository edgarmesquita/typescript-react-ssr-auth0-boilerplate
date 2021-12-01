import { Action } from "..";

export const changeTitle = (newTitle: string): Action => ({
    type: "CHANGE_TITLE",
    data: newTitle
});