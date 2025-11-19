import { baseUrl } from "@/configs/site";
import React from "react";
import NotionClientRenderer from "./render";
import Breadcrumbs from "@/layouts/blog/breadcrumbs";
interface PostPageProps {
	params: Promise<{
		slug: string;
	}>;
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
			<Breadcrumbs postTitle={title} postSlug={slug} />
			<header className="fixed hidden md:block top-0 right-0 z-10 py-2 px-3">
				<p className="text-muted-foreground">
					Published by
					<span className="text-primary font-medium"> {author} </span>
					on <span className="text-pretty italic">{date}</span>
				</p>
			</header>
			<NotionClientRenderer recordMap={data.content} image={image} />
		</>
	);
};

export default PostPage;
