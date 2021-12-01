import { Action } from "../action";
import { Store, initialState } from "../store";

export function changeTitle(
    state: Store = initialState,
    action: Action
): Store {
    switch (action.type) {
        case "CHANGE_TITLE": {
            return {
                title: action.data
            };
		}
		default: {
			return state;
		}
    }
}