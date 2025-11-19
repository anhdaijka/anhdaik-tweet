import {
	getAllPosts,
	mapPostContent,
	POST_PER_PAGE,
} from "@/services/postQuery";
import notion from "@/utils/notion/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const startCursor = searchParams.get("cursor");


	const isFeaturedFilter = searchParams.get("featured") === "true";

	let notionFilter = undefined;
	if (isFeaturedFilter) {
		notionFilter = {
			property: "Featured",
			checkbox: {
				equals: true,
			},
		};
	}
	try {
		const response = await notion.dataSources.query({
			data_source_id: process.env.NEXT_PUBLIC_NOTION_BLOG_INDEX_ID || "",
			sorts: [
				{
					property: "Date",
					direction: "descending",
				},
			],
			page_size: POST_PER_PAGE,
			start_cursor: startCursor || undefined,
			filter: notionFilter,
		});

		const posts = response.results.map(mapPostContent);

		return NextResponse.json({
			posts,
			nextCursor: response.next_cursor,
			hasMore: response.has_more,
		});
	} catch (error) {
		console.error("Notion API Error:", error);
		return NextResponse.json(
			{ posts: [], nextCursor: null, hasMore: false },
			{ status: 500 }
		);
	}
}
