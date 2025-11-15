// pages.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	GithubIcon,
	HomeIcon,
	InstagramIcon,
	LinkedinIcon,
	MailIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { fromBottom } from "@/lib/animation";
import { useRouter } from "next/navigation";
import { CheckCircle2, Send } from "lucide-react"; // Thêm icons
import { admin } from "@/lib/data";

const FORMSPREE_ENDPOINT = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`;


const ContactPage = () => {
	const router = useRouter();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("loading");

		try {
			const response = await fetch(FORMSPREE_ENDPOINT, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setStatus("success");
				// Xóa form sau khi gửi thành công
				setFormData({ name: "", email: "", subject: "", message: "" });
				// Tự động chuyển về idle sau 3 giây để người dùng có thể gửi lại
				setTimeout(() => setStatus("idle"), 3000);
			} else {
				// Xử lý lỗi từ Formspree (ví dụ: lỗi validation)
				const data = await response.json();
				console.error("Formspree Error:", data);
				setStatus("error");
			}
		} catch (error) {
			console.error("Network or Fetch Error:", error);
			setStatus("error");
		}
	};

	return (
		<div className="p-4 h-[150vh] md:h-screen w-full flex flex-col items-center justify-center">
			<Button
				className="flex sm:hidden items-center justify-center fixed sm:absolute bottom-4 left-4 cursor-pointer rounded-2xl gap-4 text-md z-[16]"
				variant="secondary"
				onClick={() => router.push("/")}
			>
				<HomeIcon />
				Home
			</Button>
			<motion.div
				variants={fromBottom}
				initial="hidden"
				whileInView={"visible"}
				transition={{ duration: 0.5, ease: "easeInOut" }}
				className="grid lg:grid-cols-2 items-start gap-8 p-8 mx-auto max-w-4xl max-lg:max-w-2xl bg-card shadow-2xs shadow-primary rounded-md"
			>
				<div>
					<h2 className="text-primary text-3xl font-bold">Let&#39;s Talk</h2>
					<p className="text-md text-card-foreground mt-4 leading-relaxed">
						Have some big idea or brand to develop and need help? Then reach out
						we&#39;d love to hear about your project and provide help.
					</p>
					<div className="mt-12">
						<h2 className="text-card-foreground text-base font-semibold">
							Email
						</h2>
						<ul className="mt-4">
							<li className="flex items-center">
								<Button variant={"outline"} size={"icon"}>
									<MailIcon />
								</Button>
								<a href={`mailto:${admin.email}`} className="text-sm ml-4">
									<small className="block text-card-foreground">Mail</small>
									<span className="text-primary font-medium">
										{admin.email}
									</span>
								</a>
							</li>
						</ul>
					</div>
					<div className="mt-12">
						<h2 className="text-card-foreground text-base font-semibold">
							Socials
						</h2>
						<ul className="flex mt-4 space-x-4">
							<Button
								variant={"ghost"}
								className="rounded-full size-12 cursor-pointer"
							>
								<Link href={admin.as.github} target="_blank">
									<GithubIcon />
								</Link>
							</Button>
							<Button
								variant={"ghost"}
								className="rounded-full size-12 cursor-pointer"
							>
								<Link href={admin.as.linkedin} target="_blank">
									<LinkedinIcon />
								</Link>
							</Button>
							<Button
								variant={"ghost"}
								className="rounded-full size-12 cursor-pointer"
							>
								<Link href={admin.as.instagram} target="_blank">
									<InstagramIcon />
								</Link>
							</Button>
						</ul>
					</div>
				</div>

				<form
					className="space-y-4 h-full flex flex-col items-center justify-center"
					onSubmit={handleSubmit} 
				>
					<Input
						type="text"
						name="name" 
						className="border-border border-2"
						placeholder="Name"
						value={formData.name} 
						onChange={handleChange} 
						disabled={status === "loading" || status === "success"} 
						required
					/>
					<Input
						type="email"
						name="_replyto" // Formspree dùng _replyto để set Reply-To header
						className="border-border border-2"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
						disabled={status === "loading" || status === "success"}
						required
					/>
					<Input
						type="text"
						name="subject"
						className="border-border border-2"
						placeholder="Subject"
						value={formData.subject}
						onChange={handleChange}
						disabled={status === "loading" || status === "success"}
						required
					/>
					<Textarea
						placeholder="Message"
						name="message"
						className="flex-1 border-border border-2"
						value={formData.message}
						onChange={handleChange}
						disabled={status === "loading" || status === "success"}
						required
					/>

					{/* 5. SỬA LẠI BUTTON */}
					<Button
						type="submit"
						className="w-full mt-2"
						disabled={status === "loading" || status === "success"} 
					>
						{status === "loading" ? (
							<>
								<Send className="mr-2 h-4 w-4 animate-pulse" />
								Sending...
							</>
						) : status === "success" ? (
							<>
								<CheckCircle2 className="mr-2 h-4 w-4" />
								Sent!
							</>
						) : (
							"Send message"
						)}
					</Button>

					{status === "error" && (
						<p className="text-red-500 text-sm">
							Failed to send. Please check your network or try again later.
						</p>
					)}
				</form>
			</motion.div>
		</div>
	);
};

export default ContactPage;
