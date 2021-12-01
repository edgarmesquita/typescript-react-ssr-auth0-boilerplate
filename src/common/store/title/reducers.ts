import { Action, Store, initialState } from "..";

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