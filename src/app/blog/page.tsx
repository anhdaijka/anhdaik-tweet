"use client";
import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { BlogPost } from "@/types";
import HeroSection from "../../layouts/blog/hero";
import TrendingSection from "../../layouts/blog/trending";
import BlogGrid from "../../layouts/blog/blog-grid";
import CategoryPage from "@/layouts/blog/category-page";
import SinglePost from "@/layouts/blog/single-post";
import Navigation from "@/components/blog/navtigation";

const BlogLandingPage: React.FC = () => {
	const [currentView, setCurrentView] = useState("blog");
	const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	// Mock data
	const mockPosts: BlogPost[] = [
		{
			id: "1",
			title: "Building Accessible React Components",
			excerpt:
				"Learn how to create React components that work for everyone, including users with disabilities. We'll cover ARIA attributes, keyboard navigation, and testing strategies.",
			content: `Creating accessible React components is crucial for building inclusive web applications. In this comprehensive guide, we'll explore the fundamental principles and practical techniques for ensuring your components work for all users.

## Understanding Web Accessibility

Web accessibility means that websites, tools, and technologies are designed and developed so that people with disabilities can use them effectively.

\`\`\`jsx
const AccessibleButton = ({ children, onClick, disabled = false, ...props }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className="btn"
      {...props}
    >
      {children}
    </button>
  )
}
\`\`\`

## Key Principles

When building accessible components, always consider the four main principles of accessibility: Perceivable, Operable, Understandable, and Robust (POUR).

## Testing Your Components

Regular testing with screen readers and keyboard navigation is essential for maintaining accessibility standards.`,
			author: {
				name: "Jane Developer",
				avatar: "/api/placeholder/64/64",
				bio: "Frontend developer passionate about creating inclusive web experiences. Specializes in React, TypeScript, and accessibility best practices.",
			},
			publishedAt: "2024-01-15",
			readTime: 8,
			tags: ["React", "Accessibility", "Frontend"],
			featured: true,
			slug: "building-accessible-react-components",
			views: 15420,
			category: "frontend",
		},
		{
			id: "2",
			title: "Modern CSS Grid Techniques",
			excerpt:
				"Explore advanced CSS Grid layouts and learn how to create responsive designs without media queries using modern CSS features.",
			content: `CSS Grid has revolutionized how we approach layout design on the web. In this article, we'll dive deep into advanced Grid techniques that will transform your approach to responsive design.

## Introduction to CSS Grid

CSS Grid Layout is a two-dimensional layout system that allows you to create complex layouts with ease.

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}
\`\`\`

## Advanced Grid Techniques

Learn about grid areas, subgrid, and container queries for truly responsive designs.

## Real-world Examples

We'll build several practical layouts using these modern CSS Grid features.`,
			author: {
				name: "Jane Developer",
				avatar: "/api/placeholder/64/64",
				bio: "Frontend developer passionate about creating inclusive web experiences. Specializes in React, TypeScript, and accessibility best practices.",
			},
			publishedAt: "2024-01-10",
			readTime: 6,
			tags: ["CSS", "Grid", "Responsive Design"],
			featured: false,
			slug: "modern-css-grid-techniques",
			views: 8930,
			category: "css",
		},
		{
			id: "3",
			title: "TypeScript Best Practices for React",
			excerpt:
				"Discover essential TypeScript patterns and practices that will make your React applications more maintainable and type-safe.",
			content: `TypeScript brings powerful type safety to React applications. Let's explore the best practices that will help you write more maintainable and robust code.

## Setting Up TypeScript with React

Start with a solid foundation by configuring TypeScript properly for your React project.

\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size = 'md', 
  children, 
  onClick 
}) => {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
\`\`\`

## Advanced Type Patterns

Learn about generic components, utility types, and advanced TypeScript features for React.

## Common Pitfalls and Solutions

Avoid these common TypeScript mistakes when working with React components.`,
			author: {
				name: "Jane Developer",
				avatar: "/api/placeholder/64/64",
				bio: "Frontend developer passionate about creating inclusive web experiences. Specializes in React, TypeScript, and accessibility best practices.",
			},
			publishedAt: "2024-01-05",
			readTime: 10,
			tags: ["TypeScript", "React", "Best Practices"],
			featured: true,
			slug: "typescript-best-practices-react",
			views: 12750,
			category: "frontend",
		},
		{
			id: "4",
			title: "Advanced JavaScript Patterns",
			excerpt:
				"Explore advanced JavaScript patterns and techniques that will elevate your coding skills and help you write more efficient code.",
			content: `JavaScript is a powerful language with many advanced patterns. Let's explore some of the most useful ones.`,
			author: {
				name: "Jane Developer",
				avatar: "/api/placeholder/64/64",
				bio: "Frontend developer passionate about creating inclusive web experiences. Specializes in React, TypeScript, and accessibility best practices.",
			},
			publishedAt: "2024-01-20",
			readTime: 7,
			tags: ["JavaScript", "Patterns", "Advanced"],
			featured: false,
			slug: "advanced-javascript-patterns",
			views: 9840,
			category: "javascript",
		},
		{
			id: "5",
			title: "Node.js Performance Optimization",
			excerpt:
				"Learn how to optimize your Node.js applications for better performance and scalability.",
			content: `Performance optimization is crucial for Node.js applications. Here are the key strategies.`,
			author: {
				name: "Jane Developer",
				avatar: "/api/placeholder/64/64",
				bio: "Frontend developer passionate about creating inclusive web experiences. Specializes in React, TypeScript, and accessibility best practices.",
			},
			publishedAt: "2024-01-12",
			readTime: 12,
			tags: ["Node.js", "Performance", "Backend"],
			featured: false,
			slug: "nodejs-performance-optimization",
			views: 6720,
			category: "backend",
		},
		{
			id: "6",
			title: "CSS Animation Masterclass",
			excerpt:
				"Master CSS animations and transitions to create engaging user interfaces that delight your users.",
			content: `CSS animations can transform static designs into engaging experiences. Let's master them.`,
			author: {
				name: "Jane Developer",
				avatar: "/api/placeholder/64/64",
				bio: "Frontend developer passionate about creating inclusive web experiences. Specializes in React, TypeScript, and accessibility best practices.",
			},
			publishedAt: "2024-01-08",
			readTime: 9,
			tags: ["CSS", "Animation", "UI/UX"],
			featured: true,
			slug: "css-animation-masterclass",
			views: 18650,
			category: "css",
		},
	];

	useEffect(() => {
		// Simulate loading
		const timer = setTimeout(() => setLoading(false), 1000);
		return () => clearTimeout(timer);
	}, []);

	const handlePostSelect = (post: BlogPost) => {
		setSelectedPost(post);
	};

	const handleBackToBlog = () => {
		setSelectedPost(null);
	};

	const handlePostNavigation = (post: BlogPost) => {
		setSelectedPost(post);
	};

	const handleCategorySelect = (category: string) => {
		setSelectedCategory(category);
	};

	const handleBackFromCategory = () => {
		setSelectedCategory(null);
	};

	const categories = Array.from(
		new Set(mockPosts.map((post) => post.category))
	);

	return (
		<div className="min-h-screen bg-background">
			{/* <Navigation currentView={currentView} onViewChange={setCurrentView} /> */}

			<main className="pb-16">
				{currentView === "blog" && !selectedPost && !selectedCategory && (
					<>
						<HeroSection />
						<TrendingSection
							posts={mockPosts}
							onPostSelect={handlePostSelect}
						/>
						<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="mb-8">
								<h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
								<div className="flex flex-wrap gap-3">
									{categories.map((category) => {
										const categoryCount = mockPosts.filter(
											(post) => post.category === category
										).length;
										return (
											<Button
												key={category}
												variant="outline"
												onClick={() => handleCategorySelect(category)}
												className="capitalize"
											>
												{category} ({categoryCount})
											</Button>
										);
									})}
								</div>
							</div>
							<BlogGrid
								posts={mockPosts}
								onPostSelect={handlePostSelect}
								loading={loading}
							/>
						</div>
					</>
				)}

				{selectedCategory && !selectedPost && (
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
						<CategoryPage
							category={selectedCategory}
							posts={mockPosts}
							onPostSelect={handlePostSelect}
							onBack={handleBackFromCategory}
						/>
					</div>
				)}

				{selectedPost && (
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
						<SinglePost
							post={selectedPost}
							posts={mockPosts}
							onBack={handleBackToBlog}
							onNavigate={handlePostNavigation}
						/>
					</div>
				)}

				{currentView === "home" && (
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
						<h1 className="text-4xl font-bold mb-4">Welcome to DevBlog</h1>
						<p className="text-xl text-muted-foreground">
							A modern blog platform for frontend developers
						</p>
					</div>
				)}

				{currentView === "about" && (
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
						<h1 className="text-4xl font-bold mb-8">About</h1>
						<div className="prose prose-lg max-w-none">
							<p>
								Welcome to my corner of the web! I&#39;m a passionate frontend
								developer dedicated to creating exceptional user experiences and
								sharing knowledge with the developer community.
							</p>
							<p>
								Through this blog, I share insights on modern web development,
								React patterns, accessibility best practices, and the latest
								trends in frontend technology.
							</p>
						</div>
					</div>
				)}

				{currentView === "contact" && (
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
						<h1 className="text-4xl font-bold mb-8">Contact</h1>
						<div className="grid md:grid-cols-2 gap-8">
							<div>
								<h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
								<p className="text-muted-foreground mb-6">
									I&#39;d love to hear from you! Whether you have questions,
									collaboration ideas, or just want to say hello.
								</p>
								<div className="space-y-4">
									<Button variant="outline" className="w-full justify-start">
										<Mail className="h-4 w-4 mr-2" />
										hello@example.com
									</Button>
									<Button variant="outline" className="w-full justify-start">
										<Github className="h-4 w-4 mr-2" />
										GitHub Profile
									</Button>
									<Button variant="outline" className="w-full justify-start">
										<Linkedin className="h-4 w-4 mr-2" />
										LinkedIn Profile
									</Button>
								</div>
							</div>
							<Card>
								<CardHeader>
									<h3 className="text-xl font-semibold">Send a Message</h3>
								</CardHeader>
								<CardContent className="space-y-4">
									<Input placeholder="Your Name" />
									<Input placeholder="Your Email" type="email" />
									<Input placeholder="Subject" />
									<div className="space-y-2">
										<label className="text-sm font-medium">Message</label>
										<textarea
											className="w-full min-h-[120px] px-3 py-2 border border-border rounded-md bg-background"
											placeholder="Your message..."
										/>
									</div>
									<Button className="w-full">Send Message</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default BlogLandingPage;
