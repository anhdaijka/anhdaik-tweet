import type { Metadata } from "next";
import { sourceSans } from "@/configs/fonts";
import "./globals.css";
import { siteConfig } from "@/configs/site";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

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
						<SidebarInset>
							<Header />
							{children}
						</SidebarInset>
						<SidebarRight />
					</SidebarProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
