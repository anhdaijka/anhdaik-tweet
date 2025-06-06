import React from "react";
import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
const Layout = async ({ children }: { children: React.ReactNode }) => {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
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
