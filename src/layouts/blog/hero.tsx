import BlogCard from "@/components/blog-card";
import { mockPosts } from "@/lib/data";
import React from "react";

const Hero = () => {
	return (
		<div className="p-2 flex justify-center items-center relative border rounded-2xl my-4 border-border min-h-[400px] md:p-0">
			<section className="w-full py-12 md:py-16 lg:py-20">
				<div className="container mx-auto px-4 md:px-6">
					<h2 className="mb-2 tracking-tighter text-3xl font-bold  text-left text-foreground sm:text-4xl">
						Featured Collections
					</h2>
					<p className="mb-8 text-lg text-left text-foreground/80 tracking-tight">
						Explore the latest collections for the summer season.
					</p>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
						{mockPosts.map((card, i) => (
							<BlogCard
								key={i}
								{...card}
								badge={{
									...card.badge,
									variant: card.badge.variant as
										| "orange"
										| "pink"
										| "green"
										| "indigo"
										| "blue",
								}}
							/>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Hero;
