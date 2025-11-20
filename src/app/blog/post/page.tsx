"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { baseUrl } from "@/configs/site";
import {
	ArrowLeft,
	ArrowRight,
	Clock,
	Loader2,
	Search,
	UserIcon,
} from "lucide-react"; // ⭐️ Thêm Loader2
import Image from "next/image";
import Link from "next/link";
import { NotionPost } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
	fetchPosts,
	PostPage as InfinitePostsPage,
	PostsCursor,
} from "@/services/postQuery";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { admin } from "@/lib/data";
import { LiquidButton } from "@/components/animations/liquid-button";
import EmptyMuted from "@/layouts/homepage/empty";
const PostProps = {
	tagline: "Latest Updates",
	heading: "All Posts",
	description:
		"All my latest shit posts. Hoping you'll find something that resonates with you.",
	buttonText: "Back to Blog",
	buttonUrl: `${baseUrl}/blog`,
	arrow: true,
};

const PostPage = () => {
	const {
		data: pagesData,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
	} = useInfiniteQuery({
		queryKey: ["infinitePosts"],
		queryFn: fetchPosts as any,
		getNextPageParam: (lastPage: InfinitePostsPage, allPages) => {
			return lastPage.hasMore ? lastPage.nextCursor : undefined;
		},
		initialPageParam: null as PostsCursor,
	});

	const allPosts = pagesData?.pages.flatMap((page) => page.posts) ?? [];

	if (isLoading) {
		return (
			<section className="py-12">
				<div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
					<Header {...PostProps} />
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
					<Header {...PostProps} />
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

	return (
		<>
			<section className="py-12">
				<div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
					<Header {...PostProps} />
					<div className="grid gap-6 grid-cols-1 lg:gap-8">
						{allPosts.map((post) => (
							<PostCard key={post.slug} {...post} />
						))}
					</div>

					{hasNextPage && (
						<Button
							onClick={() => fetchNextPage()}
							disabled={isFetchingNextPage}
							className="w-sm mx-auto"
						>
							{isFetchingNextPage ? (
								<>
									<Loader2 className="mr-2 size-4 animate-spin" />
									Loading...
								</>
							) : (
								<>
									More Posts
									<ArrowRight className="ml-2 size-4" />
								</>
							)}
						</Button>
					)}

					{!hasNextPage && allPosts.length > 0 && <EmptyMuted name="posts" />}

					<Button variant="link" className="w-full sm:w-auto" asChild>
						<Link href={baseUrl}>
							<ArrowLeft className="ml-2 size-4" />
							Back to Home
						</Link>
					</Button>
				</div>
			</section>
		</>
	);
};

const PostCard = (post: Omit<NotionPost, "featured">) => {
	return (
		<>
			<div className="relative min-h-[32rem] md:min-h-[18rem] flex w-full max-w-[26rem] md:max-w-[52rem] flex-col md:flex-row rounded-xl overflow-hidden bg-card bg-clip-border text-card-foreground shadow-md hover:shadow-2xl">
				<Link
					href={`${baseUrl}/blog/post/${post.slug}`}
					className="relative m-0 w-full md:w-2/5 shrink-0 overflow-hidden rounded-xl rounded-b-none md:rounded-r-none"
				>
					<Image
						width={600}
						height={600}
						src={post.image || ""}
						alt={post.title}
						className="aspect-16/9 w-full h-full object-cover object-center transition-transform duration-200 hover:scale-105"
					/>
				</Link>
				<div className="p-6 flex-1 flex flex-col">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 flex-wrap mb-4">
							{post.tags?.map((tag) => (
								<Badge
									key={tag}
									variant="outline"
									className="bg-primary text-primary-foreground text-sm md:text-md"
								>
									{tag}
								</Badge>
							))}
						</div>
						<span className="text-sm text-muted-foreground ml-auto">
							{post.date}
						</span>
					</div>
					<Link
						href={`${baseUrl}/blog/post/${post.slug}`}
						className="mb-2 block text-2xl hover:underline font-semibold leading-snug tracking-normal antialiased"
					>
						{post.title}
					</Link>
					<p className="mb-8 block text-base font-normal leading-relaxed text-muted-foreground antialiased">
						{post.summary}
					</p>
					<div className="flex items-center justify-between mt-auto">
						<Link
							className="inline-block text-lg"
							href={`${baseUrl}/blog/post/${post.slug}`}
						>
							<LiquidButton
								variant="outline"
								size="lg"
								className="text-md hover:text-primary-foreground duration-1000 border-none"
							>
								Learn More
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={2}
									stroke="currentColor"
									aria-hidden="true"
									className="h-4 w-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
									/>
								</svg>
							</LiquidButton>
						</Link>
						<p className="items-center flex text-primary/70 hover:text-primary">
							<div className="size-8 inline-block mr-2">
								<Avatar className="ring-2 ring-primary/60 ring-offset-1 object-center">
									<AvatarImage src={post.author.avatar || admin.avatar} />
									<AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
								</Avatar>
							</div>
							{post.author.name}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default PostPage;
