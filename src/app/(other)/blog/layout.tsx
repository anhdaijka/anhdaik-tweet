import BlogHeader from "@/layouts/blog/header";
import React from "react";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="p-4 min-h-screen w-full">
			<BlogHeader />
			{children}
		</div>
	);
};

export default BlogLayout;
