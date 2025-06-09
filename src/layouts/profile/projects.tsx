import React from "react";
import { data } from "@/lib/data";
import TweetCard from "@/components/twitter-card";
import dayjs from "dayjs";
import { motion } from "motion/react";
import { parentVariants } from "@/lib/animation";
const tweets = data.projects.map((project, index) => ({
	id: String(index),
	content: project.description,
	timestamp: dayjs(new Date()).format("h:mm A ・ MMM D, YYYY"),
	likes: Math.floor(Math.random() * 1000),
	retweets: Math.floor(Math.random() * 1000),
	replies: Math.floor(Math.random() * 1000),
	image: project.image,
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
				<TweetCard key={tweet.id} tweet={tweet} />
			))}
		</motion.div>
	);
};

export default Projects;
