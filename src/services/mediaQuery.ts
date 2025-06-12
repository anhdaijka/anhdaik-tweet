import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function postMedia(file: File) {
	const { data, error } = await supabase.storage
		.from("media")
		.upload(`images/${Date.now()}-${file.name}`, file, {
			cacheControl: "3600",
			upsert: false,
		});

	return { data, error };
}
