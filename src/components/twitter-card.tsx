"use client";
import confetti from "canvas-confetti";
import {
	Heart,
	MessageCircle,
	Repeat2,
	Share,
	MoreHorizontal,
	MoreHorizontalIcon,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import badge from "@/assets/images/Verified_Badge.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { admin } from "@/lib/data";
import { AnimatePresence, motion } from "motion/react";
import { childVariants } from "@/lib/animation";
import { Tables } from "../../database.types";
import { Skeleton } from "./ui/skeleton";
import ImagesCarousel from "./images-carousel";
import Link from "next/link";
import { baseUrl } from "@/configs/site";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { deleteTweet, updateTweet } from "@/services/tweetQuery";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useAuth } from "@/hooks/use-auth";
const height = 100; // Chiều cao giới hạn cho 5 dòng nội dung

export default function TweetCard(tweet: Tables<"tweets">) {
	const { user } = useAuth();
	const isAuthor = user?.id === tweet.author_id;
	const [liked, setLiked] = useState(false);
	const [retweeted, setRetweeted] = useState(false);
	const [comments, setComments] = useState(Math.floor(Math.random() * 1000));
	const [likesCount, setLikesCount] = useState(
		Math.floor(Math.random() * 1000)
	);
	const [retweetsCount, setRetweetsCount] = useState(
		Math.floor(Math.random() * 1000)
	);
	const [focused, setFocused] = useState(false);

	const [data, setData] = useState<Tables<"tweets">>(tweet);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setData({ ...data, content: e.target.value });
	};

	const handleCheckboxChange = (checked: boolean) => {
		setData({ ...data, tag: checked });
	};

	const [edit, setEdit] = useState(false);
	const [deleted, setDeleted] = useState(false);

	const isMobile = useIsMobile();

	const [isExpanded, setIsExpanded] = useState(false); // 1. State để biết nội dung đang mở hay đóng
	const [needsTruncation, setNeedsTruncation] = useState(false); // 2. State để biết nội dung có BỊ tràn hay không
	const contentRef = useRef<HTMLDivElement>(null); // 3. Ref để tham chiếu đến div nội dung

	const handleDelete = async (id: string) => {
		// Xử lý xóa tweet ở đây
		if (!isAuthor) {
			toast.error("You are not authorized to delete this tweet.", {
				position: "top-center",
			});
			return;
		}

		const res = await deleteTweet(id);
		setDeleted(false); // Đóng dialog sau khi xóa

		if (res.error) {
			toast.error("Error deleting tweet: " + res.error, {
				position: "top-center",
			});
			return;
		} else {
			toast.success("Tweet deleted successfully", {
				position: "top-center",
			});
		}
	};

	const handleUpdate = async (id: string) => {
		if (!isAuthor) {
			toast.error("You are not authorized to update this tweet.", {
				position: "top-center",
			});
			return;
		}
		const res = await updateTweet(id, {
			...data,
			updated_at: new Date().toISOString(),
		});
		setEdit(false); // Đóng dialog sau khi cập nhật
		if (res.error) {
			toast.error("Error updating tweet: " + res.error, {
				position: "top-center",
			});
			return;
		} else {
			toast.success("Tweet updated successfully", {
				position: "top-center",
			});
		}
	};

	const handleLike = () => {
		setLiked(!liked);
		setLikesCount(liked ? likesCount - 1 : likesCount + 1);
	};
	const handleRetweet = () => {
		setRetweeted(!retweeted);
		setRetweetsCount(retweeted ? retweetsCount - 1 : retweetsCount + 1);
	};

	useEffect(() => {
		// Chỉ kiểm tra khi chưa mở rộng
		if (contentRef.current && !isExpanded) {
			// So sánh chiều cao thực (scrollHeight) với chiều cao hiển thị (clientHeight)
			const isOverflowing = contentRef.current.clientHeight > height; // Giới hạn 5 dòng (khoảng 100px mỗi dòng)
			setNeedsTruncation(isOverflowing);
		}
	}, [user, isExpanded, data.content]);

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
								<Link
									href={`${baseUrl}/`}
									className="font-semibold text-foreground hover:underline text-sm md:text-base truncate max-w-[100px] md:max-w-none"
								>
									{admin.name}
								</Link>

								<Image src={badge} alt="Verified" width={16} height={16} />
							</div>

							<span className="text-foreground/60 text-xs md:text-sm truncate">
								@{admin.username}
							</span>
						</div>
					</div>
					{isAuthor ? (
						<>
							<DropdownMenu modal={false}>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" aria-label="Open menu" size="icon-lg">
										<MoreHorizontalIcon />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-40" align="end">
									<DropdownMenuLabel>Actions</DropdownMenuLabel>
									<DropdownMenuGroup>
										<DropdownMenuItem onSelect={() => setEdit(true)} disabled={!isAuthor}>
											Edit
										</DropdownMenuItem>
										<DropdownMenuItem onSelect={() => setDeleted(true)} disabled={!isAuthor}>
											Delete
										</DropdownMenuItem>
										<DropdownMenuItem disabled>Download</DropdownMenuItem>
									</DropdownMenuGroup>
								</DropdownMenuContent>
							</DropdownMenu>
							<Dialog open={edit} onOpenChange={setEdit}>
								<DialogContent className="w-md sm:w-xl">
									<DialogHeader>
										<DialogTitle>Edit Tweet</DialogTitle>
										<DialogDescription>
											Make changes to your tweet content below.
										</DialogDescription>
									</DialogHeader>
									<FieldSet>
										<FieldGroup>
											<Field>
												<FieldLabel htmlFor="content">Content</FieldLabel>
												<Textarea
													id="content"
													placeholder="Write your tweet content here."
													rows={4}
													className="resize-none max-h-80 overflow-y-auto"
													value={data.content || ""}
													onChange={handleChange}
												/>
												<div className="flex items-center gap-3">
													<Checkbox
														id="tag"
														checked={Boolean(data.tag)}
														onCheckedChange={handleCheckboxChange}
													/>
													<Label htmlFor="tag">
														This tweet contains sensitive content
													</Label>
												</div>
											</Field>
										</FieldGroup>
									</FieldSet>
									<DialogFooter>
										<DialogClose asChild>
											<Button variant="outline">Cancel</Button>
										</DialogClose>
										<Button
											variant="secondary"
											onClick={() => handleUpdate(tweet.id)}
										>
											Update
										</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
							<Dialog open={deleted} onOpenChange={setDeleted}>
								<DialogContent className="sm:max-w-[425px]">
									<DialogHeader>
										<DialogTitle>Delete Tweet</DialogTitle>
										<DialogDescription>
											Are you sure you want to delete this tweet? This action
											cannot be undone.
										</DialogDescription>
									</DialogHeader>
									<DialogFooter>
										<DialogClose asChild>
											<Button variant="outline">Cancel</Button>
										</DialogClose>
										<Button
											variant="destructive"
											onClick={() => handleDelete(tweet.id)}
										>
											Delete
										</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</>
					) : (
						<svg
							className="text-primary h-6 w-auto inline-block fill-current"
							viewBox="0 0 24 24"
						>
							<g>
								<path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
							</g>
						</svg>
					)}
				</div>
				<div
					ref={contentRef}
					className={`text-card-foreground block text-xl leading-snug mt-3 ${
						!isExpanded ? "line-clamp-5 max-h-28" : "max-h-fit"
					}`}
					dangerouslySetInnerHTML={{ __html: tweet.content ?? "" }}
				></div>
				{needsTruncation && !isExpanded && (
					<button
						onClick={() => setIsExpanded(true)}
						className="text-primary font-medium hover:underline text-lg mt-1"
					>
						... Đọc thêm
					</button>
				)}

				{isExpanded && (
					<button
						onClick={() => setIsExpanded(false)}
						className="text-primary font-medium hover:underline text-lg mt-1"
					>
						Rút gọn
					</button>
				)}

				{data.images && data.images.length === 1 && (
					<Image
						className="mt-2 rounded-2xl border border-border aspect-video object-cover"
						src={data.images?.[0] || ""}
						alt="image"
						width={1000}
						height={1000}
						onClick={() => setFocused(true)}
					/>
				)}

				{data.images && data.images.length > 1 && (
					<ImagesCarousel images={data.images} />
				)}

				{data.images && data.images.length === 1 && focused && (
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
								src={data.images?.[0] || ""}
								alt="Tweet image"
								width={1000}
								height={1000}
								className="object-contain rounded-xl max-h-[90vh] max-w-[90vw] bg-black"
								loading="lazy"
								onClick={() => setFocused(false)}
							/>
						</motion.div>
					</motion.div>
				)}

				<p className="text-card-foreground/70 text-base py-1 my-1">
					{data.created_at}
				</p>
				<div className="border-border border border-b-0 my-1" />
				<div className="flex items-center gap-6 max-w-md text-foreground mt-3">
					<LikeButton
						liked={liked}
						handleLike={handleLike}
						isMobile={isMobile}
						likesCount={likesCount}
					/>
					<Button
						variant="ghost"
						size="lg"
						className="text-foreground hover:text-primary hover:bg-primary/10 rounded-full"
					>
						<MessageCircle className="size-6" />
						{!isMobile && comments > 0 && (
							<span className="text-xs md:text-sm">
								{comments} people {comments === 1 ? "is" : "are"} Tweeting about
								this
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

export function TweetCardSkeleton() {
	return (
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
			<div className="text-card-foreground block text-xl leading-snug mt-3">
				<Skeleton className="bg-accent h-4 w-[250px]" />
			</div>

			<div className="text-card-foreground/70 text-base py-1 my-1">
				<Skeleton className="bg-accent h-4 w-[200px]" />
			</div>
			<div className="border-border border border-b-0 my-1" />
			<div className="flex items-center gap-6 max-w-md text-foreground mt-3">
				<Button
					variant="ghost"
					size="lg"
					className={`rounded-full text-destructive hover:text-destructive hover:bg-destructive/10
				}`}
				>
					<Heart className={`size-6 fill-current`} />
				</Button>
				<Button
					variant="ghost"
					size="lg"
					className="text-foreground hover:text-primary hover:bg-primary/10 rounded-full"
				>
					<MessageCircle className="size-6" />
				</Button>

				<Button
					variant="ghost"
					size="lg"
					className={`rounded-full
						text-green-500 hover:text-green-600 hover:bg-green-500/10
				`}
				>
					<Repeat2 className="size-6" />
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
	);
}

function LikeButton({
	liked,
	handleLike,
	isMobile,
	likesCount,
}: {
	liked: boolean;
	handleLike: () => void;
	isMobile: boolean;
	likesCount: number;
}) {
	const handleClick = () => {
		const defaults = {
			spread: 360,
			ticks: 50,
			gravity: 0,
			decay: 0.94,
			startVelocity: 30,
			colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
		};

		const shoot = () => {
			confetti({
				...defaults,
				particleCount: 40,
				scalar: 1.2,
				shapes: ["star"],
			});

			confetti({
				...defaults,
				particleCount: 10,
				scalar: 0.75,
				shapes: ["circle"],
			});
		};

		setTimeout(shoot, 0);
		setTimeout(shoot, 100);
		setTimeout(shoot, 200);
	};

	return (
		<Button
			onClick={() => {
				handleLike();
				if (!liked) {
					handleClick();
				}
			}}
			variant="ghost"
			size="lg"
			className={`rounded-full ${
				liked
					? "text-destructive hover:text-destructive hover:bg-destructive/10"
					: "text-foreground hover:text-destructive hover:bg-destructive/10"
			}`}
		>
			<Heart className={`size-6 ${liked ? "fill-current" : ""}`} />
			{!isMobile && <span className="text-xs md:text-sm">{likesCount}</span>}
		</Button>
	);
}
