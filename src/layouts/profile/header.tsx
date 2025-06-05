import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../../components/ui/button";
import { cn } from "@/lib/utils";
import { baseUrl } from "@/configs/site";

const Header = () => {
	return (
		<header className="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2 z-10">
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
			</div>
		</header>
	);
};

export default Header;
