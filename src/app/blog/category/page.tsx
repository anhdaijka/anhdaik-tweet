"use client";

import { BlogPost } from "@/types";
import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EmptyState from "@/components/blog/empty-state";
import PostCard from "@/components/blog/post-card";
const CategoryPage: React.FC<{
	category: string;
	posts: BlogPost[];
	onPostSelect: (post: BlogPost) => void;
	onBack: () => void;
}> = ({ category, posts, onPostSelect, onBack }) => {
	const categoryPosts = posts.filter((post) => post.category === category);
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 6;

	const totalPages = Math.ceil(categoryPosts.length / postsPerPage);
	const startIndex = (currentPage - 1) * postsPerPage;
	const paginatedPosts = categoryPosts.slice(
		startIndex,
		startIndex + postsPerPage
	);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="max-w-6xl mx-auto"
		>
			<Button
				variant="ghost"
				onClick={onBack}
				className="mb-8 group"
				aria-label="Back to blog"
			>
				<ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
				Back to Blog
			</Button>

			<div className="mb-12">
				<h1 className="text-4xl font-bold mb-4 capitalize">{category}</h1>
				<p className="text-muted-foreground text-lg">
					{categoryPosts.length} {categoryPosts.length === 1 ? "post" : "posts"}{" "}
					in this category
				</p>
			</div>

			{categoryPosts.length === 0 ? (
				<EmptyState />
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{paginatedPosts.map((post) => (
							<PostCard key={post.id} post={post} onSelect={onPostSelect} />
						))}
					</div>

					{totalPages > 1 && (
						<div className="flex justify-center items-center space-x-2 mt-8">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
								disabled={currentPage === 1}
							>
								<ChevronLeft className="h-4 w-4" />
								Previous
							</Button>

							<div className="flex space-x-1">
								{Array.from({ length: totalPages }, (_, i) => i + 1).map(
									(page) => (
										<Button
											key={page}
											variant={currentPage === page ? "default" : "outline"}
											size="sm"
											onClick={() => setCurrentPage(page)}
											className="w-10"
										>
											{page}
										</Button>
									)
								)}
							</div>

							<Button
								variant="outline"
								size="sm"
								onClick={() =>
									setCurrentPage((prev) => Math.min(prev + 1, totalPages))
								}
								disabled={currentPage === totalPages}
							>
								Next
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
					)}
				</>
			)}
		</motion.div>
	);
};

export default CategoryPage;
