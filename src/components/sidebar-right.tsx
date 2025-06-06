import * as React from "react";

import { NavUser } from "@/components/nav-user";
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
import { admin } from "@/lib/data";

import { MusicPlayer } from "./music-player";

export function SidebarRight({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar
			collapsible="none"
			className="sticky top-0 hidden h-svh border-l lg:flex overflow-hidden"
			{...props}
			style={
				{
					"--sidebar-width": "calc(16rem + 8%)",
				} as React.CSSProperties
			}
		>
			<SidebarHeader className="border-sidebar-border h-16 border-b">
				{admin && <NavUser user={admin} />}
			</SidebarHeader>
			<SidebarContent className="py-4 items-center overflow-hidden">
				<div className="w-full">
					<h3 className="font-semibold text-card-foreground mb-2 px-4 text-2xl">
						What I&apos;m
					</h3>
					{admin.interests.map((interest, index) => (
						<div
							key={index}
							className="rounded cursor-pointer w-full hover:bg-card px-4 py-2"
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
						</div>
					))}
				</div>

				<SidebarSeparator className="my-2" />
			</SidebarContent>
			<SidebarFooter>
				<MusicPlayer />
			</SidebarFooter>
		</Sidebar>
	);
}
