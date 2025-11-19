import { Database, Tables } from "../../database.types";
export interface Track {
	id: string;
	title: string;
	artist: string;
	album?: string;
	duration?: number;
	src: string;
	cover: string;
}

export interface CodeBlockProps {
	children: string;
	language?: string;
}

export type User = Tables["users"];

//Tweets handle
export type Tweets = Tables["tweets"] & { author: SupabaseUser };

export type TweetsQuery = Database["public"]["Tables"]["tweets"]["Insert"];

//Notion post handle
export type NotionPost = {
	title: string;
	slug: string;
	image: string | null;
	date: string;
	author: NotionUser;
	content?: string | null;
	summary: string | null;
	tags: string[] | null;
	featured: boolean;
}

export type NotionUser = {
	id: string;
	name: string;
	avatar: string | null;
}