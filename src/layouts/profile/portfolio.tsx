import TweetCard from "@/components/twitter-card";
import dayjs from "dayjs";
import { motion } from "motion/react";
import { parentVariants } from "@/lib/animation";
import { admin } from "@/lib/data";
const portfolio = [
	{
		id: "1",
		content: `<span class="text-xl font-bold">09/2021 - Present</span><br/>Elementary & Intermediate Japanese Tutor (Freelancer) 🧑‍💼`,
		created_at: "Present",
		likes: 1,
		image:
			"https://90dayjapanese.com/wp-content/uploads/2022/12/Best-books-to-learn-Japanese-min.png",
	},
	{
		id: "2",
		content: `<span class="text-xl font-bold">09/2023</span><br/>Japanese teacher at SOFL Language Center 🧑‍💼`,
		created_at: dayjs("09/09/2023").format("h:mm A ・ MMM D, YYYY"),
		likes: 1,
		image: "https://trungtamnhatngu.edu.vn/uploads/slides/1.jpg",
	},
	{
		id: "3",
		content: `<span class="text-xl font-bold">04/2020 - 04/2023</span><br/>Studied at Otemae University of Hyougo (IT major) 🖥️`,
		created_at: dayjs("11/04/2023").format("h:mm A ・ MMM D, YYYY"),
		likes: 1,
		image:
			"https://collegetown-nishinomiya.jp/material/images/group/2/OTEMAE2.jpg",
	},
	{
		id: "4",
		content: `<span class="text-xl font-bold">05/2019 - 04/2023</span><br/>Head Chef at Matsuya (Shinkaichi-ten, Nanba-Sennichimae-ten) 🖥️`,
		created_at: dayjs("11/04/2023").format("h:mm A ・ MMM D, YYYY"),
		likes: 1,
		image:
			"https://www.howgoodisitactually.com/wp-content/uploads/2023/01/Matsuya-Osaka-2022-1-Exterior-1.jpg",
	},

	{
		id: "5",
		content: `<span class="text-xl font-bold">03/2020</span><br/>Graduated from the EHLE Institute Japanese Language School㊗️`,
		created_at: dayjs("10/03/2020").format("h:mm A ・ MMM D, YYYY"),
		likes: 1,
		image:
			"https://wego.edu.vn/wp-content/uploads/2023/05/Nhat-ngu-Ehle-Ehle-Language-Academy-featured-image-Trung-tam-Du-hoc-va-Nhan-luc-Quoc-te-WEGO-wego.edu_.vn_-1200x675.webp",
	},
	{
		id: "6",
		content: `<span class="text-xl font-bold">07/2019</span><br/>Qualified certificate of Japanese-Language Proficient Test (N2) 🧑‍💼`,
		created_at: dayjs("18/07/2019").format("h:mm A ・ MMM D, YYYY"),
		likes: 1,
		image:
			"https://images.squarespace-cdn.com/content/v1/553ea529e4b017006f19100a/15da6f30-4b30-4de4-9d22-c6def4299f79/jlpt-logo-sq.png",
	},
	{
		id: "7",
		content: `<span class="text-xl font-bold">12/2018</span><br/>Qualified Certificate of Japanese-Language Proficient Test (N3) 🧑‍💼`,
		created_at: dayjs("18/12/2018").format("h:mm A ・ MMM D, YYYY"),
		likes: 1,
		image:
			"https://images.squarespace-cdn.com/content/v1/553ea529e4b017006f19100a/15da6f30-4b30-4de4-9d22-c6def4299f79/jlpt-logo-sq.png",
	},
	{
		id: "8",
		content: `<span class="text-xl font-bold">05/2018</span><br/>Graduated from the Yen Lang High School 🧑‍💼`,
		created_at: dayjs("21/05/2018").format("h:mm A ・ MMM D, YYYY"),
		likes: 1,
		image:
			"https://r73troypb4obj.vcdn.cloud/website02/uploads/pictures/62280d101a1b853a015a39ca/content_danh-gia-truong-thpt-yen-lang-ha-noi-co-tot-khong.jpg",
	},
	{
		id: "9",
		content: `<span class="text-xl font-bold">02/2018</span><br/>Qualified Certificate of Japanese-Language NATTEST (N5) 🧑‍💼`,
		created_at: dayjs("28/02/2018").format("h:mm A ・ MMM D, YYYY"),
		likes: 1,
		image: "https://funova.vn/wp-content/uploads/2022/08/sddefault.jpg",
	},
];

export default function Portfolio() {
	return (
		<motion.div
			variants={parentVariants}
			initial="hidden"
			whileInView="visible"
			className="min-h-[150%]"
		>
			{portfolio.map((tweet) => (
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
}
