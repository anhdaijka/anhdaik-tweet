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
				className={`${sourceSans.className} antialiased bg-background`}
				data-registry="plate"
			>
				<AuthProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<SidebarProvider>
							<Toaster />
							<SidebarLeft />
							<SidebarInset>{children}</SidebarInset>
							<SidebarRight />
							<Music />
						</SidebarProvider>
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
