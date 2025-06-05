"use client";

import * as React from "react";

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

import { data } from "@/lib/data";

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
