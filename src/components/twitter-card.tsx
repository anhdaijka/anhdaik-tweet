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
import { childVariants } from "@/lib/animation";

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
		<>
			<motion.div
				variants={childVariants}
				className="bg-card border-border p-4 rounded-xl border max-w-[calc(100%-2rem)] mx-auto mb-2"
			>
				<div className="flex justify-between">
					<div className="flex items-center">
						<Avatar className="w-10 h-10 md:w-12 md:h-12">
							<AvatarImage src={admin.avatar} className="object-cover" />
							<AvatarFallback>A</AvatarFallback>
						</Avatar>
						<div className="ml-1.5 text-sm leading-tight">
							<div className="flex items-center gap-2">
								<span className="font-semibold text-foreground hover:underline text-sm md:text-base truncate max-w-[100px] md:max-w-none">
									{admin.name}
								</span>

								<Image src={badge} alt="Verified" width={16} height={16} />
							</div>

							<span className="text-foreground/60 text-xs md:text-sm truncate">
								@{admin.username}
							</span>
						</div>
					</div>
					<svg
						className="text-primary h-6 w-auto inline-block fill-current"
						viewBox="0 0 24 24"
					>
						<g>
							<path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
						</g>
					</svg>
				</div>
				<div
					className="text-card-foreground block text-xl leading-snug mt-3"
					dangerouslySetInnerHTML={{ __html: tweet.content }}
				></div>
				{tweet.image && (
					<Image
						className="mt-2 rounded-2xl border border-border aspect-video object-cover"
						src={tweet.image || ""}
						alt="image"
						width={1000}
						height={1000}
						onClick={() => setFocused(true)}
					/>
				)}
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
								className="h-full w-full flex flex-col justify-center items-center"
							>
								<Image
									src={tweet.image || ""}
									alt="Tweet image"
									width={1000}
									height={1000}
									className="object-cover rounded-xl md:rounded-2xl"
									loading="lazy"
									onClick={() => setFocused(false)}
								/>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
				<p className="text-card-foreground/70 text-base py-1 my-1">
					{tweet.timestamp}
				</p>
				<div className="border-border border border-b-0 my-1" />
				<div className="flex items-center gap-6 max-w-md text-foreground mt-3">
					<Button
						variant="ghost"
						size="lg"
						onClick={handleLike}
						className={`rounded-full ${
							liked
								? "text-destructive hover:text-destructive hover:bg-destructive/10"
								: "text-foreground hover:text-destructive hover:bg-destructive/10"
						}`}
					>
						<Heart className={`size-6 ${liked ? "fill-current" : ""}`} />
						{!isMobile && (
							<span className="text-xs md:text-sm">{likesCount}</span>
						)}
					</Button>
					<Button
						variant="ghost"
						size="lg"
						className="text-foreground hover:text-primary hover:bg-primary/10 rounded-full"
					>
						<MessageCircle className="size-6" />
						{!isMobile && (
							<span className="text-xs md:text-sm">
								{tweet.replies} people {tweet.replies === 1 ? "is" : "are"}{" "}
								Tweeting about this
							</span>
						)}
					</Button>

					<Button
						variant="ghost"
						size="lg"
						onClick={handleRetweet}
						className={`rounded-full ${
							retweeted
								? "text-green-500 hover:text-green-600 hover:bg-green-500/10"
								: "text-foreground hover:text-green-500 hover:bg-green-500/10"
						}`}
					>
						<Repeat2 className="size-6" />
						{!isMobile && (
							<span className="text-xs md:text-sm">{retweetsCount}</span>
						)}
					</Button>

					<Button
						variant="ghost"
						size="icon"
						className="text-foreground hover:text-primary hover:bg-primary/10 rounded-full"
					>
						<Share className="size-6" />
					</Button>
				</div>
			</motion.div>
		</>
	);
}
