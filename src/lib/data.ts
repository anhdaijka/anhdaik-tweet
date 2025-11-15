import avatar from "@/assets/images/avatar.png";
// Tech stack images
import html from "@/assets/images/techstack/html.png";
import css from "@/assets/images/techstack/css.png";
import sass from "@/assets/images/techstack/sass.png";
import js from "@/assets/images/techstack/js.png";
import react from "@/assets/images/techstack/react.png";
import redux from "@/assets/images/techstack/redux.png";
import tailwind from "@/assets/images/techstack/tailwind.png";
import bootstrap from "@/assets/images/techstack/bootstrap.png";
import vscode from "@/assets/images/techstack/vscode.png";
import github from "@/assets/images/techstack/github.png";
import git from "@/assets/images/techstack/git.png";
import npm from "@/assets/images/techstack/npm.png";
import postman from "@/assets/images/techstack/postman.png";
import figma from "@/assets/images/techstack/figma.png";

// Project images
import blog from "@/assets/images/blog.png";
import chat from "@/assets/images/chat.png";
import codefest from "@/assets/images/codefest.png";

//Personal images
import anh1 from "@/assets/images/personal/1.jpg";
import anh2 from "@/assets/images/personal/2.jpg";
import anh3 from "@/assets/images/personal/3.jpg";
import anh4 from "@/assets/images/personal/4.jpg";
import anh5 from "@/assets/images/personal/5.jpg";
import anh6 from "@/assets/images/personal/6.jpg";
import anh7 from "@/assets/images/personal/7.jpg";
import anh8 from "@/assets/images/personal/8.jpg";
import anh9 from "@/assets/images/personal/9.jpg";

import { User, Inbox, TwitterIcon, Newspaper } from "lucide-react";

import { baseUrl } from "@/configs/site";

export const admin = {
	name: "Phùng Quang Anh",
	email: "anhdaijka@gmail.com",
	username: "anhdaijka",
	ocupation: "Software Engineer",
	avatar: avatar.src,
	as: {
		github: "https://github.com/anhdaijka",
		instagram: "https://www.instagram.com/anhdaijka",
		linkedin: "https://www.linkedin.com/in/1020phug",
		facebook: "https://www.facebook.com/anhdaijka",
	},
	role: "Admin",
	interests: ["Web Development", "Stoicism", "Politics", "Music", "Gaming"],
	skills: [
		{
			name: "HTML",
			level: 90,
		},
		{
			name: "CSS",
			level: 90,
		},
		{
			name: "JavaScript",
			level: 90,
		},
		{
			name: "TypeScript",
			level: 90,
		},
		{
			name: "React",
			level: 90,
		},
		{
			name: "Next.js",
			level: 90,
		},
		{
			name: "Node.js",
			level: 80,
		},
		{
			name: "Express.js",
			level: 75,
		},
		{
			name: "MongoDB",
			level: 90,
		},
		{
			name: "MySQL",
			level: 80,
		},
		{
			name: "Git",
			level: 90,
		},
		{
			name: "GitHub",
			level: 90,
		},
		{
			name: "VSCode",
			level: 90,
		},
		{
			name: "Postman",
			level: 80,
		},
	],
};

// Tech Stack and Tools
export const techStackDetails = [
	html,
	css,
	js,
	react,
	redux,
	sass,
	tailwind,
	bootstrap,
	vscode,
	postman,
	npm,
	git,
	github,
	figma,
];

