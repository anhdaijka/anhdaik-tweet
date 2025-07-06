"use client";

import TweetCard, { TweetCardSkeleton } from "@/components/twitter-card";
import { getTweets } from "@/services/tweetQuery";
import { motion } from "motion/react";
import dayjs from "dayjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ForYou = () => {
	const queryClient = useQueryClient();
	const {
		data: tweets,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["tweets"],
		queryFn: () => getTweets(),
	});
	if (isLoading)
		return Array.from({ length: 5 }, (_, i) => i).map((i) => (
			<TweetCardSkeleton key={i} />
		));
	if (error) return <div>{error.message}</div>;
	if (Array.isArray(tweets) && tweets.length === 0)
		return (
			<div className="text-center w-full max-w-screen-sm mx-auto">
				No tweets found 😥
			</div>
		);
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			transition={{
				duration: 0.3,
				ease: [0.4, 0, 0.2, 1],
				stiffness: 100,
				damping: 20,
				type: "spring",
				mass: 0.5,
			}}
		>
			{Array.isArray(tweets) &&
				tweets
					.filter((tweet) => tweet.tag === false)
					.map((tweet) => (
						<TweetCard
							key={tweet.id}
							{...tweet}
							created_at={dayjs(tweet.created_at).format(
								"h:mm A ・ MMM D, YYYY"
							)}
						/>
					))}
		</motion.div>
	);
};

export default ForYou;
