export interface MessageAction {
	type: "message";
	payload: string;
}

export interface MessageState {
	message: string;
}

const defaultState: MessageState = {
	message: ""
};

export const messageReducer = (state: MessageState = defaultState, action: MessageAction) => {
	switch (action.type) {
		case "message":
			return {
				...state,
				message: action.payload
			};
		default:
			return state;
	}
};
