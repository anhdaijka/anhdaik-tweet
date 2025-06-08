"use client";

import React from "react";
import MobileNav from "./mobile-nav";
import { MusicPlayer } from "./music-player";
import { motion, AnimatePresence } from "motion/react";

const ComboNav = () => {
	const [isShow, setIsShow] = React.useState(false);

	return (
		<AnimatePresence>
			<MobileNav />
			{isShow && (
				<div className="fixed bottom-0 left-0 right-0">
					<MusicPlayer />
				</div>
			)}
		</AnimatePresence>
	);
};

export default ComboNav;
