"use client";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import BlogHeader from "@/layouts/blog/header";
import React, { useEffect } from "react";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
	const { user } = useAuth();

	useEffect(() => {
		if (!user) {
			toast.warning("You need to sign in to access this page", {
				position: "top-center",
			});
			redirect("/auth/login");
		}
	}, [user]);

	return (
		<div className="p-4 min-h-screen w-full">
			<BlogHeader />
			{children}
		</div>
	);
};

export default BlogLayout;
