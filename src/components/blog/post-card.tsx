import { BlogPost } from "@/types";
import { motion } from "motion/react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock } from "lucide-react";
const PostCard: React.FC<{
	post: BlogPost;
	onSelect: (post: BlogPost) => void;
}> = ({ post, onSelect }) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		whileHover={{ y: -4 }}
		transition={{ duration: 0.2 }}
	>
		<Card
			className="h-full cursor-pointer group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-border"
			onClick={() => onSelect(post)}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onSelect(post);
				}
			}}
		>
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between mb-2">
					<div className="flex flex-wrap gap-2">
						{post.tags.slice(0, 2).map((tag) => (
							<Badge key={tag} variant="secondary" className="text-xs">
								{tag}
							</Badge>
						))}
						{post.featured && <Badge className="text-xs">Featured</Badge>}
					</div>
				</div>

				<h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
					{post.title}
				</h3>
			</CardHeader>

			<CardContent className="pt-0">
				<p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
					{post.excerpt}
				</p>

				<div className="flex items-center justify-between text-sm text-muted-foreground">
					<div className="flex items-center space-x-4">
						<div className="flex items-center">
							<Calendar className="h-4 w-4 mr-1" />
							{new Date(post.publishedAt).toLocaleDateString()}
						</div>
						<div className="flex items-center">
							<Clock className="h-4 w-4 mr-1" />
							{post.readTime} min read
						</div>
					</div>

					<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
				</div>
			</CardContent>
		</Card>
	</motion.div>
);

export default PostCard;
