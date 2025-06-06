"use client";

import { type LucideIcon } from "lucide-react";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { baseUrl } from "@/configs/site";
import Link from "next/link";

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
	const path = usePathname();

	const isActived = (url: string) => {
		return `${baseUrl}${path}` === url;
	};

	return (
		<SidebarMenu>
			{items.map((item) => (
				<SidebarMenuItem key={item.title}>
					<SidebarMenuButton asChild isActive={isActived(item.url)}>
						<Link href={item.url}>
							<item.icon />
							<span>{item.title}</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}
