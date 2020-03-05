import {
	ScrollPositionAction,
	ScrollPositionPayload
} from "../reducers/scrollPositionReducer";

export const setScrollPosition = (scrollPosition: ScrollPositionPayload) => ({
	type: "POS",
	payload: scrollPosition
} as ScrollPositionAction);
