import BlogHeader from "@/layouts/blog/header";
import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
const BlogLayout = async ({ children }: { children: React.ReactNode }) => {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/auth/login");
	}
	return (
		<div className="p-4 min-h-screen w-full">
			<BlogHeader />
			{children}
		</div>
	);
};

export default BlogLayout;
