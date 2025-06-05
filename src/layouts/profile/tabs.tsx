import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const TabsProfile = () => {
	return (
		<Tabs defaultValue="posts" className="w-full">
			<TabsList className="w-full bg-transparent border-b border-border rounded-none h-auto p-0">
				<TabsTrigger
					value="posts"
					className="flex-1 bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none py-3 text-xs md:text-sm text-foreground data-[state=active]:text-primary font-semibold"
				>
					Posts
				</TabsTrigger>
				<TabsTrigger
					value="projects"
					className="flex-1 bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none py-3 text-xs md:text-sm text-foreground data-[state=active]:text-primary font-semibold"
				>
					Projects
				</TabsTrigger>
				<TabsTrigger
					value="work"
					className="flex-1 bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none py-3 text-xs md:text-sm text-foreground data-[state=active]:text-primary font-semibold"
				>
					Work
				</TabsTrigger>
				<TabsTrigger
					value="likes"
					className="flex-1 bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none py-3 text-xs md:text-sm text-foreground data-[state=active]:text-primary font-semibold"
				>
					Likes
				</TabsTrigger>
			</TabsList>

			<TabsContent className="min-h-screen" value="posts">
				<div className="p-4">Posts</div>
			</TabsContent>

			<TabsContent className="min-h-screen" value="projects">
				<div className="p-4">Replies</div>
			</TabsContent>

			<TabsContent className="min-h-screen" value="work">
				<div className="p-4">Media</div>
			</TabsContent>

			<TabsContent className="min-h-screen" value="likes">
				<div className="p-4">Likes</div>
			</TabsContent>
		</Tabs>
	);
};

export default TabsProfile;
