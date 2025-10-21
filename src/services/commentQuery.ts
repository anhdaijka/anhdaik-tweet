import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function getCommentsByPostId(postId: string) {
	const { data, error } = await supabase
		.from("comments")
		.select("*")
		.eq("post_id", postId)
		.order("created_at", { ascending: true });
	if (error) {
		console.error("Error fetching comments by post ID:", error);
		return [];
	}
	return data || [];
}

export async function addCommentToPost(
	postId: string,
	author: string,
	content: string
) {
	const { data, error } = await supabase
		.from("comments")
		.insert([{ post_id: postId, author, content }])
		.select();
	if (error) {
		console.error("Error adding comment to post:", error);
		return null;
	}
	return data || null;
}

export async function deleteComment(commentId: string) {
	const { error } = await supabase
		.from("comments")
		.delete()
		.eq("id", commentId);
	if (error) {
		console.error("Error deleting comment:", error);
		return null;
	}
	return { message: "Comment deleted successfully" };
}
