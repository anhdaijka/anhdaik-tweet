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

import { Pen, User, Inbox, MessageCircleQuestion } from "lucide-react";

import { baseUrl } from "@/configs/site";

export const admin = {
	name: "Phùng Quang Anh",
	email: "1020phug@gmail.com",
	username: "anhdaik",
	ocupation: "Software Engineer",
	avatar: avatar.src,
	links: {
		github: "https://github.com/anhdaik",
		instagram: "https://www.instagram.com/anhdaik",
		facebook: "https://www.facebook.com/anhdaika",
	},
	role: "Admin",
	interests: [
		"#WebDevelopment",
		"#Stoicism",
		"#Politics",
		"#Music",
		"#Reading",
	],
	skills: {
		frondend: [
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
		],
		backend: [
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
		],
		tools: [
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
	},
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
			title: "Profile",
			url: `${baseUrl}/`,
			icon: User,
		},
		{
			title: "Blog",
			url: `${baseUrl}/blog`,
			icon: Pen,
		},
		{
			title: "Contact",
			url: `${baseUrl}/contact`,
			icon: Inbox,
			badge: "10",
		},
	],
	navSecondary: [
		{
			title: "Help",
			url: "#",
			icon: MessageCircleQuestion,
		},
	],
	projects: [
		{
			name: "Personal Blog & Self-building CMS",
			url: "https://1020blog.vercel.app",
			emoji: "📝",
			image:
				"https://user-images.githubusercontent.com/47711231/215403000-7b9c7c9d-1b9c-4f9d-a8a4-3f7c5b1d9d9c.png",
		},
		{
			name: "Dating & Matching App for University Students",
			url: "https://soulsync-fe.pages.dev",
			emoji: "💌",
			image:
				"https://user-images.githubusercontent.com/47711231/215403000-7b9c7c9d-1b9c-4f9d-a8a4-3f7c5b1d9d9c.png",
		},

		{
			name: "CodeFest 2025 Landing Page",
			url: "https://codefest2025.jsclub.dev",
			emoji: "🧑‍💻",
			image:
				"https://user-images.githubusercontent.com/47711231/215403000-7b9c7c9d-1b9c-4f9d-a8a4-3f7c5b1d9d9c.png",
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
