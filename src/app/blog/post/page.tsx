import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { baseUrl } from "@/configs/site";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
interface Post {
	slug: string;
	title: string;
	content?: string;
	summary: string;
	label: string;
	author: string;
	published: string;
	image: string;
}

const posts = [
	{
		slug: "post/post-1",
		title: "Integrating shadcn/ui in Next.js Projects",
		summary:
			"Learn how to quickly integrate and customize shadcn/ui components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
		label: "Tutorial",
		author: "Sarah Chen",
		published: "1 Jan 2024",
		image:
			"https://plus.unsplash.com/premium_photo-1763306454161-2587c3791de3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		slug: "post/post-2",
		title: "Building Accessible Web Applications",
		summary:
			"Explore how to create inclusive web experiences using shadcn/ui's accessible components. Discover practical tips for implementing ARIA labels, keyboard navigation, and semantic HTML.",
		label: "Accessibility",
		author: "Marcus Rodriguez",
		published: "1 Jan 2024",
		image:
			"https://images.unsplash.com/photo-1762957044542-583a86b753a3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		slug: "post/post-3",
		title: "Modern Design Systems with Tailwind CSS",
		summary:
			"Dive into creating scalable design systems using Tailwind CSS and shadcn/ui. Learn how to maintain consistency while building flexible and maintainable component libraries.",
		label: "Design Systems",
		author: "Emma Thompson",
		published: "1 Jan 2024",
		image:
			"https://images.unsplash.com/photo-1761839262867-af53d08b0eb5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];

const PostPage = () => {
	return (
		<>
			<section className="py-32">
				<div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
					<div className="text-center">
						<Badge variant="secondary" className="mb-6">
							{PostProps.tagline}
						</Badge>
						<h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
							{PostProps.heading}
						</h2>
						<p className="text-muted-foreground mb-8 md:text-base lg:max-w-2xl lg:text-lg">
							{PostProps.description}
						</p>
						<Button variant="link" className="w-full sm:w-auto" asChild>
							<Link href={PostProps.buttonUrl}>
								<ArrowLeft className="mr-2 size-4" />
								{PostProps.buttonText}
							</Link>
						</Button>
					</div>
					<div className="grid gap-6 grid-cols-1 lg:gap-8">
						{posts.map((post) => (
							<PostCard key={post.slug} {...post} />
						))}
					</div>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious href="#" />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#">1</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationNext href="#" />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
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

const PostProps = {
	tagline: "Latest Updates",
	heading: "All Posts",
	description:
		"All my latest shit posts. Hoping you'll find something that resonates with you.",
	buttonText: "Back to Blog",
	buttonUrl: `${baseUrl}/blog`,
};

const PostCard = (post: Post) => {
	return (
		<>
			<div className="relative flex w-full max-w-[30rem] md:max-w-[48rem] flex-col md:flex-row rounded-xl bg-card bg-clip-border text-card-foreground shadow-md">
				<Link href={post.slug} className="relative m-0 w-full md:w-2/5 shrink-0 overflow-hidden rounded-xl md:rounded-r-none">
					<Image
						width={600}
						height={600}
						src={post.image}
						alt={post.title}
						className="aspect-16/9 w-full h-full object-cover"
					/>
				</Link>
				<div className="p-6">
					<div className="flex items-center justify-between mb-4">
						<Badge className="bg-primary text-primary-foreground text-sm">
							{post.label}
						</Badge>
						<span className="text-md text-muted-foreground">{post.author}</span>
					</div>
					<Link href={post.slug} className="mb-2 block text-lg md:text-2xl hover:underline font-semibold leading-snug tracking-normal antialiased">
						{post.title}
					</Link>
					<p className="mb-8 block text-base font-normal leading-relaxed text-muted-foreground antialiased">
						{post.content || post.summary}
					</p>
					<div className="flex items-center justify-between">
						<Link className="inline-block" href={post.slug}>
							<Button variant="link" size="lg" className="text-md">
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
							</Button>
						</Link>
						<span className="text-sm text-muted-foreground ml-auto">
							{post.published}
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default PostPage;
