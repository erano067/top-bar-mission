import { Reducer } from "react";
import { Point, defaultPoint } from "../../core/point";

export interface ScrollPositionPayload {
	normalizePrevPosition: Point;
	normalizeCurrPosition: Point;
}

export interface ScrollPositionAction {
	type: "POS";
	payload: ScrollPositionPayload;
}

export interface ScrollPositionState {
	scrollPosition: ScrollPositionPayload;
}

const defaultState: ScrollPositionState = {
	scrollPosition: {
		normalizePrevPosition: defaultPoint,
		normalizeCurrPosition: defaultPoint
	}
};

export const scrollPositionReducer: Reducer<ScrollPositionState, ScrollPositionAction> = (state = defaultState, action) => {
	switch (action.type) {
		case "POS":
			return {
				...state,
				scrollPosition: action.payload
			};
		default:
			return state;
	}
};
