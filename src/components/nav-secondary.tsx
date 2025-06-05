import React, { useState } from "react";
import {
	MoreHorizontal,
	ToggleRight,
	Trash2,
	Sun,
	Moon,
	type LucideIcon,
} from "lucide-react";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuAction,
	useSidebar,
} from "@/components/ui/sidebar";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useTheme } from "next-themes";
type Checked = DropdownMenuCheckboxItemProps["checked"];
export function NavSecondary({
	items,
	...props
}: {
	items: {
		title: string;
		url: string;
		icon: LucideIcon;
		badge?: React.ReactNode;
	}[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	const { isMobile } = useSidebar();
	const { theme, setTheme } = useTheme();
	const [showStatusBar, setShowStatusBar] = useState<Checked>(true);

	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<a href={item.url}>
									<item.icon />
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
							{item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
							{item.title === "Settings" && (
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<SidebarMenuAction>
											<MoreHorizontal />
											<span className="sr-only">More</span>
										</SidebarMenuAction>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										className="w-56 rounded-lg"
										side={isMobile ? "bottom" : "right"}
										align={isMobile ? "end" : "start"}
									>
										<DropdownMenuItem disabled>
											<ToggleRight className="text-muted-foreground" />
											<span>Change Theme</span>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuCheckboxItem
											checked={theme === "Light" && showStatusBar}
											onCheckedChange={setShowStatusBar}
											onClick={() => setTheme("Light")}
										>
											<span>Light</span>
											<Sun className="text-muted-foreground" />
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem
											checked={theme === "dark" && showStatusBar}
											onCheckedChange={setShowStatusBar}
											onClick={() => setTheme("dark")}
										>
											<span>Dark</span>
											<Moon className="text-muted-foreground" />
										</DropdownMenuCheckboxItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem disabled>
											<Trash2 className="text-muted-foreground" />
											<span>Clear Local Storage</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							)}
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
