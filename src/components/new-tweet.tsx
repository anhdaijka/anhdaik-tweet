"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

import { User } from "@supabase/supabase-js";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const NewTweet = () => {
	const [newUser, setNewUser] = useState<User | null>(null);
	const [value, setValue] = useState<string>("");
	const { user } = useAuth();
	const [isTyping, setIsTyping] = useState(false);
	useEffect(() => {
		if (user) {
			setNewUser(user);
		}
	}, [user]);
	return (
		<div className="w-5xl mx-auto border border-border p-4 rounded-2xl relative">
			<Textarea
				onFocus={() => setIsTyping(true)}
				onBlur={() => {
					if (!value) {
						setIsTyping(false);
					} else if (value) {
						setIsTyping(true);
					}
				}}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				className="absolute inset-0 w-full rounded-2xl resize-none bg-transparent px-20 py-5 outline-none focus:ring-0 focus-visible:border-none focus-visible:ring-0"
			/>
			<div className="flex space-x-4">
				<Avatar className="w-10 h-10 md:w-12 md:h-12">
					<AvatarImage src={newUser?.user_metadata?.avatar_url} />
					<AvatarFallback>{newUser?.email?.charAt(0)}</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<div
						className={cn(
							"text-lg md:text-xl text-foreground/70 mb-4 opacity-100",
							isTyping && "opacity-0 transition-all duration-300"
						)}
					>
						What is happening?!
					</div>
					<div className="flex justify-between items-center">
						<div className="flex space-x-2 md:space-x-4 text-blue-500">
							<Button
								variant="ghost"
								size="sm"
								className="text-blue-500 hover:bg-blue-500/10 p-1 md:p-2"
							>
								📷
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="text-blue-500 hover:bg-blue-500/10 p-1 md:p-2"
							>
								📊
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="text-blue-500 hover:bg-blue-500/10 p-1 md:p-2"
							>
								😊
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="text-blue-500 hover:bg-blue-500/10 p-1 md:p-2"
							>
								📅
							</Button>
						</div>
						<Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 py-1 md:py-2 rounded-full font-semibold text-sm md:text-base">
							Post
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewTweet;
