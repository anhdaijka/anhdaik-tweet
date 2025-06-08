"use client";
import TabsProfile from "@/layouts/profile/tabs";
import Header from "@/layouts/profile/header";
import Profile from "@/layouts/profile/profile";
import { AnimatePresence } from "motion/react";
import Music from "@/components/music-for-layout";

export default function Page() {
	return (
		<div className="overflow-hidden">
			<Header />
			<Profile />
			<AnimatePresence mode="wait">
				<div className="flex flex-1 flex-col gap-4">
					<TabsProfile />
				</div>
			</AnimatePresence>
		</div>
	);
}
