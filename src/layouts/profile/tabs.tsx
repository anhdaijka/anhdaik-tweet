import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { data, gallery } from "@/lib/data";
import TweetCard from "@/components/twitter-card";
import dayjs from "dayjs";
import axios from "axios";
import { APIUrl } from "@/configs/site";
import Image from "next/image";
import Gallery from "./gallery";

const tweets = data.projects.map((project, index) => ({
	id: String(index),
	content: project.description,
	timestamp: dayjs(new Date()).format("DD/MM/YY"),
	likes: Math.floor(Math.random() * 1000),
	retweets: Math.floor(Math.random() * 1000),
	replies: Math.floor(Math.random() * 1000),
	image: project.image,
}));

// const fetchTweets = async () => {
// 	const res = await axios.get(`${APIUrl}/tweets`, {
// 		headers: {
// 			"Content-Type": "application/json",
// 			Authorization: `Bearer ${process.env.TOKEN}`,
// 		},
// 	});
// 	if (!res) return [];
// 	return res.data;
// };

const exampleTweet = [
	{
		id: "1",
		content:
			"Welcome to my Portfolio, I hope you like it! <br/> It still under development and will be updated soon. 😎 <br/> Check out my Projects at the next tab!",
		timestamp: dayjs(new Date()).format("DD/MM/YY"),
		likes: 1,
		retweets: 1,
		replies: 0,
	},
	{
		id: "2",
		content: "I'm a Blue for over 15 years. Never regret that ",
		timestamp: dayjs(new Date()).format("DD/MM/YY"),
		likes: 1,
		retweets: 1,
		replies: 0,
		image:
			"https://resources.premierleague.pulselive.com/premierleague/photo/2025/05/28/54bc0ade-d85a-4591-bc85-2f66ecc5c9a7/Chelsea-lift-Conference-League-trophy.png",
	},
	{
		id: "3",
		content:
			"ザースクリプトの各曲はいつの間にか、 <br/> なんとなく聞こえる。 <br/> 感謝の言葉を辞めない。 <br/> 今までのことを忘れることなく、 <br/> 俺の魂を救ってくれ、有難うな",
		timestamp: dayjs(new Date()).format("DD/MM/YY"),
		likes: 1,
		retweets: 1,
		replies: 0,
		image:
			"https://i2-prod.irishstar.com/article32852972.ece/ALTERNATES/s1200c/1_gettyimages-1192746906.jpg",
	},
];

const TabsProfile = async () => {
	// const tweetsApi = await fetchTweets();
	// console.log(tweetsApi);
	return (
		<Tabs defaultValue="projects" className="w-full">
			<TabsList className="w-full bg-transparent border-b border-border rounded-none h-auto p-0">
				<TabsTrigger
					value="posts"
					className="flex-1 bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none py-3 text-xs md:text-sm text-foreground data-[state=active]:text-primary font-semibold"
				>
					Posts
				</TabsTrigger>
				<TabsTrigger
					value="projects"
					className="flex-1 bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none py-3 text-xs md:text-sm text-foreground data-[state=active]:text-primary font-semibold"
				>
					Projects
				</TabsTrigger>
				<TabsTrigger
					value="media"
					className="flex-1 bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none py-3 text-xs md:text-sm text-foreground data-[state=active]:text-primary font-semibold"
				>
					Media
				</TabsTrigger>
				<TabsTrigger
					value="likes"
					className="flex-1 bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none py-3 text-xs md:text-sm text-foreground data-[state=active]:text-primary font-semibold"
				>
					Likes
				</TabsTrigger>
			</TabsList>

			<TabsContent className="min-h-screen" value="posts">
				<div className="h-screen w-full">
					<TweetCard tweet={exampleTweet[0]} />
				</div>
			</TabsContent>

			<TabsContent className="min-h-screen" value="projects">
				<div className="h-screen w-full">
					{tweets.map((tweet) => (
						<TweetCard key={tweet.id} tweet={tweet} />
					))}
				</div>
			</TabsContent>

			<TabsContent className="min-h-screen" value="media">
				<div className="h-screen w-full">
					<Gallery />
				</div>
			</TabsContent>

			<TabsContent className="min-h-screen" value="likes">
				<div className="h-screen w-full">
					<TweetCard tweet={exampleTweet[1]} />
					<TweetCard tweet={exampleTweet[2]} />
				</div>
			</TabsContent>
		</Tabs>
	);
};

export default TabsProfile;
