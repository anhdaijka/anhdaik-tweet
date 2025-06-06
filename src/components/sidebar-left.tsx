"use client";

import * as React from "react";
import {
	Settings2,
	ToggleRight,
	Trash2,
	Sun,
	Moon,
	AppWindow,
	type LucideIcon,
} from "lucide-react";
import { NavProjects } from "@/components/nav-projects";
import { NavMain } from "@/components/nav-main";
import { NavWorkspaces } from "@/components/nav-workspaces";
import Logo from "@/components/logo";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarTrigger,
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

import { admin, data } from "@/lib/data";
import { NavUser } from "./nav-user";
import { useTheme } from "next-themes";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
type Checked = DropdownMenuCheckboxItemProps["checked"];
export function SidebarLeft({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const { isMobile, toggleSidebar, state } = useSidebar();
	const { theme, setTheme } = useTheme();
	const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
	return (
		<Sidebar className="border-r-0" {...props} collapsible="icon">
			<SidebarHeader>
				<Logo />
				<NavMain items={data.navMain} />
			</SidebarHeader>
			<SidebarContent>
				<NavProjects projects={data.projects} />
				<NavWorkspaces title="Workspaces" workspaces={data.workspaces} />
			</SidebarContent>
			<SidebarFooter>
				{state === "collapsed" && (
					<SidebarMenuButton onClick={toggleSidebar}>
						<AppWindow />
					</SidebarMenuButton>
				)}
				<SidebarMenuButton asChild>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton>
								<Settings2 /> Settings
							</SidebarMenuButton>
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
							<DropdownMenuItem onClick={toggleSidebar}>
								<AppWindow className="text-muted-foreground" />
								<span>Toggle Sidebar</span>
							</DropdownMenuItem>
							<DropdownMenuItem disabled>
								<Trash2 className="text-muted-foreground" />
								<span>Clear Local Storage</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuButton>
				{admin && <NavUser user={admin} />}
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
