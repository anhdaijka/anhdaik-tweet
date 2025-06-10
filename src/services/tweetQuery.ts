import { Tweets } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "../../database.types";

const supabase = createClient();
//Tweets Functions
export async function postTweet(data: Tweets) {
	const user = await supabase.auth.getUser();
	const { error } = await supabase.from("tweets").insert({
		...data,
		author_id: user.data.user?.id,
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

export async function updateTweet(id: Tables<"tweets">["id"], data: Tweets) {
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
