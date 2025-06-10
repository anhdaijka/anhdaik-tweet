"use client";

import TweetCard from "@/components/twitter-card";
import { getTweets } from "@/services/tweetQuery";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Tables } from "../../../database.types";
import dayjs from "dayjs";

const ForYou = () => {
	const [tweets, setTweets] = useState<
		(Tables<"tweets"> & {
			author: Tables<"users">;
			likes?: number;
			comments?: number;
		})[]
	>([]);
	useEffect(() => {
		const fetchTweets = async () => {
			const res = await getTweets();
			if ("error" in res) {
				console.log(res);
				toast.error("Failed to fetch tweets", { position: "top-center" });
			} else {
				setTweets(
					res as (Tables<"tweets"> & {
						author: Tables<"users">;
						likes?: number;
						comments?: number;
					})[]
				);
				console.log(res);
			}
		};
		fetchTweets();
	}, []);

	return (
		tweets && (
			<>
				{tweets.map((tweet) => (
					<TweetCard
						key={tweet.id}
						{...tweet}
						created_at={dayjs(tweet.created_at).format("h:mm A ・ MMM D, YYYY")}
					/>
				))}
			</>
		)
	);
};

export default ForYou;
