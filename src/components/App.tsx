import React, { FC, useRef, useEffect, useState } from "react";
import styles from "./App.module.scss";
import { TopBar } from "./TopBar/TopBar";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useDispatch } from "react-redux";
import { setScrollPosition } from "../redux/actions/setScrollPosition";
import { useMessageStore } from "../redux/reducers";
import { Point, defaultPoint } from "../core/point";

const normalizeScrollPoint = (currPosition: Point, element: HTMLDivElement | null): Point => {
	//CR: I prefer return element? -currPosition.y / (element.offsetHeight - window.innerHeight) : 0, but it is only my personal taste
	if (!element) return defaultPoint;

	return {
		x: currPosition.x / (element.offsetWidth - window.innerWidth),
		y: -currPosition.y / (element.offsetHeight - window.innerHeight)
	}
}

export const App: FC = () => {
	const contentRef = useRef<HTMLDivElement>(null);
	const [color, setColor] = useState(0);
	const dispatch = useDispatch();

	useScrollPosition(({ prevPos, currPos }) => {
		dispatch(setScrollPosition({
			normalizePrevPosition: normalizeScrollPoint(prevPos, contentRef.current),
			normalizeCurrPosition: normalizeScrollPoint(currPos, contentRef.current)
		}))
	},
		[],
		contentRef
	);

	const message = useMessageStore(messageState => messageState.message);

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
