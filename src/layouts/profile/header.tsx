"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../../components/ui/button";
import { cn } from "@/lib/utils";
import { baseUrl } from "@/configs/site";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { motion } from "motion/react";
import { fromTop } from "@/lib/animation";

const Header = () => {
	const { isMobile } = useSidebar();
	return (
		<motion.header
			variants={fromTop}
			initial="hidden"
			animate="visible"
			transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
			className="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2 z-10"
		>
			<div className="flex flex-1 items-center gap-8 px-3">
				<Link
					href={`${baseUrl}/blog`}
					className={cn(
						buttonVariants({ variant: "ghost", size: "icon" }),
						"rounded-full"
					)}
				>
					<ArrowLeft className="size-5" />
				</Link>
				<div className="flex flex-col item">
					<h1 className="text-2xl font-semibold">Phùng Quang Anh</h1>
					<span className="text-secondary-foreground text-sm">0 posts</span>
				</div>
				{isMobile && (
					<div className="ml-auto">
						<SidebarTrigger />
					</div>
				)}
			</div>
		</motion.header>
	);
};

export default Header;
