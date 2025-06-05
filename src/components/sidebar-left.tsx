"use client";

import * as React from "react";
import { Home, User, Inbox, MessageCircleQuestion } from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavWorkspaces } from "@/components/nav-workspaces";
import Logo from "@/components/logo";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

import { baseUrl } from "@/configs/site";

const data = {
	navMain: [
		{
			title: "Home",
			url: `${baseUrl}/`,
			icon: Home,
		},
		{
			title: "Profile",
			url: `${baseUrl}/profile`,
			icon: User,
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
		},
		{
			name: "Dating & Matching App for University Students",
			url: "https://soulsync-fe.pages.dev",
			emoji: "💌",
		},

		{
			name: "CodeFest 2025 Landing Page",
			url: "https://codefest2025.jsclub.dev",
			emoji: "🧑‍💻",
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

export function SidebarLeft({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar className="border-r-0" {...props} collapsible="icon">
			<SidebarHeader>
				<Logo />
				<NavMain items={data.navMain} />
			</SidebarHeader>
			<SidebarContent>
				<NavProjects projects={data.projects} />
				<NavWorkspaces workspaces={data.workspaces} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
