import Footer from "@/layouts/blog/footer";
import Header from "@/layouts/blog/header";
import React from "react";

const BlogLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default BlogLayout;
