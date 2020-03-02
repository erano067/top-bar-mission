import { combineReducers } from "redux";
import {
	scrollPositionReducer,
	ScrollPositionState
} from "./scrollPositionReducer";
import { MessageState, messageReducer } from "./messageReducer";

export interface CombinedReducers {
	scrollStore: ScrollPositionState;
	messageStore: MessageState;
}

const combinedReducers = {
	scrollStore: scrollPositionReducer,
	messageStore: messageReducer
};

export default combineReducers(combinedReducers);
