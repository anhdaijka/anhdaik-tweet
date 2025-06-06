import type { Metadata } from "next";
import { sourceSans } from "@/configs/fonts";
import "@/app/globals.css";
import { siteConfig } from "@/configs/site";
import { ThemeProvider } from "@/components/theme-provider";

import MobileNav from "@/components/mobile-nav";
import { MusicPlayer } from "@/components/music-player";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/use-auth";

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
				<AuthProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<Toaster />
						{children}

						<MobileNav />
						<MusicPlayer inner={false} />
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
