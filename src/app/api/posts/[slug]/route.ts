import { mapPostContent } from "@/services/postQuery";
import notion from "@/utils/notion/client";
import notionClient from "@/utils/notion/notion";
import { NextResponse } from "next/server";

type PostSlug = {
	params: Promise<{
		slug: string;
	}>;
};

async function getPageIdBySlug(pageId: string) {
	const res = await notionClient.getPage(pageId);
	return res;
}

export async function GET(req: Request, { params }: PostSlug) {
	const { slug } = await params;
	let pageId;
	try {
		const res = await notion.dataSources.query({
			data_source_id:
				(process.env.NEXT_PUBLIC_NOTION_BLOG_INDEX_ID as string) || "",
			filter: {
				property: "Slug",
				rich_text: {
					equals: slug,
				},
			},
		});
		pageId = res.results[0].id.replace(/-/g, "");
		const post = mapPostContent(res.results[0]);
		return NextResponse.json({
			post,
			pageId: pageId,
			content: await getPageIdBySlug(pageId),
		});
	} catch (error) {
		return NextResponse.json({ error: "Post not found" }, { status: 500 });
	}
}
