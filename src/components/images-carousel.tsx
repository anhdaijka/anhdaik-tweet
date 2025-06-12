"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function ImagesCarousel({ images }: { images: string[] }) {
	const [api, setApi] = React.useState<CarouselApi>();
	const [current, setCurrent] = React.useState(0);
	const [count, setCount] = React.useState(0);
	const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);

	React.useEffect(() => {
		if (!api) {
			return;
		}
		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);
		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<>
			<Carousel
				setApi={setApi}
				className="mt-2 rounded-2xl border border-border aspect-video object-cover relative overflow-hidden"
			>
				<CarouselContent>
					{images.map((image, index) => (
						<CarouselItem key={index}>
							<Image
								src={image}
								alt="image"
								className="w-full object-cover object-center rounded-xl cursor-pointer"
								width={1000}
								height={1000}
								onClick={() => setFocusedIndex(index)}
							/>
						</CarouselItem>
					))}
				</CarouselContent>

				{/* <CarouselPrevious className="absolute top-1/2 left-2 z-10 bg-primary">
					<span className="sr-only">Previous slide</span>
				</CarouselPrevious>
				<CarouselNext className="absolute top-1/2 right-2 z-10 bg-primary">
					<span className="sr-only">Next slide</span>
				</CarouselNext> */}
				<div className="mt-4 flex items-center justify-end gap-2 absolute bottom-2 right-1/2 translate-x-1/2">
					{Array.from({ length: count }).map((_, index) => (
						<button
							key={index}
							onClick={() => api?.scrollTo(index)}
							className={cn("size-3.5 rounded-full bg-accent", {
								"bg-secondary/50": current === index + 1,
							})}
						>
							<span className="sr-only">{index + 1}</span>
						</button>
					))}
				</div>
			</Carousel>

			<AnimatePresence>
				{focusedIndex !== null && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
						onClick={() => setFocusedIndex(null)}
					>
						<motion.div
							initial={{ scale: 0.95 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.95 }}
							transition={{ duration: 0.2 }}
							className="relative max-w-4xl w-full h-full flex items-center justify-center"
							onClick={(e) => e.stopPropagation()}
						>
							<Image
								src={images[focusedIndex]}
								alt="fullscreen image"
								width={1200}
								height={1200}
								className="object-contain rounded-xl max-h-[90vh] max-w-[90vw] bg-black"
								priority
								onClick={() => setFocusedIndex(null)}
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
