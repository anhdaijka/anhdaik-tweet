import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

export interface BlogCardProps {
	title?: string;
	description?: string;
	image?: string;
	badge?: {
		text: string;
		variant: "pink" | "indigo" | "orange" | "green" | "blue";
	};
	href?: string;
}

export default function BlogCard({
	title = "Modern Design Systems",
	description = "Explore the fundamentals of contemporary UI design",
	image = "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/profile-mjss82WnWBRO86MHHGxvJ2TVZuyrDv.jpeg",
	badge = { text: "New", variant: "orange" },
	href = "#",
}: BlogCardProps) {
	return (
		<Link href={href} className="block w-full max-w-[280px] group">
			<div
				className={cn(
					"relative overflow-hidden rounded-2xl",
					"bg-card/60",
					"backdrop-blur-xl",
					"border border-border",
					"shadow-xs",
					"transition-all duration-300",
					"hover:shadow-md",
					"hover:border-accent"
				)}
			>
				<div className="relative h-[320px] overflow-hidden">
					<Image
						src={image}
						alt={title}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw 
						"
						className="object-cover group-hover:scale-110 transition-all duration-500 ease-in-out "
					/>
				</div>

				<div
					className={cn(
						"absolute inset-0",
						"bg-linear-to-t from-black/90 via-black/40 to-transparent"
					)}
				/>

				<div className="absolute top-3 right-3 group/badge transition-all">
					<Badge
						variant="secondary"
						className={cn(
							"shadow-xs backdrop-blur-md px-2.5 py-1 text-xs font-medium overflow-hidden whitespace-nowrap text-ellipsis",
							badge.variant === "orange" && "bg-orange-600 text-orange-50",
							badge.variant === "pink" && "bg-pink-600 text-pink-50",
							badge.variant === "indigo" && "bg-indigo-600 text-indigo-50",
							badge.variant === "green" && "bg-green-600 text-green-50",
							badge.variant === "blue" && "bg-blue-600 text-blue-50"
						)}
					>
						<span className="group-hover/badge:scale-105 transition-all">
							{badge.text}
						</span>
					</Badge>
				</div>

				<div className="absolute bottom-0 left-0 right-0 p-5">
					<div className="flex items-center justify-between gap-3">
						<div className="space-y-1.5">
							<h3 className="text-lg group-hover:translate-y-7 transition-all duration-500 ease-in-out font-semibold text-white dark:text-zinc-100 leading-snug tracking-tighter">
								{title}
							</h3>
							<p className="text-sm group-hover:-translate-y-7 transition-all duration-500 ease-in-out text-zinc-200 dark:text-zinc-300 line-clamp-2 tracking-tight">
								{description}
							</p>
						</div>
						<div
							className={cn(
								"p-2 rounded-full",
								"bg-white/10 dark:bg-zinc-800/50",
								"backdrop-blur-md",
								"group-hover:bg-white/20 dark:group-hover:bg-zinc-700/50",
								"transition-colors duration-300 group group-hover:scale-110"
							)}
						>
							<ArrowUpRight className="w-4 h-4 text-white group-hover:-rotate-12 transition-transform duration-300" />
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
