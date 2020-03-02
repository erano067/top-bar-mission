import React, { FC, useEffect } from "react";
import styles from "./TopBar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { CombinedReducers } from "../../reducers";
import { setMessage } from "../../actions/setMessage";
import { ScrollPositionPayload } from "../../reducers/scrollPositionReducer";

const NON_VISIBLE_TRESHOLD = 0.2;
const OPACITY_TRESHOLD = 0.6;

const getOpacityFromYPosition = (YPosition: number) => {
	if (YPosition < NON_VISIBLE_TRESHOLD) return 0;

	if (YPosition > NON_VISIBLE_TRESHOLD && YPosition < OPACITY_TRESHOLD) {
		const range = OPACITY_TRESHOLD - NON_VISIBLE_TRESHOLD;
		return (YPosition - NON_VISIBLE_TRESHOLD) / range;
	}

	return 1;
};

const fixDecimalPoint = (x: number) => {
	return Math.floor(x * 100) / 100;
}

export const TopBar: FC = () => {
	const scrollPosition = useSelector<CombinedReducers, ScrollPositionPayload>(state => state.scrollStore.scrollPosition);

	const dispatch = useDispatch();

	useEffect(() => {
		if (scrollPosition.currPos.y > OPACITY_TRESHOLD)
			dispatch(setMessage(`You have reached ${fixDecimalPoint(scrollPosition.currPos.y * 100)}% of the page!`));

		if (scrollPosition.prevPos.y > OPACITY_TRESHOLD &&
			scrollPosition.currPos.y < OPACITY_TRESHOLD)
			dispatch(setMessage(""));

	}, [scrollPosition, dispatch]);

	return (
		<div className={styles.topBar}
			style={{ opacity: getOpacityFromYPosition(scrollPosition.currPos.y) }}
		/>
	);
};
