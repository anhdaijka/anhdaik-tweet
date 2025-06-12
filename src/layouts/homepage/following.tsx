"use client";

import TweetCard, { TweetCardSkeleton } from "@/components/twitter-card";
import { getTweets } from "@/services/tweetQuery";

import dayjs from "dayjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Following = () => {
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
		<>
			{Array.isArray(tweets) &&
				tweets
					.filter((tweet) => tweet.tag === true)
					.map((tweet) => (
						<TweetCard
							key={tweet.id}
							{...tweet}
							created_at={dayjs(tweet.created_at).format(
								"h:mm A ・ MMM D, YYYY"
							)}
						/>
					))}
		</>
	);
};

export default Following;
