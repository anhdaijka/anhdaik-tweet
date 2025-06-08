"use client";

import { motion } from "motion/react";
import { useSidebar } from "@/components/ui/sidebar";
import { MusicPlayer } from "@/components/music-player";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, Disc3, Minimize, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { slideLeft, slideRight } from "@/lib/animation";

export default function Music() {
	const { showMusic, musicExpanded, toggleMusicExpanded } = useSidebar();

	return (
		showMusic && (
			<>
				<motion.div
					variants={slideRight}
					initial="hidden"
					animate={musicExpanded ? "hidden" : "visible"}
					exit="hidden"
					transition={{ duration: 0.3, ease: "easeInOut" }}
					className={cn("fixed right-4 bottom-4 z-10")}
					style={{ translateX: musicExpanded ? "100%" : "0" }}
				>
					<Button
						size={"icon"}
						className="rounded-full"
						onClick={toggleMusicExpanded}
					>
						<Disc3 className="size-6 animate-spin" />
					</Button>
				</motion.div>
				<motion.div
					variants={slideLeft}
					initial="hidden"
					animate={musicExpanded ? "visible" : "hidden"}
					exit="hidden"
					transition={{ duration: 0.3, ease: "easeInOut" }}
					className={cn("fixed bottom-0 right-0 z-20")}
					style={{ translateX: musicExpanded ? "0" : "100%" }}
				>
					<MusicPlayer
						musicExpanded={musicExpanded}
						toggleMusicExpanded={toggleMusicExpanded}
					/>
					{/* 					<div
						className="absolute top-0 left-1/2 translate-x-[-50%] translate-y-[-100%] sm:translate-y-[-50%] px-12 py-2 sm:left-0 sm:-translate-x-[100%] sm:top-1/2 group hover:bg-muted transition-all sm:px-1 sm:py-10 bg-[#4c5363] border-t sm:border-t-0 sm:border-l rounded-t-2xl border-border sm:rounded-t-none sm:rounded-l-2xl cursor-pointer"
						onClick={toggleMusicExpanded}
					>
						<ArrowRight className="hidden sm:block size-4 group-hover:scale-125 transition-all " />
						<ArrowDown className="block sm:hidden size-4 group-hover:scale-125 transition-all" />
					</div>
					<iframe
						style={{ borderRadius: 12 }}
						src="https://open.spotify.com/embed/playlist/64P3IpeulDXB9cVgtfOcsf?utm_source=generator"
						width="100%"
						height={352}
						frameBorder={0}
						allowFullScreen
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy"
						className="h-[70vh] w-screen sm:w-sm"
					/> */}
				</motion.div>
			</>
		)
	);
}
