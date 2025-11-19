import { createClient } from "@/utils/supabase/client";
import { Database, Tables } from "../../database.types";
import { Tweets, TweetsQuery } from "@/types";
import { postMedia } from "./mediaQuery";
import { QueryFunctionContext } from "@tanstack/react-query";
import { de } from "zod/v4/locales";
type TweetsQueryKey = readonly [string, { tag: boolean }];
type TweetsQueryContext = QueryFunctionContext<TweetsQueryKey, number>;
const supabase = createClient();

const POSTS_PER_PAGE = 5; // Số lượng tweet mỗi lần tải
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
//Tweets Functions
export async function postTweet({
	content,
	tag,
	images,
}: {
	content: string;
	tag: boolean;
	images: File[];
}) {
	const data: Tweets = { content, tag, images };
	const { data: user } = await supabase.auth.getUser();
	const isAdmin = user?.user?.email === "tenzovn@gmail.com";
	if (!isAdmin) {
		return { error: "You are not allowed to post tweets" };
	}
	const media = await Promise.all(images.map((image) => postMedia(image)));
	data.images = media
		.map(
			(image: { data?: { path?: string } | null; error?: Error | null }) =>
				image.data?.path
		)
		.filter(
			(path: string | undefined): path is string => typeof path === "string"
		);
	data.images = await Promise.all(
		data.images.map(async (image: string): Promise<string> => {
			const { data: imagePath } = supabase.storage
				.from("media")
				.getPublicUrl(image);
			return imagePath.publicUrl;
		})
	);

	const { error } = await supabase.from("tweets").insert({
		content: data.content,
		tag: data.tag,
		images: data.images,
		author_id: user?.user?.id,
	});
	if (error) {
		return { error: error.message };
	} else {
		return { message: "Tweet posted successfully" };
	}
}

export const getTweets = async ({
	pageParam = 0, 
	queryKey,
}: TweetsQueryContext) => {

	const [, { tag }] = queryKey;

	// Tính toán phạm vi (range) để lấy dữ liệu từ Supabase
	const from = pageParam * POSTS_PER_PAGE;
	const to = from + POSTS_PER_PAGE - 1;

	if (pageParam > 0) {
		await sleep(1000); // Delay 1 giây (1000ms)
	}

	const { data, error } = await supabase
		.from("tweets") 
		.select("*")
		.eq("tag", tag) 
		.order("created_at", { ascending: false })
		.range(from, to); 

	if (error) {
		throw new Error(error.message);
	}

	return {
		data: data || [],
		nextPage: data && data.length === POSTS_PER_PAGE ? pageParam + 1 : null,
	};
};

export async function deleteTweet(id: Tables<"tweets">["id"]) {

	const { error } = await supabase.from("tweets").delete().eq("id", id);
	if (error) {
		return { error: error.message };
	} else {
		return { message: "Tweet deleted successfully" };
	}
}

export async function updateTweet(
	id: Tables<"tweets">["id"],
	data: Tables<"tweets">
) {
	const { created_at, ...updateData } = data; // Xóa trường created_at khỏi dữ liệu cập nhật
	const { error } = await supabase.from("tweets").update(updateData).eq("id", id);
	if (error) {
		return { error: error.message };
	} else {
		return { message: "Tweet updated successfully" };
	}
}

export async function getTweet(id: Tables<"tweets">["id"]) {
	const { data, error } = await supabase
		.from("tweets")
		.select("*")
		.eq("id", id);
	if (error) {
		return { error: error.message };
	} else {
		return data;
	}
}
