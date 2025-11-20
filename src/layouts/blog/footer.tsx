"use client";

import { ArrowLeft, Facebook, Github, Home, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { admin } from "@/lib/data";
import { baseUrl } from "@/configs/site";
import Link from "next/link";

const YEAR = new Date().getFullYear();


export default function Footer() {
	return (
		<footer className="w-full border-t py-8">
			<div className="container mx-auto px-12">
				<div className="flex flex-row flex-wrap items-center justify-center gap-x-10 gap-y-6 md:justify-between">
					<Button
						asChild
						variant="link"
						size="icon-lg"
						className="md:text-md font-medium w-full md:w-fit"
					>
						<Link href={`${baseUrl}/blog`} aria-label="Home" rel="noopener noreferrer">
							<ArrowLeft className="size-4" />
							Back to Blog
						</Link>
					</Button>
					<p className="text-foreground text-center text-sm font-medium">
						Copyright &copy; {YEAR}{" "}
						<span className="font-medium text-primary">{admin.username}</span>
					</p>

					<div className="flex gap-1">
						<Button asChild variant="ghost" size="icon" className="h-8 w-8">
							<a
								href={admin.as.linkedin}
								aria-label="Linkedin"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Linkedin className="h-4 w-4" />
							</a>
						</Button>
						<Button asChild variant="ghost" size="icon" className="h-8 w-8">
							<a
								href={admin.as.facebook}
								aria-label="Facebook"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Facebook className="h-4 w-4" />
							</a>
						</Button>
						<Button asChild variant="ghost" size="icon" className="h-8 w-8">
							<a
								href={admin.as.instagram}
								aria-label="Instagram"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Instagram className="h-4 w-4" />
							</a>
						</Button>
						<Button asChild variant="ghost" size="icon" className="h-8 w-8">
							<a
								href={admin.as.github}
								aria-label="GitHub"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Github className="h-4 w-4" />
							</a>
						</Button>
					</div>
				</div>
			</div>
		</footer>
	);
}
