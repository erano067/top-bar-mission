import React, { FC, useEffect } from "react";
import styles from "./TopBar.module.scss";
import { useDispatch } from "react-redux";
import { setMessage } from "../../redux/actions/setMessage";
import { useScrollStore } from "../../redux/reducers";

const NON_VISIBLE_TRESHOLD = 0.2;
const OPACITY_TRESHOLD = 0.6;

const mapRange = (value: number, minIn: number, maxIn: number, minOut: number, maxOut: number) =>
	(value - minIn) / (maxIn - minIn) * (maxOut - minOut) + minOut;

const getOpacityFromYPosition = (YPosition: number) => {
	const boundYPosition = Math.min(Math.max(YPosition, NON_VISIBLE_TRESHOLD), OPACITY_TRESHOLD);

	return mapRange(boundYPosition, NON_VISIBLE_TRESHOLD, OPACITY_TRESHOLD, 0, 1);
};

const fixDecimalPoint = (x: number) => {
	return Math.floor(x * 100) / 100;
}

export const TopBar: FC = () => {
	//CR: Why not using the useScrollPosition hook here?
	//Post CR: The useScrollPosition hook takes a container reference and use its scroller, so the other
	//Post CR: option is to pass the container to here and then we would have a appContainerStore or something like that
	const scrollPosition = useScrollStore(scrollState => scrollState.scrollPosition);

	const dispatch = useDispatch();

	useEffect(() => {
		//CR: Not using {} for if, even when it has only one sentence is prone to errors
		//POST CR: I found this interesting disccusion about it: https://softwareengineering.stackexchange.com/questions/16528/single-statement-if-block-braces-or-no
		if (scrollPosition.normalizeCurrPosition.y > OPACITY_TRESHOLD) {
			dispatch(setMessage(`You have reached ${fixDecimalPoint(scrollPosition.normalizeCurrPosition.y * 100)}% of the page!`));
		}

		if (scrollPosition.normalizePrevPosition.y > OPACITY_TRESHOLD &&
			scrollPosition.normalizeCurrPosition.y < OPACITY_TRESHOLD) {
			dispatch(setMessage(""));
		}

	}, [scrollPosition, dispatch]);

	return (
		<div className={styles.topBar}
			style={{ opacity: getOpacityFromYPosition(scrollPosition.normalizeCurrPosition.y) }}
		/>
	);
};
