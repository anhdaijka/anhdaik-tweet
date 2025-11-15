import React from "react";
import { admin, data } from "@/lib/data";
import TweetCard from "@/components/twitter-card";
import dayjs from "dayjs";
import { motion } from "motion/react";
import { parentVariants } from "@/lib/animation";
const tweets = data.projects.map((project, index) => ({
	id: String(index),
	content: project.description,
	created_at: dayjs(new Date()).format("h:mm A ・ MMM D, YYYY"),
	images: project.images,
}));
const Projects = () => {
	return (
		<motion.div
			variants={parentVariants}
			initial="hidden"
			whileInView="visible"
			className="min-h-[150%]"
		>
			{tweets.map((tweet) => (
				<TweetCard
					key={tweet.id}
					id={tweet.id}
					content={tweet.content}
					created_at={tweet.created_at}
					images={tweet.images ?? null}
					updated_at={null}
					tag={false}
					author_id={admin.email}
				/>
			))}
		</motion.div>
	);
};

export default Projects;
