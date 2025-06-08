import { BlogPost } from "@/types";
import { Linkedin, Share2, Twitter } from "lucide-react";
import { Button } from "../ui/button";

const ShareButtons: React.FC<{ post: BlogPost }> = ({ post }) => {
	const shareUrl = `https://example.com/blog/${post.slug}`;
	const shareText = `Check out "${post.title}" by ${post.author.name}`;

	const shareLinks = [
		{
			name: "Twitter",
			icon: Twitter,
			url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
				shareText
			)}&url=${encodeURIComponent(shareUrl)}`,
		},
		{
			name: "LinkedIn",
			icon: Linkedin,
			url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
				shareUrl
			)}`,
		},
	];

	return (
		<div className="flex items-center space-x-2">
			<span className="text-sm text-muted-foreground">Share:</span>
			{shareLinks.map((link) => (
				<Button
					key={link.name}
					variant="ghost"
					size="sm"
					asChild
					aria-label={`Share on ${link.name}`}
				>
					<a href={link.url} target="_blank" rel="noopener noreferrer">
						<link.icon className="h-4 w-4" />
					</a>
				</Button>
			))}
			<Button
				variant="ghost"
				size="sm"
				onClick={() => navigator.share?.({ title: post.title, url: shareUrl })}
				aria-label="Share"
			>
				<Share2 className="h-4 w-4" />
			</Button>
		</div>
	);
};

export default ShareButtons;
