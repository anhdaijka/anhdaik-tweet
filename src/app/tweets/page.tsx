"use client";
import NewTweet from "@/layouts/homepage/new-tweet";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForYou from "@/layouts/homepage/for-you";
import Following from "@/layouts/homepage/following";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

const HomePage = () => {
	const { isMobile } = useSidebar();
	return (
		<div className="bg-background">
			<Tabs defaultValue="for-you" className="w-full">
				<TabsList className="w-full mx-auto flex items-center justify-center bg-transparent border-b border-border rounded-none h-auto pt-4 relative">
					<TabsTrigger value="for-you">For you</TabsTrigger>
					<TabsTrigger value="following">Following</TabsTrigger>
					{isMobile && (
						<div className="absolute right-4">
							<SidebarTrigger />
						</div>
					)}
				</TabsList>

				<NewTweet />
				<Separator className="my-4" />
				<TabsContent value="for-you">
					<ForYou />
				</TabsContent>
				<TabsContent value="following">
					<Following />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default HomePage;
