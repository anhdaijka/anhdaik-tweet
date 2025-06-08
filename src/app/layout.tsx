import type { Metadata } from "next";
import { sourceSans } from "@/configs/fonts";
import "@/app/globals.css";
import { siteConfig } from "@/configs/site";
import { ThemeProvider } from "@/components/theme-provider";
import { SettingsProvider } from "@/components/editor/settings";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/use-auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import Music from "@/components/music-for-layout";

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
							<SettingsProvider>
								{children}

								<Music />
							</SettingsProvider>
						</SidebarProvider>
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
