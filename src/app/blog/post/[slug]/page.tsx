import { baseUrl, siteConfig } from "@/configs/site";
import React from "react";
import NotionClientRenderer from "./render";
import Breadcrumbs from "@/layouts/blog/breadcrumbs";
import Footer from "@/layouts/blog/footer";
interface PostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata({ params }: PostPageProps) {
	const { slug } = await params;
	const data = await getPageIdBySlug(slug);
	const title = data?.post ? data.post.title : "Post Not Found";
	const description = data?.post ? data.post.description : "Post Not Found";
	return {
		title: `${siteConfig.name} | `+title,
		description: description,
	};
}

async function getPageIdBySlug(slug: string) {
	const res = await fetch(`${baseUrl}/api/posts/${slug}`);
	return res.json();
}

const PostPage = async ({ params }: PostPageProps) => {
	const { slug } = await params;
	const data = await getPageIdBySlug(slug);
	const title = data?.post ? data.post.title : "Post Not Found";
	const author = data?.post ? data.post.author.name : "Unknown Author";
	const date = data?.post ? data.post.date : "Unknown Date";
	const image = data?.post ? data.post.image : null;

	if (!data) {
		return <div>Post not found</div>;
	}

	return (
		<>
			<Breadcrumbs postTitle={title} postSlug={slug} author={author} date={date} />
			<NotionClientRenderer recordMap={data.content} image={image} />
			<Footer/>
		</>
	);
};

export default PostPage;
