"use client";

import { useState } from "react";
import { CalendarIcon, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PostQuery } from "@/types";
import { Editor } from "@/components/editor";
import { baseUrl } from "@/configs/site";

export const title = "Create Blog Post";

export default function Posts({ post }: { post?: PostQuery }) {
	const [tags, setTags] = useState<string[]>(
		post?.label || ["React", "TypeScript"]
	);
    const [slug, setSlug] = useState(post?.slug || "");
	const [newTag, setNewTag] = useState("");
	const [isScheduled, setIsScheduled] = useState(false);
	const [content, setContent] = useState(
		post?.content ||
			`
    <h1>Welcome to Minimal Tiptap</h1>
    <p>This is a rich text editor built with Tiptap. Try editing this text!</p>
    <ul>
      <li>Use the toolbar to format text</li>
      <li>Try making text <strong>bold</strong> or <em>italic</em></li>
      <li>Create lists and headings</li>
    </ul>
    <blockquote>
      <p>This is a blockquote. Perfect for highlighting important information.</p>
    </blockquote>
  `
	);

	const addTag = () => {
		if (newTag.trim() && !tags.includes(newTag.trim())) {
			setTags([...tags, newTag.trim()]);
			setNewTag("");
		}
	};

	const removeTag = (tagToRemove: string) => {
		setTags(tags.filter((tag) => tag !== tagToRemove));
	};

	return (
		<section className="container mx-auto py-16 max-w-4xl">
			<Card className="w-full p-6 lg:p-8">
				<div className="mb-6">
					<h3 className="text-2xl font-semibold">Create New Post</h3>
					<p className="text-muted-foreground mt-1 text-sm">
						Write and publish your blog post with rich content options
					</p>
				</div>

				<form action="#" className="space-y-6">
					<div className="grid gap-6 lg:grid-cols-3">
						<div className="lg:col-span-2 space-y-6">
							{/* Title */}
							<div className="space-y-2">
								<Label htmlFor="title">Post Title *</Label>
								<Input
									id="title"
									name="title"
									type="text"
									placeholder="Enter an engaging title"
									required
								/>
							</div>

							{/* Slug */}
							<div className="space-y-2">
								<Label htmlFor="slug">URL Slug *</Label>
								<div className="flex gap-2">
									<Input
										id="slug"
										name="slug"
										type="text"
										placeholder="auto-generated-from-title"
										className="flex-1"
									/>
									<Button type="button" variant="outline" size="sm">
										Generate
									</Button>
								</div>
								<p className="text-muted-foreground text-xs">
									{baseUrl}/blog/post/
									<span className="text-foreground">{slug}</span>
								</p>
							</div>

							{/* Content */}
							<div className="space-y-2">
								<Label htmlFor="content">Content *</Label>
								{/* <Textarea
									id="content"
									name="content"
									placeholder="Write your post content here..."
									rows={12}
									className="resize-none"
								/>
 */}
								<Editor
									content={content}
									onChange={setContent}
									placeholder="Start typing your content here..."
									className="min-h-[400px]"
								/>
								<p className="text-muted-foreground text-xs">
									0 words • 0 min read
								</p>
							</div>

							{/* Excerpt */}
							<div className="space-y-2">
								<Label htmlFor="excerpt">Excerpt</Label>
								<Textarea
									id="excerpt"
									name="excerpt"
									placeholder="Brief summary for previews (150-200 characters)"
									rows={3}
								/>
							</div>
						</div>

						<div className="space-y-6">
							{/* Featured Image */}
							<div className="space-y-2">
								<Label>Featured Image</Label>
								<div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary cursor-pointer transition-colors">
									<Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
									<p className="text-sm text-muted-foreground mb-1">
										Click to upload
									</p>
									<p className="text-xs text-muted-foreground">
										PNG, JPG up to 5MB
									</p>
								</div>
							</div>

							{/* Category */}
							<div className="space-y-2">
								<Label htmlFor="category">Category *</Label>
								<Select name="category">
									<SelectTrigger id="category">
										<SelectValue placeholder="Select category" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="technology">Technology</SelectItem>
										<SelectItem value="design">Design</SelectItem>
										<SelectItem value="business">Business</SelectItem>
										<SelectItem value="marketing">Marketing</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Tags */}
							<div className="space-y-2">
								<Label htmlFor="tags">Tags</Label>
								<div className="flex flex-wrap gap-2 mb-2">
									{tags.map((tag) => (
										<Badge key={tag} variant="secondary">
											{tag}
											<button
												aria-label={`Remove ${tag} tag`}
												type="button"
												onClick={() => removeTag(tag)}
												className="ml-1 hover:text-destructive"
											>
												<X className="h-3 w-3" />
											</button>
										</Badge>
									))}
								</div>
								<div className="flex gap-2">
									<Input
										id="tags"
										value={newTag}
										onChange={(e) => setNewTag(e.target.value)}
										onKeyPress={(e) =>
											e.key === "Enter" && (e.preventDefault(), addTag())
										}
										placeholder="Add tag"
										className="flex-1"
									/>
									<Button
										type="button"
										onClick={addTag}
										variant="outline"
										size="sm"
									>
										Add
									</Button>
								</div>
							</div>

							{/* Publish Settings */}
							<div className="space-y-4 border-t pt-4">
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Featured Post</Label>
										<p className="text-xs text-muted-foreground">
											Show on homepage
										</p>
									</div>
									<Switch disabled/>
								</div>

								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Allow Comments</Label>
										<p className="text-xs text-muted-foreground">
											Enable discussions
										</p>
									</div>
									<Switch defaultChecked disabled/>
								</div>

								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Schedule Post</Label>
										<p className="text-xs text-muted-foreground">
											Publish at specific time
										</p>
									</div>
									<Switch
										disabled
										checked={isScheduled}
										onCheckedChange={setIsScheduled}
									/>
								</div>

								{isScheduled && (
									<div className="space-y-2">
										<Label htmlFor="publishDate">Publish Date</Label>
										<Button
											type="button"
											variant="outline"
											disabled
											className="w-full justify-start text-left font-normal"
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											Pick a date
										</Button>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Actions */}
					<div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
						<Button type="submit" className="flex-1">
							Publish Now
						</Button>
						<Button type="button" variant="outline" className="flex-1">
							Save Draft
						</Button>
						<Button type="button" variant="ghost">
							Discard
						</Button>
					</div>
				</form>
			</Card>
		</section>
	);
}
