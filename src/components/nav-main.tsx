"use client";

import { type LucideIcon } from "lucide-react";
import { Search } from "lucide-react";
import { InputWithButton } from "./ui/input-with-button";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon: LucideIcon;
		isActive?: boolean;
	}[];
}) {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<InputWithButton type="search" placeholder="Search" icon={Search} />
			</SidebarMenuItem>
			{items.map((item) => (
				<SidebarMenuItem key={item.title}>
					<SidebarMenuButton asChild isActive={item.isActive}>
						<a href={item.url}>
							<item.icon />
							<span>{item.title}</span>
						</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}
