import { motion } from "motion/react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/types";

const TrendingSection: React.FC<{
	posts: BlogPost[];
	onPostSelect: (post: BlogPost) => void;
}> = ({ posts, onPostSelect }) => {
	const trendingPosts = posts.sort((a, b) => b.views - a.views).slice(0, 3);

	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold mb-4">Trending Posts</h2>
					<p className="text-muted-foreground text-lg">
						Most viewed articles this month
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{trendingPosts.map((post, index) => (
						<motion.div
							key={post.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							<Card
								className="h-full cursor-pointer group hover:shadow-lg transition-all duration-300"
								onClick={() => onPostSelect(post)}
							>
								<CardHeader>
									<div className="flex items-center justify-between mb-2">
										<Badge variant="secondary" className="text-xs">
											{post.views.toLocaleString()} views
										</Badge>
										<div className="text-2xl font-bold text-muted-foreground">
											#{index + 1}
										</div>
									</div>
									<h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
										{post.title}
									</h3>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground text-sm line-clamp-2 mb-3">
										{post.excerpt}
									</p>
									<div className="flex items-center justify-between text-xs text-muted-foreground">
										<span>{post.readTime} min read</span>
										<span>{post.category}</span>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TrendingSection;
