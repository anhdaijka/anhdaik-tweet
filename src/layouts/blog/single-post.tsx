"use client";
import { BlogPost } from "@/types";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Mail, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ShareButtons from "@/components/blog/share-button";
import { Separator } from "@/components/ui/separator";
import CodeBlock from "@/components/blog/code-block";
import RelatedPosts from "@/layouts/blog/related-posts";
import CommentsSection from "@/layouts/blog/comment-section";
import PostNavigation from "@/components/blog/post-navigation";
import PostShareSection from "@/layouts/blog/post-share";
const SinglePost: React.FC<{
	post: BlogPost;
	posts: BlogPost[];
	onBack: () => void;
	onNavigate: (post: BlogPost) => void;
}> = ({ post, posts, onBack, onNavigate }) => {
	const contentSections = post.content.split("\n\n");

	return (
		<motion.article
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="max-w-4xl mx-auto"
		>
			{/* Back Button */}
			<Button
				variant="ghost"
				onClick={onBack}
				className="mb-8 group"
				aria-label="Back to blog"
			>
				<ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
				Back to Blog
			</Button>

			{/* Post Header */}
			<header className="mb-12">
				<div className="flex flex-wrap gap-2 mb-4">
					{post.tags.map((tag) => (
						<Badge key={tag} variant="secondary">
							{tag}
						</Badge>
					))}
					{post.featured && <Badge>Featured</Badge>}
				</div>

				<h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
					{post.title}
				</h1>

				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
					<div className="flex items-center space-x-4">
						<Avatar>
							<AvatarImage src={post.author.avatar} alt={post.author.name} />
							<AvatarFallback>
								{post.author.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</AvatarFallback>
						</Avatar>
						<div>
							<div className="font-medium">{post.author.name}</div>
							<div className="text-sm text-muted-foreground">
								{new Date(post.publishedAt).toLocaleDateString()} ·{" "}
								{post.readTime} min read
							</div>
						</div>
					</div>

					<ShareButtons post={post} />
				</div>

				<Separator />
			</header>

			{/* Post Content */}
			<div className="prose prose-lg max-w-none mb-12">
				{contentSections.map((section, index) => {
					if (section.startsWith("")) {
						const lines = section.split("\n");
						const language = lines[0].replace("", "") || "javascript";
						const code = lines.slice(1, -1).join("\n");
						return (
							<CodeBlock key={index} language={language}>
								{code}
							</CodeBlock>
						);
					}

					return (
						<p
							key={index}
							className="text-lg leading-relaxed mb-6 text-foreground"
						>
							{section}
						</p>
					);
				})}
			</div>

			{/* Author Bio */}
			<Card className="mb-8">
				<CardContent className="p-6">
					<div className="flex items-start space-x-4">
						<Avatar className="w-16 h-16">
							<AvatarImage src={post.author.avatar} alt={post.author.name} />
							<AvatarFallback>
								{post.author.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<h3 className="font-semibold text-lg mb-2">
								About {post.author.name}
							</h3>
							<p className="text-muted-foreground mb-4">{post.author.bio}</p>
							<div className="flex space-x-2">
								<Button variant="outline" size="sm">
									<User className="h-4 w-4 mr-2" />
									View Profile
								</Button>
								<Button variant="outline" size="sm">
									<Mail className="h-4 w-4 mr-2" />
									Contact
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Post Navigation */}
			<PostNavigation
				currentPost={post}
				posts={posts}
				onNavigate={onNavigate}
			/>

			{/* Share Section */}
			<div className="mt-12">
				<PostShareSection post={post} />
			</div>

			{/* Related Posts */}
			<RelatedPosts
				currentPost={post}
				posts={posts}
				onPostSelect={onNavigate}
			/>

			{/* Comments Section */}
			<div className="mt-12">
				<CommentsSection postId={post.id} />
			</div>
		</motion.article>
	);
};

export default SinglePost;
