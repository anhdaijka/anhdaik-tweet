import { baseUrl } from "@/configs/site";
import { NotionPost } from "@/types";
import notion from "@/utils/notion/client";
import { QueryFunctionContext } from "@tanstack/react-query";

export type PostsCursor = string | null;
export const POST_PER_PAGE = 3;

export interface PostPage {
	posts: NotionPost[];
	nextCursor: string | null;
	hasMore: boolean;
}


export const fetchPosts = async ({
	pageParam = null,
	queryKey,
	signal,
	meta,
}: QueryFunctionContext<
	["infinitePosts"] | ["featuredPosts"],
	PostsCursor
>): Promise<PostPage> => {
	const cursorQuery = pageParam ? `&cursor=${pageParam}` : "";
	const key = queryKey[0];
	const featuredFilter = key === "featuredPosts" ? "&featured=true" : "";
	const res = await fetch(
		`${baseUrl}/api/posts?${cursorQuery}${featuredFilter}`, 
		{ signal }
	);

	if (!res.ok) {
		throw new Error("Failed to fetch posts");
	}
	return res.json();
};

function getToday(datestring: string) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	let date = new Date();

	if (datestring) {
		date = new Date(datestring);
	}

	const day = date.getDate();
	const month = months[date.getMonth()];
	const year = date.getFullYear();
	const today = `${month} ${day}, ${year}`;

	return today;
}

export const getAllPosts = async () => {
	const posts = await fetch(`${baseUrl}/api/posts`);
	if (!posts.ok) {
		throw new Error("Failed to fetch posts");
	}
	return posts.json() as Promise<NotionPost[]>;
};


export const mapPostContent = (post: any): NotionPost => ({
	title: (post.properties.Title as any)?.title?.[0]?.plain_text ?? "",
	slug: (post.properties.Slug as any)?.rich_text?.[0]?.plain_text ?? "",
	image: (post.properties.Image as any)?.files?.[0]?.file?.url ?? null,
	date: getToday((post.properties.Date as any)?.date?.start) ?? "",
	author: {
		id: (post.properties.Author as any)?.people?.[0]?.id ?? "",
		name:
			(post.properties.Author as any)?.people?.[0]?.name ?? "Unknown Author",
		avatar: (post.properties.Author as any)?.people?.[0]?.avatar_url ?? null,
	},
	// content: (post.properties.Content as any)?.rich_text?.[0]?.plain_text ?? null,
	summary: (post.properties.Summary as any)?.rich_text?.[0]?.plain_text ?? "",
	tags:
		(post.properties.Tags as any)?.multi_select?.map(
			(tag: { name: string }) => tag.name
		) ?? [],
	featured: (post.properties.Featured as any)?.checkbox ?? false,
});
