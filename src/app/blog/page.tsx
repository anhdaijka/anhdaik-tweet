"use client";
import { ArrowLeft, ArrowRight, Loader2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { baseUrl } from "@/configs/site";
import Link from "next/link";
import Image from "next/image";
import { NotionPost } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts, POST_PER_PAGE, PostPage } from "@/services/postQuery";
import Header from "@/layouts/blog/header";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import EmptyMuted from "@/layouts/homepage/empty";

const useFeaturedPosts = () => {
	return useQuery<PostPage>({
		queryKey: ["featuredPosts"],
		queryFn: fetchPosts as any,
	});
};

const PropsPage = {
	tagline: "Featured Posts",
	heading: "Blog Posts",
	description:
		"Discover the latest thoughts, tutorials, and insights of mine on stuffs related to web development, philosophy, and technology.",
	buttonText: "View all articles",
	buttonUrl: `${baseUrl}/blog/post`,
	arrow: false,
};

const emptyImg =
	"https://paper.vn/wp-content/uploads/2023/11/placeholder-1-1-1.png";

const BlogPage = () => {
	const { data: dataPosts, isLoading, isError, error } = useFeaturedPosts();

	const posts: NotionPost[] | undefined = dataPosts?.posts.slice(
		0,
		POST_PER_PAGE
	);

	if (isLoading) {
		return (
			<section className="py-12">
				<div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
					<Header {...PropsPage} />
					<div className="container mx-auto text-center">
						<Empty className="w-full">
							<EmptyHeader>
								<EmptyMedia variant="icon">
									<Spinner />
								</EmptyMedia>
								<EmptyTitle>Loading posts</EmptyTitle>
								<EmptyDescription>
									Please wait while we process your request. Do not refresh the
									page.
								</EmptyDescription>
							</EmptyHeader>
							<EmptyContent>
								<Button size="sm" variant="outline">
									Cancel
								</Button>
							</EmptyContent>
						</Empty>
					</div>
				</div>
			</section>
		);
	}

	if (isError) {
		return (
			<section className="py-12">
				<div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
					<Header {...PropsPage} />
					<div className="container mx-auto text-center">
						<Empty>
							<EmptyHeader>
								<EmptyMedia variant="icon">
									<Search />
								</EmptyMedia>
								<EmptyTitle>No post found</EmptyTitle>
								<EmptyDescription>
									We couldn&apos;t find anything. Try again later.
								</EmptyDescription>
							</EmptyHeader>
						</Empty>
					</div>
					<Button variant="link" className="w-full sm:w-auto" asChild>
						<Link href={baseUrl}>
							<ArrowLeft className="ml-2 size-4" />
							Back to Home
						</Link>
					</Button>
				</div>
			</section>
		);
	}

	if (!posts?.length) {
		return (
			<section className="py-12">
				<div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
					<Header {...PropsPage} />
					<EmptyMuted name="posts" />
				</div>
			</section>
		);
	}

	return (
		<section className="py-12">
			<div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
				<Header {...PropsPage} />
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
					{posts?.map((post) => (
						<BlogCard key={post.slug} {...post} />
					))}
				</div>
				<Button variant="link" className="w-full sm:w-auto" asChild>
					<Link href={baseUrl}>
						<ArrowLeft className="ml-2 size-4" />
						Back to Home
					</Link>
				</Button>
			</div>
		</section>
	);
};

const BlogCard = (post: Omit<NotionPost, "content" | "featured">) => {
	return (
		<Card
			key={post.slug}
			className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0"
		>
			<div className="aspect-16/9 w-full overflow-hidden rounded-t-xl">
				<Link
					href={`/blog/post/${post.slug}`}
					className="overflow-hidden rounded-xl"
				>
					<Image
						src={post.image || emptyImg}
						alt={post.title}
						width={400}
						height={225}
						className="h-full w-full object-cover object-center transition-transform duration-200 hover:scale-105"
					/>
				</Link>
			</div>
			<CardHeader>
				<div className="flex items-center gap-2 flex-wrap mb-2">
					{post.tags?.map((tag) => (
						<Badge
							key={tag}
							variant="outline"
							className="bg-primary text-primary-foreground"
						>
							{tag}
						</Badge>
					))}
					<Badge variant="destructive">Featured</Badge>
				</div>
				<h3 className="text-xl font-semibold hover:underline md:text-xl">
					<Link
						href={`/blog/post/${post.slug}`}
						// target="_blank"
					>
						{post.title}
					</Link>
				</h3>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground">{post.summary}</p>
			</CardContent>
			<CardFooter>
				<Link
					href={`/blog/post/${post.slug}`}
					// target="_blank"
					className="text-primary flex items-center hover:underline"
				>
					Read more
					<ArrowRight className="ml-2 size-4" />
				</Link>
				<span className="text-sm text-muted-foreground ml-auto">
					{post.date}
				</span>
			</CardFooter>
		</Card>
	);
};

export default BlogPage;
