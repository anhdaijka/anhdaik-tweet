"use client";

import * as React from "react";
import {
	Settings2,
	ToggleRight,
	Trash2,
	Sun,
	Moon,
	AppWindow,
	LogIn,
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
	SidebarMenu,
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

import { data } from "@/lib/data";
import { NavUser } from "./nav-user";
import { useTheme } from "next-themes";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import Link from "next/link";
import { baseUrl } from "@/configs/site";
import { useAuth } from "@/hooks/use-auth";
import { User } from "@supabase/supabase-js";
type Checked = DropdownMenuCheckboxItemProps["checked"];
export function SidebarLeft({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const { isMobile, toggleSidebar, state } = useSidebar();
	const { theme, setTheme } = useTheme();
	const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
	const { user, signOut } = useAuth();

	React.useEffect(() => {
		console.log("User has changed");
	}, [user]);

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
				{user ? (
					<NavUser user={user} signOut={signOut} />
				) : (
					<SidebarMenuButton asChild>
						<Link href={`${baseUrl}/auth/login`}>
							<LogIn />
							Login
						</Link>
					</SidebarMenuButton>
				)}
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
