"use client";

import EmptyState from "@/components/blog/empty-state";
import LoadingSkeleton from "@/components/blog/loading-skeleton";
import PostCard from "@/components/blog/post-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogPost } from "@/types";
import { ChevronLeft, ChevronRight, Search, Tag } from "lucide-react";
import { useEffect, useState } from "react";

const BlogGrid: React.FC<{
	posts: BlogPost[];
	onPostSelect: (post: BlogPost) => void;
	loading: boolean;
}> = ({ posts, onPostSelect, loading }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedTag, setSelectedTag] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 6;

	const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

	const filteredPosts = posts.filter((post) => {
		const matchesSearch =
			post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesTag = !selectedTag || post.tags.includes(selectedTag);
		return matchesSearch && matchesTag;
	});

	const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
	const startIndex = (currentPage - 1) * postsPerPage;
	const paginatedPosts = filteredPosts.slice(
		startIndex,
		startIndex + postsPerPage
	);

	// Reset to first page when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, selectedTag]);

	if (loading) {
		return <LoadingSkeleton />;
	}

	return (
		<div className="space-y-8">
			{/* Search and Filters */}
			<div className="space-y-4">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search posts..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-10"
						aria-label="Search posts"
					/>
				</div>

				<div className="flex flex-wrap gap-2">
					<Button
						variant={selectedTag === null ? "default" : "outline"}
						size="sm"
						onClick={() => setSelectedTag(null)}
					>
						All ({posts.length})
					</Button>
					{allTags.map((tag) => {
						const tagCount = posts.filter((post) =>
							post.tags.includes(tag)
						).length;
						return (
							<Button
								key={tag}
								variant={selectedTag === tag ? "default" : "outline"}
								size="sm"
								onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
							>
								<Tag className="h-3 w-3 mr-1" />
								{tag} ({tagCount})
							</Button>
						);
					})}
				</div>
			</div>

			{/* Posts Grid */}
			{filteredPosts.length === 0 ? (
				<EmptyState />
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{paginatedPosts.map((post) => (
							<PostCard key={post.id} post={post} onSelect={onPostSelect} />
						))}
					</div>

					{/* Pagination */}
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
		</div>
	);
};

export default BlogGrid;
