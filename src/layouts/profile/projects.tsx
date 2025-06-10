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
	likes: Math.floor(Math.random() * 1000),
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
				<TweetCard
					key={tweet.id}
					id={tweet.id}
					content={tweet.content}
					created_at={tweet.created_at}
					likes={tweet.likes}
					image={tweet.image ? [tweet.image] : null}
					author_id={null}
					updated_at={null}
					author={{
						id: "1",
						full_name: admin.name,
						avatar_url: admin.avatar,
						email: admin.email,
					}}
				/>
			))}
		</motion.div>
	);
};

export default Projects;
