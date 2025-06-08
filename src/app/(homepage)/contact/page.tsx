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
import React from "react";
import { motion } from "motion/react";
import { fromBottom } from "@/lib/animation";
import { useRouter } from "next/navigation";

const ContactPage = () => {
	const router = useRouter();
	return (
		<div className="p-4 h-[150vh] md:h-screen w-full flex flex-col items-center justify-center">
			<Button
				className="flex items-center justify-center fixed sm:absolute top-4 left-4 cursor-pointer rounded-2xl gap-4 text-md"
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
								<a href="mailto:1020phug@gmail.com" className="text-sm ml-4">
									<small className="block text-card-foreground">Mail</small>
									<span className="text-primary font-medium">
										1020phug@gmail.com
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
								<Link href="https://github.com/1020phug">
									<GithubIcon />
								</Link>
							</Button>
							<Button
								variant={"ghost"}
								className="rounded-full size-12 cursor-pointer"
							>
								<Link href="https://www.linkedin.com/in/1020phug">
									<LinkedinIcon />
								</Link>
							</Button>
							<Button
								variant={"ghost"}
								className="rounded-full size-12 cursor-pointer"
							>
								<Link href="https://instagram.com/anhdaik">
									<InstagramIcon />
								</Link>
							</Button>
						</ul>
					</div>
				</div>
				<form className="space-y-4 h-full flex flex-col items-center justify-center">
					<Input
						type="text"
						className="border-border border-2"
						placeholder="Name"
					/>
					<Input
						type="email"
						className="border-border border-2"
						placeholder="Email"
					/>
					<Input
						type="text"
						className="border-border border-2"
						placeholder="Subject"
					/>
					<Textarea
						placeholder="Message"
						className="flex-1 border-border border-2"
						defaultValue={""}
					/>
					<Button type="button" className="w-full mt-2">
						Send message
					</Button>
				</form>
			</motion.div>
		</div>
	);
};

export default ContactPage;
