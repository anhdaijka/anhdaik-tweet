"use client";
import { Comment } from "@/types";
import { useState } from "react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommentsSection: React.FC<{ postId: string }> = ({ postId }) => {
	const [comments, setComments] = useState<Comment[]>([
		{
			id: "1",
			author: "Alex Johnson",
			content:
				"Great article! The accessibility tips are really helpful. I've been struggling with implementing proper ARIA attributes in my React components.",
			publishedAt: "2024-01-16",
			avatar: "/api/placeholder/40/40",
		},
		{
			id: "2",
			author: "Sarah Chen",
			content:
				"Thanks for sharing this. The code examples are clear and easy to follow. Looking forward to implementing these patterns in my next project.",
			publishedAt: "2024-01-17",
			avatar: "/api/placeholder/40/40",
		},
	]);
	const [newComment, setNewComment] = useState("");
	const [authorName, setAuthorName] = useState("");

	const handleSubmitComment = (e: React.FormEvent) => {
		e.preventDefault();
		if (newComment.trim() && authorName.trim()) {
			const comment: Comment = {
				id: Date.now().toString(),
				author: authorName,
				content: newComment,
				publishedAt: new Date().toISOString().split("T")[0],
			};
			setComments([...comments, comment]);
			setNewComment("");
			setAuthorName("");
		}
	};

	return (
		<div className="space-y-6">
			<h3 className="text-2xl font-semibold">Comments ({comments.length})</h3>

			{/* Comment Form */}
			<Card>
				<CardHeader>
					<h4 className="text-lg font-medium">Leave a Comment</h4>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmitComment} className="space-y-4">
						<Input
							placeholder="Your name"
							value={authorName}
							onChange={(e) => setAuthorName(e.target.value)}
							required
						/>
						<textarea
							className="w-full min-h-[120px] px-3 py-2 border border-border rounded-md bg-background resize-none"
							placeholder="Write your comment..."
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							required
						/>
						<Button
							type="submit"
							disabled={!newComment.trim() || !authorName.trim()}
						>
							Post Comment
						</Button>
					</form>
				</CardContent>
			</Card>

			{/* Comments List */}
			<div className="space-y-4">
				{comments.map((comment) => (
					<Card key={comment.id}>
						<CardContent className="p-4">
							<div className="flex items-start space-x-3">
								<Avatar className="w-10 h-10">
									<AvatarImage src={comment.avatar} alt={comment.author} />
									<AvatarFallback>
										{comment.author
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1">
									<div className="flex items-center space-x-2 mb-2">
										<span className="font-medium">{comment.author}</span>
										<span className="text-sm text-muted-foreground">
											{new Date(comment.publishedAt).toLocaleDateString()}
										</span>
									</div>
									<p className="text-foreground leading-relaxed">
										{comment.content}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default CommentsSection;
