import { MessageAction } from "../reducers/messageReducer";

export const setMessage = (message: string) => ({
	type: "message",
	payload: message
} as MessageAction);
