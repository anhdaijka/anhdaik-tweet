"use client";

import { Pen, User, Bell, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { baseUrl } from "@/configs/site";
export default function MobileNav() {
	const pathname = usePathname();

	const navItems = [
		{ icon: User, label: "Profile", href: `${baseUrl}/` },
		{ icon: Pen, label: "Blog", href: `${baseUrl}/blog` },
		{ icon: Bell, label: "Notification", href: "#" },
		{ icon: Mail, label: "Contact", href: `${baseUrl}/contact` },
	];

	const { theme, setTheme } = useTheme();

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border lg:hidden z-50">
			<div className="flex justify-around items-center">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.label}
							href={item.href}
							className={`flex flex-col items-center justify-center py-3 flex-1 ${
								isActive ? "text-primary" : "text-foreground"
							}`}
						>
							<item.icon className="w-6 h-6" />
							<span className="text-xs mt-1">{item.label}</span>
						</Link>
					);
				})}
				<div className="flex flex-col items-center justify-center py-3 flex-1">
					{theme === "dark" ? (
						<Sun className="w-6 h-6" onClick={() => setTheme("light")} />
					) : (
						<Moon className="w-6 h-6" onClick={() => setTheme("dark")} />
					)}
					<span className="text-xs mt-1">Theme</span>
				</div>
			</div>
		</div>
	);
}
