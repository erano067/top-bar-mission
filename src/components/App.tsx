import React, { FC, useRef, useEffect, useState } from "react";
import styles from "./App.module.scss";
import { TopBar } from "./TopBar/TopBar";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useDispatch, useSelector } from "react-redux";
import { setScrollPosition } from "../actions/setScrollPosition";
import { CombinedReducers } from "../reducers";
import { Point } from "../core/point";

const normalizeYScroll = (currPosition: Point, element: HTMLDivElement | null): number => {
	if (!element) return 0;
	return -currPosition.y / (element.offsetHeight - window.innerHeight);
}

export const App: FC = () => {
	const contentRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();

	useScrollPosition(({ prevPos, currPos }) =>
		dispatch(setScrollPosition({
			prevPos: { ...prevPos, y: normalizeYScroll(prevPos, contentRef.current) },
			currPos: { ...currPos, y: normalizeYScroll(currPos, contentRef.current) }
		})),
		[],
		contentRef
	);

	const message = useSelector<CombinedReducers, string>(store => store.messageStore.message);

	const [color, setColor] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setColor(Math.random() * 256 * 256 * 256);
		}, 5000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<>
			<TopBar />

			<div ref={contentRef}
				className={styles.content}
				style={{ backgroundColor: `#${Math.floor(color).toString(16)}` }} />

			<div className={styles.message}>{message}</div>
		</>
	);
};
