import dayjs from "dayjs";
import TweetCard from "@/components/twitter-card";
export const tweets = [
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

export default function Posts() {
	return <TweetCard tweet={tweets[0]} />;
}
