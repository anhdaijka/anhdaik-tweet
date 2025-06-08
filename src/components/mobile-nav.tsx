"use client";

import { Pen, User, Mail, LogIn, LogOut, Music4 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { baseUrl } from "@/configs/site";
import { useAuth } from "@/hooks/use-auth";
export default function MobileNav() {
	const pathname = usePathname();
	const { user, signOut } = useAuth();
	const navItems = [
		{ icon: User, label: "Profile", href: `${baseUrl}/` },
		{ icon: Pen, label: "Blog", href: `${baseUrl}/blog` },
		{ icon: Mail, label: "Contact", href: `${baseUrl}/contact` },
	];

	return (
		<div className="fixed bottom-0 left-0 top-0 bg-background border-t border-border lg:hidden z-50">
			<div className="flex flex-col justify-around items-center w-16">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.label}
							href={item.href}
							className={`flex flex-col items-center justify-center p-4 ${
								isActive ? "text-primary" : "text-foreground"
							}`}
						>
							<Tooltip>
								<TooltipTrigger>
									{" "}
									<item.icon className="w-6 h-6" />
									<span className="text-xs mt-1 sr-only">{item.label}</span>
								</TooltipTrigger>
								<TooltipContent>
									<p>{item.label}</p>
								</TooltipContent>
							</Tooltip>
						</Link>
					);
				})}
				<div className="flex flex-col items-center justify-center p-4">
					<Tooltip>
						<TooltipTrigger>
							<Music4 className="w-6 h-6" />
							<span className="text-xs mt-1 sr-only">Music</span>
						</TooltipTrigger>
						<TooltipContent>
							<p>Music Player</p>
						</TooltipContent>
					</Tooltip>
				</div>
				<div className="flex flex-col items-center justify-center p-4">
					{user ? (
						<div
							className="flex flex-col items-center justify-center"
							onClick={() => signOut()}
						>
							<Tooltip>
								<TooltipTrigger>
									<LogOut className="w-6 h-6" />
									<span className="text-xs mt-1 sr-only">Sign Out</span>
								</TooltipTrigger>
								<TooltipContent>
									<p>Sign Out</p>
								</TooltipContent>
							</Tooltip>
						</div>
					) : (
						<Link
							href={`${baseUrl}/auth/login`}
							className="flex flex-col items-center justify-center p-4"
						>
							<Tooltip>
								<TooltipTrigger>
									<LogIn className="w-6 h-6" />
									<span className="text-xs mt-1 sr-only">Sign In</span>
								</TooltipTrigger>
								<TooltipContent>
									<p>Sign In</p>
								</TooltipContent>
							</Tooltip>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}
