"use client";
import { useModeAnimation } from "react-theme-switch-animation";
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
	Music4,
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
import { motion } from "motion/react";
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
import { usePathname } from "next/navigation";
import { slideLeft } from "@/lib/animation";
type Checked = DropdownMenuCheckboxItemProps["checked"];
export function SidebarLeft({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const { isMobile, toggleSidebar, state, toggleMusic } = useSidebar();
	const { theme, setTheme } = useTheme();
	const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
	const { user, signOut } = useAuth();
	const path = usePathname();
	const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation();

	const isNeed =
		path.startsWith("/tweets") ||
		path.startsWith("/auth") ||
		path === "/contact";
	React.useEffect(() => {
		console.log("User has changed");
	}, [user]);

	return (
		<Sidebar
			className="border-r-0"
			{...props}
			collapsible="icon"
			side={isMobile ? "right" : "left"}
		>
			<SidebarHeader>
				<Logo />
				<NavMain items={data.navMain} />
			</SidebarHeader>
			<SidebarContent>
				<motion.div
					variants={slideLeft}
					initial="hidden"
					animate="visible"
					exit="hidden"
					transition={{ duration: 0.3, ease: "easeInOut" }}
				>
					{!isNeed && (
						<>
							<NavProjects projects={data.projects} />
							<NavWorkspaces title="Workspaces" workspaces={data.workspaces} />
						</>
					)}
				</motion.div>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenuButton onClick={toggleMusic}>
					<Music4 className="size-5 text-primary" />
					Toggle Music Player
				</SidebarMenuButton>
				{state === "collapsed" && (
					<SidebarMenuButton onClick={toggleSidebar}>
						<AppWindow /> Toggle Sidebar
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
							<DropdownMenuItem
								onClick={() => {
									setShowStatusBar(!showStatusBar);
									toggleSwitchTheme();
								}}
							>
								<ToggleRight className="text-muted-foreground" />
								<span ref={ref}>Change Theme</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuCheckboxItem
								disabled
								checked={!isDarkMode}
								onCheckedChange={setShowStatusBar}
								onClick={() => setTheme("light")}
							>
								<span>Light</span>
								<Sun className="text-muted-foreground" />
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem
								disabled
								checked={isDarkMode}
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
			{/* <SidebarRail /> */}
		</Sidebar>
	);
}
