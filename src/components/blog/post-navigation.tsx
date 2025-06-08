import { BlogPost } from "@/types";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PostNavigation: React.FC<{
	currentPost: BlogPost;
	posts: BlogPost[];
	onNavigate: (post: BlogPost) => void;
}> = ({ currentPost, posts, onNavigate }) => {
	const currentIndex = posts.findIndex((post) => post.id === currentPost.id);
	const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
	const nextPost =
		currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

	return (
		<div className="flex justify-between items-center pt-8 border-t">
			<div className="flex-1">
				{prevPost && (
					<Button
						variant="ghost"
						onClick={() => onNavigate(prevPost)}
						className="group p-4 h-auto flex-col items-start"
					>
						<div className="flex items-center text-sm text-muted-foreground mb-1">
							<ChevronLeft className="h-4 w-4 mr-1" />
							Previous
						</div>
						<div className="font-medium group-hover:text-primary transition-colors text-left">
							{prevPost.title}
						</div>
					</Button>
				)}
			</div>

			<div className="flex-1 text-right">
				{nextPost && (
					<Button
						variant="ghost"
						onClick={() => onNavigate(nextPost)}
						className="group p-4 h-auto flex-col items-end"
					>
						<div className="flex items-center text-sm text-muted-foreground mb-1">
							Next
							<ChevronRight className="h-4 w-4 ml-1" />
						</div>
						<div className="font-medium group-hover:text-primary transition-colors text-right">
							{nextPost.title}
						</div>
					</Button>
				)}
			</div>
		</div>
	);
};

export default PostNavigation;
