import React from "react";
import { data } from "@/lib/data";
import TweetCard from "@/components/twitter-card";
import dayjs from "dayjs";

const tweets = data.projects.map((project, index) => ({
	id: String(index),
	content: project.description,
	timestamp: dayjs(new Date()).format("DD/MM/YY"),
	likes: Math.floor(Math.random() * 1000),
	retweets: Math.floor(Math.random() * 1000),
	replies: Math.floor(Math.random() * 1000),
	image: project.image,
}));
const Projects = () => {
	return tweets.map((tweet) => <TweetCard key={tweet.id} tweet={tweet} />);
};

export default Projects;