export const data = {
	navMain: [
		{
			title: "Anh's Portfolio",
			url: `${baseUrl}/`,
			icon: User,
		},
		// {
		// 	title: "Blog",
		// 	url: `${baseUrl}/blog`,
		// 	icon: Newspaper,
		// },
		{
			title: "Tweets",
			url: `${baseUrl}/tweets`,
			icon: TwitterIcon,
		},

		{
			title: "Contact",
			url: `${baseUrl}/contact`,
			icon: Inbox,
			badge: "10",
		},
	],
	projects: [
		{
			name: "Personal Blog & Self-building CMS",
			url: "https://1020blog.vercel.app",
			emoji: "📝",
			images: [blog.src],
			tech: [
				{
					name: "Next.js",
					url: "https://nextjs.org/",
				},
				{
					name: "TailwindCSS",
					url: "https://tailwindcss.com/",
				},
				{
					name: "MongoDB",
					url: "https://www.mongodb.com/",
				},
				{
					name: "Prisma",
					url: "https://www.prisma.io/",
				},
			],
			description: `My Personal blog and self-building CMS using Next.js, TailwindCSS, MongoDB, Prisma, and Vercel. <br/> See more at <a href="https://1020blog.vercel.app" target="_blank" rel="noopener noreferrer" class="font-medium text-primary hover:underline">Here</a>`,
		},
		{
			name: "Dating & Matching App for University Students",
			url: "https://soulsync-fe.pages.dev",
			emoji: "💌",
			images: [chat.src],
			tech: [
				{
					name: "React (Vite)",
					url: "https://vitejs.dev/",
				},
				{
					name: "TailwindCSS",
					url: "https://tailwindcss.com/",
				},
				{
					name: "SocketIO",
					url: "https://socket.io/",
				},
				{
					name: "MongoDB",
					url: "https://www.mongodb.com/",
				},
				{
					name: "Express.js",
					url: "https://expressjs.com/",
				},
			],
			description: `My Dating & Matching App for University Students using React (Vite), TailwindCSS, SocketIO, MongoDB, Express.js, and Vercel. <br/> See more at <a href="https://soulsync-fe.pages.dev" target="_blank" rel="noopener noreferrer" class="font-medium text-primary hover:underline">Here</a>`,
		},

		{
			name: "CodeFest 2025 Landing Page",
			url: "https://codefest2025.jsclub.dev",
			emoji: "🧑‍💻",
			images: [codefest.src],
			tech: [
				{
					name: "React (Vite)",
					url: "https://vitejs.dev/",
				},
				{
					name: "TailwindCSS",
					url: "https://tailwindcss.com/",
				},
				{
					name: "Framer Motion",
					url: "https://www.framer.com/motion/",
				},
			],
			description: `My CodeFest 2025 Landing Page using React (Vite), TailwindCSS, and Framer Motion. <br/> See more at <a href="https://codefest2025.jsclub.dev" target="_blank" rel="noopener noreferrer" class="font-medium text-primary hover:underline">Here</a>`,
		},
	],
	workspaces: [
		{
			name: "Education",
			emoji: "🏫",
			pages: [
				{
					name: "FPT University - Hola Campus",
					url: "#",
					emoji: "🤖",
				},
				{
					name: "大手前大学・情報学部",
					url: "#",
					emoji: "💻",
				},
				{
					name: "エール学園日本語教育学科",
					url: "#",
					emoji: "🇯🇵",
				},
			],
		},
		{
			name: "Qualifications",
			emoji: "🎖️",
			pages: [
				{
					name: "JLPT N2 (07/2019)",
					url: "#",
					emoji: "🎯",
				},
				{
					name: "JLPT N3 (12/2018)",

					url: "#",
					emoji: "🧠",
				},
				{
					name: "JLPT N5 (02/2018)",
					url: "#",
					emoji: "🤝",
				},
			],
		},
		{
			name: "Work Experience",
			emoji: "💼",
			pages: [
				{
					name: "Primary Japanese Tutor",

					url: "#",
					emoji: "🧑‍💼",
				},
				{
					name: "Primary Japanese Teacher",

					url: "#",
					emoji: "🧑‍🏫",
				},
				{
					name: "Head Chef at 松屋",
					url: "#",
					emoji: "🍲",
				},
			],
		},
	],
};

export const gallery = [
	anh1.src,
	anh2.src,
	anh3.src,
	anh4.src,
	anh5.src,
	anh6.src,
	anh7.src,
	anh8.src,
	anh9.src,
];

export const mockPosts = [
	{
		title: "Hello World",
		description: "This is a sample post.",
		image:
			"https://resources.premierleague.pulselive.com/photo-resources/2024/08/31/7ec7d402-ae8c-44eb-add7-2841f3f74e8d/CheDM2425.jpg?width=1000&height=480",
		badge: { text: "Lifestyle", variant: "orange" },
		href: "#",
	},
	{
		title: "Another Post",
		description: "This is another sample post.",
		image:
			"https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/tai-cs-go.jpg",
		badge: { text: "Tech", variant: "pink" },
		href: "#",
	},
	{
		title: "Another Post",
		description: "This is another sample post.",
		image:
			"https://thehowler.org/wp-content/uploads/2018/01/roll-safe-meme-1.jpg",
		badge: { text: "Shitpost", variant: "green" },
		href: "#",
	},
	{
		title: "Another Post",
		description: "This is another sample post.",
		image:
			"https://pbs.twimg.com/card_img/1930681947182993408/uVyllfnZ?format=jpg&name=medium",
		badge: { text: "Philosophy", variant: "indigo" },
		href: "#",
	},
];
