import { Action, Store, initialState } from "..";

export function login(
    state: Store = initialState,
    action: Action
): Store {
    switch (action.type) {
        case "LOGIN": {
            return {...state, user: { id: "", username: action.data.username, name: "" }};
		}
		default: {
			return state;
		}
    }
}