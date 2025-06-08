import { BlogPost } from "@/types";
import { Copy, Linkedin, Share2, Twitter } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PostShareSection: React.FC<{ post: BlogPost }> = ({ post }) => {
	const shareUrl = `https://example.com/blog/${post.slug}`;
	const shareText = `Check out "${post.title}" by ${post.author.name}`;

	const shareLinks = [
		{
			name: "Twitter",
			icon: Twitter,
			url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
				shareText
			)}&url=${encodeURIComponent(shareUrl)}`,
			color: "hover:text-blue-500",
		},
		{
			name: "LinkedIn",
			icon: Linkedin,
			url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
				shareUrl
			)}`,
			color: "hover:text-blue-600",
		},
		{
			name: "Facebook",
			icon: Share2,
			url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
				shareUrl
			)}`,
			color: "hover:text-blue-700",
		},
	];

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl);
			// You could add a toast notification here
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	return (
		<Card>
			<CardHeader>
				<h3 className="text-xl font-semibold">Share this article</h3>
				<p className="text-muted-foreground">
					Help others discover this content by sharing it on your favorite
					platform
				</p>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap gap-3">
					{shareLinks.map((link) => (
						<Button
							key={link.name}
							variant="outline"
							size="sm"
							asChild
							className={`transition-colors ${link.color}`}
						>
							<a href={link.url} target="_blank" rel="noopener noreferrer">
								<link.icon className="h-4 w-4 mr-2" />
								{link.name}
							</a>
						</Button>
					))}
					<Button
						variant="outline"
						size="sm"
						onClick={copyToClipboard}
						className="hover:text-green-600"
					>
						<Copy className="h-4 w-4 mr-2" />
						Copy Link
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default PostShareSection;
