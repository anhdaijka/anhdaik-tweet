"use client";

import { motion } from "motion/react";
import { useSidebar } from "@/components/ui/sidebar";
import { MusicPlayer } from "@/components/music-player";
import { Button } from "@/components/ui/button";
import { Music4 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Music() {
	const { showMusic, musicExpanded, toggleMusicExpanded } = useSidebar();

	return (
		showMusic && (
			<>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
					className={cn(
						"fixed right-4 bottom-4 z-10",
						!musicExpanded ? "hidden" : "block"
					)}
				>
					<Button
						size={"icon"}
						className="rounded-full"
						onClick={toggleMusicExpanded}
					>
						<Music4 className="size-5" />
					</Button>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, x: 100 }}
					whileInView={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 100 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
					className={cn(
						"fixed bottom-0 right-0 z-10",
						musicExpanded ? "hidden" : "block"
					)}
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
