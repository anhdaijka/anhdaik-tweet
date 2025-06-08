import { BlogPost } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const RelatedPosts: React.FC<{
	currentPost: BlogPost;
	posts: BlogPost[];
	onPostSelect: (post: BlogPost) => void;
}> = ({ currentPost, posts, onPostSelect }) => {
	const relatedPosts = posts
		.filter(
			(post) =>
				post.id !== currentPost.id &&
				(post.category === currentPost.category ||
					post.tags.some((tag) => currentPost.tags.includes(tag)))
		)
		.slice(0, 3);

	if (relatedPosts.length === 0) return null;

	return (
		<Card className="mt-12">
			<CardHeader>
				<h3 className="text-2xl font-semibold">Related Posts</h3>
				<p className="text-muted-foreground">
					You might also be interested in these articles
				</p>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{relatedPosts.map((post) => (
						<div
							key={post.id}
							className="group cursor-pointer p-4 rounded-lg border hover:shadow-md transition-all"
							onClick={() => onPostSelect(post)}
						>
							<div className="flex flex-wrap gap-1 mb-2">
								{post.tags.slice(0, 2).map((tag) => (
									<Badge key={tag} variant="outline" className="text-xs">
										{tag}
									</Badge>
								))}
							</div>
							<h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2 mb-2">
								{post.title}
							</h4>
							<p className="text-sm text-muted-foreground line-clamp-2 mb-3">
								{post.excerpt}
							</p>
							<div className="flex items-center justify-between text-xs text-muted-foreground">
								<span>{post.readTime} min read</span>
								<span>{post.views.toLocaleString()} views</span>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default RelatedPosts;
