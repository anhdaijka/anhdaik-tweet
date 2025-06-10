"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import { User } from "@supabase/supabase-js";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { fromTop } from "@/lib/animation";
import { Loader2 } from "lucide-react";
import { postTweet } from "@/services/tweetQuery";
import { toast } from "sonner";
const NewTweet = () => {
	const [user, setUser] = useState<User | null>(null);
	const [content, setContent] = useState<string>("");
	const { user: sessionUser } = useAuth();
	const [isPosting, setIsPosting] = useState(false);
	const handlePostTweet = async () => {
		const res = await postTweet({
			author_id: user?.id ?? null,
			content: content || null,
		});
		if (res?.error) {
			console.log(res);
		} else {
			setContent("");
			toast.success(res?.message, { position: "top-center" });
		}
	};

	useEffect(() => {
		if (sessionUser) {
			setUser(sessionUser);
		}
	}, [user]);
	return (
		user && (
			<motion.div
				variants={fromTop}
				initial="hidden"
				whileInView={"visible"}
				viewport={{ once: true }}
				transition={{ duration: 0.5, ease: "easeInOut" }}
				className="border border-border p-4 rounded-2xl relative mt-4"
			>
				<div className="flex space-x-4">
					<Avatar className="w-10 h-10 md:w-12 md:h-12">
						<AvatarImage src={user?.user_metadata?.avatar_url} />
						<AvatarFallback>{user?.email?.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="flex-1 flex flex-col items-center">
						<Textarea
							placeholder="What's happening?"
							value={content}
							onChange={(e) => {
								setContent(e.target.value);
							}}
							className="w-full rounded-2xl resize-none bg-transparent outline-none focus:ring-0 focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
						<div className="flex-1 w-full mt-4">
							<div className="flex justify-between items-center">
								<div className="flex space-x-2 md:space-x-4">
									<Button
										variant="ghost"
										size="sm"
										className="text-primary hover:bg-accent/10 p-1 md:p-2"
									>
										📷
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="text-primary hover:bg-accent/10 p-1 md:p-2"
									>
										📊
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="text-primary hover:bg-accent/10 p-1 md:p-2"
									>
										😊
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="text-primary hover:bg-accent/10 p-1 md:p-2"
									>
										📅
									</Button>
								</div>
								<Button
									size="lg"
									onClick={handlePostTweet}
									// disabled={isPosting ? true : false}
									className="bg-accent hover:bg-primary px-4 md:px-6 py-1 md:py-2 rounded-full font-semibold text-sm md:text-base"
								>
									{isPosting && <Loader2 className="mr-2 animate-spin" />}
									Post
								</Button>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		)
	);
};

export default NewTweet;
