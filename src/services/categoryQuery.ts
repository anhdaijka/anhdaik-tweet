import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function getCategories() {
	const { data, error } = await supabase.from("categories").select("*");
	if (error) {
		return { error: error.message };
	} else {
		return data;
	}
}

export async function getCategoryBySlug(slug: string) {
	const { data, error } = await supabase
		.from("categories")
		.select("*")
		.eq("slug", slug)
		.single();
	if (error) {
		return { error: error.message };
	} else {
		return data;
	}
}

export async function createCategory(name: string, slug: string) {
	if (slug) slug = slug.toLowerCase().replace(/\s+/g, "-");
	const { data, error } = await supabase
		.from("categories")
		.insert([{ name, slug }])
		.select();
	if (error) {
		return { error: error.message };
	} else {
		return data;
	}
}
export async function updateCategory(id: string, name: string, slug: string) {
	if (!slug) slug = name.toLowerCase().replace(/\s+/g, "-");
	const { data, error } = await supabase
		.from("categories")
		.update({ name, slug })
		.eq("id", id)
		.select();
	if (error) {
		return { error: error.message };
	} else {
		return data;
	}
}

export async function deleteCategory(id: string) {
	const { error } = await supabase.from("categories").delete().eq("id", id);
	if (error) {
		return { error: error.message };
	} else {
		return { message: "Category deleted successfully" };
	}
}
