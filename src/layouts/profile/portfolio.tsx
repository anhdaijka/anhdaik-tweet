import TweetCard from "@/components/twitter-card";

const portfolio = [
	{
		id: "1",
		content: `<span class="text-xl font-bold">09/2021 - Present</span><br/>Elementary & Intermediate Japanese Tutor (Freelancer) 🧑‍💼`,
		timestamp: "Present",
		likes: 1,
		retweets: 1,
		replies: 0,
		image:
			"https://90dayjapanese.com/wp-content/uploads/2022/12/Best-books-to-learn-Japanese-min.png",
	},
	{
		id: "2",
		content: `<span class="text-xl font-bold">09/2023</span><br/>Japanese teacher at SOFL Language Center 🧑‍💼`,
		timestamp: "09/09/2023",
		likes: 1,
		retweets: 1,
		replies: 0,
		image: "https://trungtamnhatngu.edu.vn/uploads/slides/1.jpg",
	},
	{
		id: "3",
		content: `<span class="text-xl font-bold">04/2020 - 04/2023</span><br/>Studied at Otemae University of Hyougo (IT major) 🖥️`,
		timestamp: "11/04/2023",
		likes: 1,
		retweets: 1,
		replies: 0,
		image:
			"https://collegetown-nishinomiya.jp/material/images/group/2/OTEMAE2.jpg",
	},
	{
		id: "4",
		content: `<span class="text-xl font-bold">05/2019 - 04/2023</span><br/>Head Chef at Matsuya (Shinkaichi-ten, Nanba-Sennichimae-ten) 🖥️`,
		timestamp: "11/04/2023",
		likes: 1,
		retweets: 1,
		replies: 0,
		image:
			"https://www.howgoodisitactually.com/wp-content/uploads/2023/01/Matsuya-Osaka-2022-1-Exterior-1.jpg",
	},

	{
		id: "5",
		content: `<span class="text-xl font-bold">03/2020</span><br/>Graduated from the EHLE Institute Japanese Language School㊗️`,
		timestamp: "10/03/2020",
		likes: 1,
		retweets: 1,
		replies: 0,
		image:
			"https://wego.edu.vn/wp-content/uploads/2023/05/Nhat-ngu-Ehle-Ehle-Language-Academy-featured-image-Trung-tam-Du-hoc-va-Nhan-luc-Quoc-te-WEGO-wego.edu_.vn_-1200x675.webp",
	},
	{
		id: "6",
		content: `<span class="text-xl font-bold">07/2019</span><br/>Qualified certificate of Japanese-Language Proficient Test (N2) 🧑‍💼`,
		timestamp: "07/2019",
		likes: 1,
		retweets: 1,
		replies: 0,
		image:
			"https://images.squarespace-cdn.com/content/v1/553ea529e4b017006f19100a/15da6f30-4b30-4de4-9d22-c6def4299f79/jlpt-logo-sq.png",
	},
	{
		id: "7",
		content: `<span class="text-xl font-bold">12/2018</span><br/>Qualified Certificate of Japanese-Language Proficient Test (N3) 🧑‍💼`,
		timestamp: "12/2018",
		likes: 1,
		retweets: 1,
		replies: 0,
		image:
			"https://images.squarespace-cdn.com/content/v1/553ea529e4b017006f19100a/15da6f30-4b30-4de4-9d22-c6def4299f79/jlpt-logo-sq.png",
	},
	{
		id: "8",
		content: `<span class="text-xl font-bold">05/2018</span><br/>Graduated from the Yen Lang High School 🧑‍💼`,
		timestamp: "05/2018",
		likes: 1,
		retweets: 1,
		replies: 0,
		image:
			"https://r73troypb4obj.vcdn.cloud/website02/uploads/pictures/62280d101a1b853a015a39ca/content_danh-gia-truong-thpt-yen-lang-ha-noi-co-tot-khong.jpg",
	},
	{
		id: "9",
		content: `<span class="text-xl font-bold">02/2018</span><br/>Qualified Certificate of Japanese-Language NATTEST (N5) 🧑‍💼`,
		timestamp: "02/2018",
		likes: 1,
		retweets: 1,
		replies: 0,
		image: "https://funova.vn/wp-content/uploads/2022/08/sddefault.jpg",
	},
];

export default function Portfolio() {
	return (
		<div className="min-h-[150%]">
			{portfolio.map((tweet) => (
				<TweetCard key={tweet.id} tweet={tweet} />
			))}
		</div>
	);
}
