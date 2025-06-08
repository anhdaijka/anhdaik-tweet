"use client";
import TabsProfile from "@/layouts/profile/tabs";
import Header from "@/layouts/profile/header";
import Profile from "@/layouts/profile/profile";
import { AnimatePresence } from "motion/react";

export default function Page() {
	return (
		<AnimatePresence mode="wait">
			<div className="overflow-hidden">
				<Header />
				<Profile />
				<div className="flex flex-1 flex-col gap-4">
					<TabsProfile />
				</div>
			</div>
		</AnimatePresence>
	);
}
