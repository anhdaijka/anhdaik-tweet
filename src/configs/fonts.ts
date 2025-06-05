import { Geist, Geist_Mono, Source_Sans_3 } from "next/font/google";

export const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});
export const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const sourceSans = Source_Sans_3({
	variable: "--font-source-sans",
	subsets: ["latin"],
});
