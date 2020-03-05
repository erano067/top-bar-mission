import { combineReducers } from "redux";
import {
	scrollPositionReducer,
	ScrollPositionState
} from "./scrollPositionReducer";
import { MessageState, messageReducer } from "./messageReducer";
import { useSelector } from "react-redux";

interface CombinedReducers {
	scrollStore: ScrollPositionState;
	messageStore: MessageState;
}

const combinedReducers = {
	scrollStore: scrollPositionReducer,
	messageStore: messageReducer
};

export const useScrollStore = <T>(selector: (state: ScrollPositionState) => T) =>
	useSelector<CombinedReducers, T>(store => selector(store.scrollStore));

export const useMessageStore = <T>(selector: (state: MessageState) => T) =>
	useSelector<CombinedReducers, T>(store => selector(store.messageStore));

export default combineReducers(combinedReducers);
