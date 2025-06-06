"use client";

import { gallery } from "@/lib/data";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const Gallery = () => {
	const [focusedImage, setFocusedImage] = useState<string | undefined>(
		undefined
	);
	const [focused, setFocused] = useState(false);
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
			{gallery.map((image, i) => (
				<div key={i}>
					<Image
						src={image}
						alt="image"
						className="w-full aspect-[9/16] object-cover object-center rounded-xl"
						width={1000}
						height={1000}
						onClick={() => {
							setFocusedImage(image);
							setFocused(true);
						}}
					/>
					<AnimatePresence mode="wait">
						{focused && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3, ease: "easeInOut", type: "tween" }}
								className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center bg-black/50"
								onClick={() => {
									setFocused(false);
									setFocusedImage(undefined);
								}}
							>
								<div className="w-[50%] flex flex-col justify-center items-center">
									<Image
										src={focusedImage || ""}
										alt="Tweet image"
										width={500}
										height={500}
										className="w-[60%] aspect-[9/16] object-cover rounded-xl md:rounded-2xl"
										loading="lazy"
										onClick={() => {
											setFocused(false);
											setFocusedImage(undefined);
										}}
									/>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			))}
		</div>
	);
};

export default Gallery;
