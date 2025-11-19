"use client";

import TweetCard, { TweetCardSkeleton } from "@/components/twitter-card";
import { getTweets } from "@/services/tweetQuery";
import { motion } from "motion/react";
import dayjs from "dayjs";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMemo } from "react";
import EmptyMuted from "./empty";

const ForYou = () => {
	const { data, error, fetchNextPage, hasNextPage, isLoading } =
		useInfiniteQuery({
			queryKey: ["tweets", { tag: false }] as const,
			queryFn: getTweets,
			initialPageParam: 0,
			getNextPageParam: (lastPage) => lastPage.nextPage,
		});

	const tweets = useMemo(
		() => data?.pages.flatMap((page) => page.data) ?? [],
		[data]
	);

	if (isLoading)
		return Array.from({ length: 5 }, (_, i) => i).map((i) => (
			<TweetCardSkeleton key={i} />
		));

	if (error) return <div>{error.message}</div>;

	if (tweets.length === 0)
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
				ease: "easeInOut",
				stiffness: 100,
				damping: 20,
				type: "spring",
				mass: 0.5,
			}}
		>
			<InfiniteScroll
				dataLength={tweets.length}
				next={fetchNextPage}
				hasMore={hasNextPage}
				loader={<TweetCardSkeleton />}
				endMessage={
					// <div className="text-center w-full max-w-screen-sm mx-auto py-20">
					// 	You have reached the end 😥
					// </div>
					<EmptyMuted name="tweets" />
				}
			>
				{/* Xóa .filter() ở đây */}
				{tweets.map((tweet) => (
					<TweetCard
						key={tweet.id}
						{...tweet}
						created_at={dayjs(tweet.created_at).format("h:mm A ・ MMM D, YYYY")}
					/>
				))}
			</InfiniteScroll>
		</motion.div>
	);
};

export default ForYou;
