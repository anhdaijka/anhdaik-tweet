import type { Metadata } from "next";
import { sourceSans } from "@/configs/fonts";
import "@/app/globals.css";
import { siteConfig } from "@/configs/site";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/use-auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import Music from "@/components/music-for-layout";
import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";
import { SidebarInset } from "@/components/ui/sidebar";
import QueryProvider from "@/components/query-client";
import NewBanner from "@/layouts/banner";

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
			<body
				className={`${sourceSans.className} antialiased bg-background [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-sidebar-primary-foreground [&::-webkit-scrollbar-thumb]:bg-sidebar-primary/80`}
				data-registry="plate"
			>
				<AuthProvider>
					<QueryProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<SidebarProvider>
								<Toaster />
								<SidebarLeft />
								<SidebarInset>
									<NewBanner/>
									{children}
								</SidebarInset>
								{/* <SidebarRight /> */}
								<Music />
							</SidebarProvider>
						</ThemeProvider>
					</QueryProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
