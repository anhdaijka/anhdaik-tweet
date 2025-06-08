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
