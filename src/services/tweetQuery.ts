import { createClient } from "@/utils/supabase/client";
import { Database, Tables } from "../../database.types";
import { Tweets, TweetsQuery } from "@/types";
import { postMedia } from "./mediaQuery";

const supabase = createClient();
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

	if (images.length > 0) {
		const media = await Promise.all(images.map((image) => postMedia(image)));
		data.images = media
			.map((image) => image.data?.path)
			.filter((path): path is string => typeof path === "string");
		data.images = await Promise.all(
			data.images.map(async (image: string): Promise<string> => {
				const { data: imagePath } = supabase.storage
					.from("media")
					.getPublicUrl(image);
				return imagePath.publicUrl;
			})
		);
	}

	const { error } = await supabase.from("tweets").insert({
		content: data.content,
		tag: data.tag,
		images: data.images,
	});
	if (error) {
		return { error: error.message };
	} else {
		return { message: "Tweet posted successfully" };
	}
}

export async function getTweets() {
	const { data, error } = await supabase
		.from("tweets")
		.select("*")
		.order("created_at", { ascending: false });
	if (error) {
		return { error: error.message };
	} else {
		return data;
	}
}

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
	const { error } = await supabase.from("tweets").update(data).eq("id", id);
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
