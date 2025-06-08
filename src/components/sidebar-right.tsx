"use client";

import * as React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarSeparator,
} from "@/components/ui/sidebar";
import { admin, data } from "@/lib/data";
import { motion } from "motion/react";
import Link from "next/link";
import Searchbar from "./ui/search-bar";
import { Calendar } from "lucide-react";
import { Calendars } from "./calendars";
import { usePathname } from "next/navigation";
import { slideRight } from "@/lib/animation";
import { cn } from "@/lib/utils";

const calendars = [
	{
		name: "Status",
		items: ["Single", "Mad", "Can over her"],
	},
];
export function SidebarRight({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const path = usePathname();
	const isNotNeeded =
		path.startsWith("/blog") || path.startsWith("/auth") || path === "/contact";
	return (
		<motion.div
			variants={slideRight}
			initial="hidden"
			whileInView={!isNotNeeded ? "visible" : "hidden"}
			exit="hidden"
			transition={{ duration: 0.3, ease: "easeInOut" }}
			style={
				{
					"--sidebar-width": "16rem",
				} as React.CSSProperties
			}
		>
			<Sidebar
				collapsible="none"
				className={cn(
					"sticky top-0 hidden h-svh border-l overflow-hidden",
					!isNotNeeded && "lg:flex"
				)}
				{...props}
			>
				<SidebarHeader className="border-sidebar-border border-b">
					<Searchbar />
				</SidebarHeader>
				<SidebarContent className="py-8 items-center overflow-hidden">
					<div className="w-full">
						<h3 className="font-semibold text-card-foreground mb-2 px-4 text-2xl">
							What I&apos;m
						</h3>
						{admin.interests.map((interest, index) => (
							<div
								key={index}
								className="rounded cursor-pointer w-full hover:bg-accent px-4 py-2"
							>
								<Link
									href={`https://www.youtube.com/results?search_query=${interest}`}
									target="_blank"
								>
									<div className="text-card-foreground/60 text-sm">
										Interested in
									</div>
									<div className="font-semibold text-card-foreground">
										{interest}
									</div>
									<div className="text-card-foreground/60 text-sm">
										{Math.floor(Math.random() * 1000)} posts
									</div>
								</Link>
							</div>
						))}
					</div>

					<SidebarSeparator className="my-2" />
					<Calendars calendars={calendars} />
				</SidebarContent>
				<SidebarFooter></SidebarFooter>
			</Sidebar>
		</motion.div>
	);
}
