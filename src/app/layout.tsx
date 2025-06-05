import type { Metadata } from "next";
import { sourceSans } from "@/configs/fonts";
import "./globals.css";
import { siteConfig } from "@/configs/site";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import MobileNav from "@/components/mobile-nav";
import { MusicPlayer } from "@/components/music-player";

export const metadata: Metadata = {
	title: siteConfig.name,
	description: siteConfig.description,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${sourceSans.className} antialiased bg-background`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<SidebarProvider>
						<SidebarLeft />
						<SidebarInset>{children}</SidebarInset>
						<SidebarRight />
					</SidebarProvider>
					<MobileNav />
					<MusicPlayer inner={false} />
				</ThemeProvider>
			</body>
		</html>
	);
}
