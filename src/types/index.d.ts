import { Tables } from "../../database.types";
import { User as SupabaseUser } from "@supabase/supabase-js";
export interface Track {
	id: string;
	title: string;
	artist: string;
	album?: string;
	duration?: number;
	src: string;
	cover: string;
}

export interface BlogPost {
	id: string;
	title: string;
	excerpt: string;
	content: string;
	author: {
		name: string;
		avatar: string;
		bio: string;
	};
	publishedAt: string;
	readTime: number;
	tags: string[];
	featured: boolean;
	slug: string;
	views: number;
	category: string;
}

export interface Comment {
	id: string;
	author: string;
	content: string;
	publishedAt: string;
	avatar?: string;
}

export interface CodeBlockProps {
	children: string;
	language?: string;
}

export interface Post extends Tables["posts"] {
	likes?: number;
	comments?: number;
	author?: SupabaseUser;
}

export type PostComment = Tables["post_comments"];

export type PostLike = Tables["post_likes"];

export type User = Tables["users"];

export type SupabaseUser = SupabaseUser & User;

export interface Tweets extends Tables["tweets"] {
	likes?: number;
	comments?: number;
}

export type TweetComment = Tables["tweet_comments"];

export type TweetLike = Tables["tweet_likes"];
