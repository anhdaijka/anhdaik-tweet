import TweetCard from "@/components/twitter-card";
import { tweets } from "./posts";
import { motion } from "motion/react";
import { parentVariants } from "@/lib/animation";

export default function Likes() {
	return (
		<motion.div
			variants={parentVariants}
			initial="hidden"
			whileInView="visible"
			className="min-h-[150%]"
		>
			<TweetCard {...tweets[1]} />
			<TweetCard {...tweets[2]} />
		</motion.div>
	);
}
