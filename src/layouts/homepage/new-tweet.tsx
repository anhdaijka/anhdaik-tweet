"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { appear, fromBottom, fromTop } from "@/lib/animation";
import { Loader2, X } from "lucide-react";
import { postTweet } from "@/services/tweetQuery";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { FileUploadComponent } from "@/components/file-upload";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const NewTweet = () => {
	const queryClient = useQueryClient();
	const [content, setContent] = useState("");
	const [images, setImages] = useState<File[]>([]);
	const [isPosting, setIsPosting] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);
	const [isMedia, setIsMedia] = useState(false);
	const { user } = useAuth();
	const router = useRouter();
	const isAdmin = user?.email === "tenzovn@gmail.com";

	const handleFollowing = () => {
		setIsFollowing((prev) => !prev);
	};
	const mutation = useMutation({
		mutationFn: ({
			content,
			tag,
			images,
		}: {
			content: string;
			tag: boolean;
			images: File[];
		}) => postTweet({ content, tag, images }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tweets"] });
			toast.success("Tweet posted successfully", { position: "top-center" });
			setContent("");
			setImages([]);
			setIsMedia(false);
			setIsPosting(false);
		},
		onError: (error) => {
			toast.error(error.message, { position: "top-center" });
			setContent("");
			setImages([]);
			setIsMedia(false);
			setIsPosting(false);
		},
		mutationKey: ["postTweet"],
	});

	const handlePostTweet = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		mutation.mutate({ content: content, tag: isFollowing, images: images });
	};

	const handleMedia = () => {
		setIsMedia((prev) => !prev);
	};

	return (
		<>
			<motion.div
				variants={appear}
				initial="hidden"
				whileInView={isMedia ? "visible" : "hidden"}
				transition={{ duration: 0.5, ease: "easeInOut" }}
				className="fixed inset-0 w-screen h-screen bg-black/50 flex items-center justify-center"
				style={{ zIndex: isMedia ? 100 : -1 }}
			>
				<div onClick={handleMedia} className="absolute inset-0"></div>
				<motion.div
					variants={fromBottom}
					initial="hidden"
					animate={isMedia ? "visible" : "hidden"}
					viewport={{ once: true }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
					className="border border-border p-4 rounded-2xl relative mt-4 bg-card z-50"
				>
					<FileUploadComponent
						images={images}
						setImages={setImages}
						handleMedia={handleMedia}
					/>
				</motion.div>
			</motion.div>

			<motion.div
				variants={fromTop}
				initial="hidden"
				animate="visible"
				viewport={{ once: true }}
				transition={{ duration: 0.5, ease: "easeInOut" }}
				className="border border-border p-4 rounded-2xl relative mt-4 max-w-[calc(100%-2rem)] mx-auto"
				style={{
					backdropFilter: !isAdmin ? "blur(50px)" : "blur(0px)",
				}}
			>
				<div className="flex space-x-4">
					{isAdmin ? (
						<Avatar className="w-10 h-10 md:w-12 md:h-12">
							<AvatarImage src={user?.user_metadata?.avatar_url} />
							<AvatarFallback>{user?.email?.charAt(0)}</AvatarFallback>
						</Avatar>
					) : (
						<Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-full" />
					)}
					<div className="flex-1 flex flex-col items-center">
						<Textarea
							placeholder={
								user ? "What's happening?" : "Sign in as admin to tweet"
							}
							disabled={user ? false : true}
							value={content}
							onChange={(e) => {
								setContent(e.target.value);
							}}
							className="min-h-24 w-full rounded-2xl resize-none bg-transparent outline-none focus:ring-0 focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
						<div className="flex-1 w-full mt-4">
							<div className="flex justify-between items-center">
								<div className="flex space-x-2 md:space-x-4">
									<Button
										onClick={handleMedia}
										disabled={isAdmin ? false : true}
										variant="secondary"
										size="icon-lg"
										className="rounded-full"
									>
										📷
									</Button>
									<Button
										variant="secondary"
										disabled={isAdmin ? false : true}
										size="icon-lg"
										className="rounded-full"
									>
										📊
									</Button>
									<Button
										variant="secondary"
										disabled={isAdmin ? false : true}
										onClick={handleFollowing}
										size="icon-lg"
										className={cn("rounded-full", isFollowing && "bg-primary")}
									>
										😊
									</Button>
									<Button
										variant="secondary"
										disabled={isAdmin ? false : true}
										size="icon-lg"
										className="rounded-full"
									>
										📅
									</Button>
								</div>
								<Button
									size="lg"
									disabled={isAdmin ? false : true}
									onClick={handlePostTweet}
									className="bg-accent hover:bg-primary text-accent-foreground hover:text-primary-foreground px-4 md:px-6 py-1 md:py-2 rounded-full font-semibold text-sm md:text-base"
								>
									{isPosting && <Loader2 className="mr-2 animate-spin" />}
									Post
								</Button>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default NewTweet;
