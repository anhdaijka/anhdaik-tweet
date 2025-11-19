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

//Posts handle
export type Post = Tables["posts"] & { author: SupabaseUser };
export type PostQuery = Database["public"]["Tables"]["posts"]["Insert"];

//Comments handle
export type Comment = Tables["comments"] & { author: SupabaseUser };
export type CommentQuery = Database["public"]["Tables"]["comments"]["Insert"];

//Categories handle
export type Category = Tables["categories"];
export type CategoryQuery = Database["public"]["Tables"]["categories"]["Insert"];
