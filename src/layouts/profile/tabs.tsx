import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Gallery from "./gallery";
import Projects from "./projects";
import Portfolio from "./portfolio";
import Posts from "./posts";
import Likes from "./likes";

const tabs = [
	{
		value: "posts",
	},
	{
		value: "projects",
	},
	{
		value: "portfolio",
	},
	{
		value: "media",
	},
	{
		value: "likes",
	},
];

const TabsProfile = async () => {
	return (
		<Tabs defaultValue="projects" className="w-full">
			<TabsList className="w-full bg-transparent border-b border-border rounded-none h-auto p-0">
				{tabs.map((tab) => {
					return (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className="flex-1 bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none py-3 text-xs md:text-sm text-foreground data-[state=active]:text-primary font-semibold"
						>
							{tab.value.charAt(0).toUpperCase() + tab.value.slice(1)}
						</TabsTrigger>
					);
				})}
			</TabsList>
			<TabsContent value="posts">
				<Posts />
			</TabsContent>
			<TabsContent value="projects">
				<Projects />
			</TabsContent>
			<TabsContent value="portfolio">
				<Portfolio />
			</TabsContent>
			<TabsContent value="media">
				<Gallery />
			</TabsContent>
			<TabsContent value="likes">
				<Likes />
			</TabsContent>
		</Tabs>
	);
};

export default TabsProfile;
