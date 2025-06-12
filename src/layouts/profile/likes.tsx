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
			<TweetCard
				{...tweets[1]}
				tag={false}
				updated_at={null}
				images={tweets[1].images ?? null}
			/>
			<TweetCard
				{...tweets[2]}
				tag={false}
				updated_at={null}
				images={tweets[2].images ?? null}
			/>
		</motion.div>
	);
}
