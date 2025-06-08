import type { Metadata } from "next";
import "@/app/globals.css";
import { siteConfig } from "@/configs/site";
import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";

import { SidebarInset } from "@/components/ui/sidebar";

export const metadata: Metadata = {
	title: siteConfig.name,
	description: siteConfig.description,
};

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<SidebarLeft />
			<SidebarInset>{children}</SidebarInset>
			<SidebarRight />
		</>
	);
}
