import React from "react";

export const metadata = {
	title: "Categories",
	description: "Blog categories",
};

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
	return <div>{params.slug}</div>;
};

export default CategoryPage;
