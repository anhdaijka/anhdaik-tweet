"use client";

import {
	Heart,
	MessageCircle,
	Repeat2,
	Share,
	MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import badge from "@/assets/images/Verified_Badge.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { admin } from "@/lib/data";
import { AnimatePresence, motion } from "motion/react";

interface Tweet {
	id: string;
	content: string;
	timestamp: string;
	likes: number;
	retweets: number;
	replies: number;
	image?: string;
}

interface TweetCardProps {
	tweet: Tweet;
}

export default function TweetCard({ tweet }: TweetCardProps) {
	const [liked, setLiked] = useState(false);
	const [retweeted, setRetweeted] = useState(false);
	const [likesCount, setLikesCount] = useState(tweet.likes);
	const [retweetsCount, setRetweetsCount] = useState(tweet.retweets);
	const [focused, setFocused] = useState(false);
	const isMobile = useIsMobile();

	const handleLike = () => {
		setLiked(!liked);
		setLikesCount(liked ? likesCount - 1 : likesCount + 1);
	};

	const handleRetweet = () => {
		setRetweeted(!retweeted);
		setRetweetsCount(retweeted ? retweetsCount - 1 : retweetsCount + 1);
	};

	return (
		<div className="border-b border-border p-3 md:p-4 hover:bg-primary/10 transition-colors cursor-pointer">
			<div className="flex space-x-2 md:space-x-3">
				<Avatar className="w-10 h-10 md:w-12 md:h-12">
					<AvatarImage src={admin.avatar} className="object-cover" />
					<AvatarFallback>A</AvatarFallback>
				</Avatar>

				<div className="flex-1 min-w-0">
					<div className="flex items-center space-x-1 md:space-x-2 mb-1">
						<span className="font-semibold text-foreground hover:underline text-sm md:text-base truncate max-w-[100px] md:max-w-none">
							{admin.name}
						</span>

						<Image src={badge} alt="Verified" width={16} height={16} />

						<span className="text-foreground text-xs md:text-sm truncate">
							@{admin.username}
						</span>
						<span className="text-foreground text-xs md:text-sm">·</span>
						<span className="text-foreground text-xs md:text-sm">
							{tweet.timestamp}
						</span>
						<Button
							variant="ghost"
							size="sm"
							className="ml-auto p-1 h-auto text-foreground hover:bg-secondary hidden md:flex"
						>
							<MoreHorizontal className="w-4 h-4" />
						</Button>
					</div>

					<div
						className="text-foreground text-sm md:text-base mb-2 md:mb-3 leading-relaxed"
						dangerouslySetInnerHTML={{ __html: tweet.content }}
					></div>

					{tweet.image && (
						<div className="mb-2 md:mb-3 rounded-xl md:rounded-2xl overflow-hidden border border-secondary">
							<Image
								src={tweet.image || ""}
								alt="Tweet image"
								width={500}
								height={300}
								className="w-full h-[25rem] object-cover"
								loading="lazy"
								onClick={() => setFocused(true)}
							/>
							<AnimatePresence mode="wait">
								{focused && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.5, ease: "easeInOut" }}
										style={{ backdropFilter: "blur(5px)" }}
										className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center bg-black/50"
										onClick={() => setFocused(false)}
									>
										<motion.div
											layout
											initial={{ scale: 0.8 }}
											animate={{ scale: 1 }}
											exit={{ scale: 0.8 }}
											transition={{ duration: 0.5, ease: "easeInOut" }}
											className="w-[70%]"
										>
											<Image
												src={tweet.image || ""}
												alt="Tweet image"
												width={500}
												height={300}
												className="w-full h-full object-cover rounded-xl md:rounded-2xl"
												loading="lazy"
												onClick={() => setFocused(false)}
											/>
										</motion.div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					)}

					<div className="flex items-center justify-between max-w-md text-foreground">
						<Button
							variant="ghost"
							size="sm"
							className="flex items-center space-x-1 md:space-x-2 text-foreground hover:text-primary hover:bg-primary/10 p-1 md:p-2 rounded-full"
						>
							<MessageCircle className="w-3 h-3 md:w-4 md:h-4" />
							{!isMobile && (
								<span className="text-xs md:text-sm">{tweet.replies}</span>
							)}
						</Button>

						<Button
							variant="ghost"
							size="sm"
							onClick={handleRetweet}
							className={`flex items-center space-x-1 md:space-x-2 p-1 md:p-2 rounded-full ${
								retweeted
									? "text-green-500 hover:text-green-600 hover:bg-green-500/10"
									: "text-foreground hover:text-green-500 hover:bg-green-500/10"
							}`}
						>
							<Repeat2 className="w-3 h-3 md:w-4 md:h-4" />
							{!isMobile && (
								<span className="text-xs md:text-sm">{retweetsCount}</span>
							)}
						</Button>

						<Button
							variant="ghost"
							size="sm"
							onClick={handleLike}
							className={`flex items-center space-x-1 md:space-x-2 p-1 md:p-2 rounded-full ${
								liked
									? "text-destructive hover:text-destructive hover:bg-destructive/10"
									: "text-foreground hover:text-destructive hover:bg-destructive/10"
							}`}
						>
							<Heart
								className={`w-3 h-3 md:w-4 md:h-4 ${
									liked ? "fill-current" : ""
								}`}
							/>
							{!isMobile && (
								<span className="text-xs md:text-sm">{likesCount}</span>
							)}
						</Button>

						<Button
							variant="ghost"
							size="sm"
							className="flex items-center space-x-1 md:space-x-2 text-foreground hover:text-primary hover:bg-primary/10 p-1 md:p-2 rounded-full"
						>
							<Share className="w-3 h-3 md:w-4 md:h-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
