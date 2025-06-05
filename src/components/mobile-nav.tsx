"use client";

import { Home, User, Bell, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
	const pathname = usePathname();

	const navItems = [
		{ icon: Home, label: "Home", href: "/" },
		{ icon: User, label: "Profile", href: "/profile" },
		{ icon: Bell, label: "Notification", href: "#" },
		{ icon: Mail, label: "Contact", href: "/contact" },
	];

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
								isActive ? "text-primary" : "text-primary-foreground"
							}`}
						>
							<item.icon className="w-6 h-6" />
							<span className="text-xs mt-1">{item.label}</span>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
