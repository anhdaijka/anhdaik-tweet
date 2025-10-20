import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function getPostsByCategory(category: string) {
	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.eq("category", category)
		.order("created_at", { ascending: false });
	if (error) {
		console.error("Error fetching posts by category:", error);
		return [];
	}
	return data || [];
}

export async function getAllPosts() {
	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.order("created_at", { ascending: false });
	if (error) {
		console.error("Error fetching all posts:", error);
		return [];
	}
	return data || [];
}

export async function searchPosts(query: string) {
	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.ilike("title", `%${query}%`)
		.or(`ilike(content, '%${query}%')`)
		.order("created_at", { ascending: false });
	if (error) {
		console.error("Error searching posts:", error);
		return [];
	}
	return data || [];
}

export async function getPostBySlug(slug: string) {
	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.eq("slug", slug)
		.single();
	if (error) {
		console.error("Error fetching post by ID:", error);
		return null;
	}
	return data || null;
}

export async function getRecentPosts(limit: number = 5) {
	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.order("created_at", { ascending: false })
		.limit(limit);
	if (error) {
		console.error("Error fetching recent posts:", error);
		return [];
	}
	return data || [];
}

export async function getPopularPosts(limit: number = 5) {
	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.order("views", { ascending: false })
		.limit(limit);
	if (error) {
		console.error("Error fetching popular posts:", error);
		return [];
	}
	return data || [];
}

export async function getPostsByAuthor(authorId: string) {
	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.eq("author_id", authorId)
		.order("created_at", { ascending: false });
	if (error) {
		console.error("Error fetching posts by author:", error);
		return [];
	}
	return data || [];
}

export async function getPostsByTag(tag: string) {
	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.contains("tags", [tag])
		.order("created_at", { ascending: false });
	if (error) {
		console.error("Error fetching posts by tag:", error);
		return [];
	}
	return data || [];
}

export async function updatePostBySlug(slug: string, updates: any) {
	const { data, error } = await supabase
		.from("posts")
		.update(updates)
		.eq("slug", slug)
		.single();
	if (error) {
		console.error("Error updating post by slug:", error);
		return null;
	}
	return data || null;
}

export async function createPost(postData: any) {
	const { data, error } = await supabase
		.from("posts")
		.insert([postData])
		.single();
	if (error) {
		console.error("Error creating post:", error);
		return null;
	}
	return data || null;
}

export async function deletePostBySlug(slug: string) {
	const { data, error } = await supabase
		.from("posts")
		.delete()
		.eq("slug", slug)
		.single();
	if (error) {
		console.error("Error deleting post by slug:", error);
		return null;
	}
	return data || null;
}
