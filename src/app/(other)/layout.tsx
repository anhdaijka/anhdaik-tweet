"use client";
import React from "react";
import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
const Layout = ({ children }: { children: React.ReactNode }) => {
	const { user } = useAuth();
	if (!user) {
		toast.warning("You need to sign in to access this page", {
			position: "top-center",
		});
		redirect("/auth/login");
	}
	return (
		<>
			<SidebarProvider>
				<SidebarLeft />
				<SidebarInset>{children}</SidebarInset>
			</SidebarProvider>
		</>
	);
};

export default Layout;
