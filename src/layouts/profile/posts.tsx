import dayjs from "dayjs";
import TweetCard from "@/components/twitter-card";
import { motion } from "motion/react";
import { parentVariants } from "@/lib/animation";
import { admin } from "@/lib/data";
export const tweets = [
	{
		id: "1",
		content:
			"Welcome to my Portfolio, I hope you like it! <br/> It still under development and will be updated soon. 😎 <br/> Check out my Projects at the next tab!",
		created_at: dayjs(new Date()).format("h:mm A ・ MMM D, YYYY"),
		likes: 1,
		retweets: 1,
	},
	{
		id: "2",
		content: "I'm a Blue for over 15 years. Never regret that ",
		created_at: dayjs(new Date()).format("h:mm A ・ MMM D, YYYY"),
		likes: 1,
		retweets: 1,

		image:
			"https://resources.premierleague.pulselive.com/premierleague/photo/2025/05/28/54bc0ade-d85a-4591-bc85-2f66ecc5c9a7/Chelsea-lift-Conference-League-trophy.png",
	},
	{
		id: "3",
		content:
			"ザースクリプトの各曲はいつの間にか、 <br/> なんとなく聞こえる。 <br/> 感謝の言葉を辞めない。 <br/> 今までのことを忘れることなく、 <br/> 俺の魂を救ってくれ、有難うな",
		created_at: dayjs(new Date()).format("h:mm A ・ MMM D, YYYY"),
		likes: 1,
		retweets: 1,

		image:
			"https://i2-prod.irishstar.com/article32852972.ece/ALTERNATES/s1200c/1_gettyimages-1192746906.jpg",
	},
];

export default function Posts() {
	return (
		<motion.div
			variants={parentVariants}
			initial="hidden"
			whileInView="visible"
			className="min-h-[150%]"
		>
			<TweetCard
				id={tweets[0].id}
				content={tweets[0].content}
				created_at={tweets[0].created_at}
				likes={tweets[0].likes}
				image={tweets[0].image ? [tweets[0].image] : null}
				author_id={null}
				updated_at={null}
				author={{
					id: "1",
					full_name: admin.name,
					avatar_url: admin.avatar,
					email: admin.email,
				}}
			/>
		</motion.div>
	);
}
