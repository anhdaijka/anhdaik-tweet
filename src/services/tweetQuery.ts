import { createClient } from "@/utils/supabase/client";
import { Database, Tables } from "../../database.types";

const supabase = createClient();
//Tweets Functions
export async function postTweet(
	data: Database["public"]["Tables"]["tweets"]["Insert"]
) {
	const { error } = await supabase.from("tweets").insert(data);
	if (error) {
		return { error: error.message };
	} else {
		return { message: "Tweet posted successfully" };
	}
}

export async function getTweets() {
	const { data, error } = await supabase
		.from("tweets")
		.select("*, author:author_id(*)")
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
