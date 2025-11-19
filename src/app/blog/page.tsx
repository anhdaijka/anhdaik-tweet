import { ArrowLeft, ArrowRight } from "lucide-react";

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

interface Post {
	slug: string;
	title: string;
	content?: string;
	summary: string;
	label: string;
	author: string;
	published: string;
	url: string;
	image: string;
}

interface BlogPageProps {
	tagline: string;
	heading: string;
	description: string;
	buttonText: string;
	buttonUrl: string;
	posts: Post[];
}

const BlogPage = async ({
	tagline = "Latest Updates",
	heading = "Blog Posts",
	description = "Discover the latest thoughts, tutorials, and insights of mine on stuffs related to web development, philosophy, and technology.",
	buttonText = "View all articles",
	buttonUrl = `${baseUrl}/blog/post`,
	posts = [
		{
			slug: "post-1",
			title: "Integrating shadcn/ui in Next.js Projects",
			summary:
				"Learn how to quickly integrate and customize shadcn/ui components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
			label: "Tutorial",
			author: "Sarah Chen",
			published: "1 Jan 2024",
			url: "#",
			image:
				"https://plus.unsplash.com/premium_photo-1763306454161-2587c3791de3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			slug: "post-2",
			title: "Building Accessible Web Applications",
			summary:
				"Explore how to create inclusive web experiences using shadcn/ui's accessible components. Discover practical tips for implementing ARIA labels, keyboard navigation, and semantic HTML.",
			label: "Accessibility",
			author: "Marcus Rodriguez",
			published: "1 Jan 2024",
			url: "#",
			image:
				"https://images.unsplash.com/photo-1762957044542-583a86b753a3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			slug: "post-3",
			title: "Modern Design Systems with Tailwind CSS",
			summary:
				"Dive into creating scalable design systems using Tailwind CSS and shadcn/ui. Learn how to maintain consistency while building flexible and maintainable component libraries.",
			label: "Design Systems",
			author: "Emma Thompson",
			published: "1 Jan 2024",
			url: "#",
			image:
				"https://images.unsplash.com/photo-1761839262867-af53d08b0eb5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
	],
}: BlogPageProps) => {


	return (
		<section className="py-32">
			<div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
				<div className="text-center">
					<Badge variant="secondary" className="mb-6">
						{tagline}
					</Badge>
					<h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
						{heading}
					</h2>
					<p className="text-muted-foreground mb-8 md:text-base lg:max-w-2xl lg:text-lg">
						{description}
					</p>
					<Button variant="link" className="w-full sm:w-auto" asChild>
						<Link href={buttonUrl}>
							{buttonText}
							<ArrowRight className="ml-2 size-4" />
						</Link>
					</Button>
				</div>
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
					{posts.map((post) => (
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

const BlogCard = (post: Post) => {
	return (
		<Card
			key={post.slug}
			className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0"
		>
			<div className="aspect-16/9 w-full">
				<Link
					href={post.url}
					// target="_blank"
					className="fade-in transition-opacity duration-200 hover:opacity-70"
				>
					<Image
						src={post.image}
						alt={post.title}
            width={400}
            height={225}
						className="h-full w-full object-cover object-center"
					/>
				</Link>
			</div>
			<CardHeader>
        <div className="flex items-center justify-between mb-2">

        <Badge>{post.label}</Badge>
        <span className="text-md text-muted-foreground">{post.author}</span>
        </div>
				<h3 className="text-lg font-semibold hover:underline md:text-xl">
					<Link href={post.url} 
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
					href={post.url}
					// target="_blank"
					className="text-foreground flex items-center hover:underline"
				>
					Read more
					<ArrowRight className="ml-2 size-4" />
				</Link>
        <span className="text-sm text-muted-foreground ml-auto">{post.published}</span>
			</CardFooter>
		</Card>
	);
};

export default BlogPage;
