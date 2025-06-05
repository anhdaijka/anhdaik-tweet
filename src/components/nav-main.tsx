"use client";

import { type LucideIcon } from "lucide-react";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
	useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
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
	const { open } = useSidebar();
	const isActived = (url: string) => {
		return `${baseUrl}${path}` === url;
	};
	useEffect(() => {
		console.log(path);
	}, [path]);
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton disabled className={`${open ? "block" : "hidden"}`}>
					😎 Welcome to AnhDaiK&#39;s Blog
				</SidebarMenuButton>
			</SidebarMenuItem>
			<SidebarSeparator className={`${open ? "block" : "hidden"} my-2`} />
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
