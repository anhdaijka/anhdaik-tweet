"use client";

import { motion } from "motion/react";
import { useSidebar } from "@/components/ui/sidebar";
import { MusicPlayer } from "@/components/music-player";
import { Button } from "@/components/ui/button";
import { Disc3 } from "lucide-react";
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
						<Disc3 className="size-5" />
					</Button>
				</motion.div>
				<motion.div
					variants={slideLeft}
					initial="hidden"
					animate={musicExpanded ? "visible" : "hidden"}
					exit="hidden"
					transition={{ duration: 0.3, ease: "easeInOut" }}
					className={cn("fixed bottom-0 right-0 z-10")}
					style={{ translateX: musicExpanded ? "0" : "100%" }}
				>
					<MusicPlayer
						musicExpanded={musicExpanded}
						toggleMusicExpanded={toggleMusicExpanded}
					/>
				</motion.div>
			</>
		)
	);
}
