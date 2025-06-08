"use client";

import BlogCard from "@/components/blog-card";
import { mockPosts } from "@/lib/data";
import React from "react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";

const HeroSection: React.FC = () => (
	<section className="py-20 px-4 sm:px-6 lg:px-8">
		<div className="max-w-4xl mx-auto text-center">
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<Avatar className="w-24 h-24 mx-auto mb-6">
					<AvatarImage src="/api/placeholder/96/96" alt="Developer" />
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>

				<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
					Frontend Developer & Tech Writer
				</h1>

				<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
					Sharing insights on modern web development, React patterns, and
					building exceptional user experiences that matter.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<Button size="lg" className="group">
						Read Latest Posts
						<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
					</Button>

					<div className="flex space-x-4">
						<Button variant="ghost" size="sm" aria-label="GitHub">
							<Github className="h-5 w-5" />
						</Button>
						<Button variant="ghost" size="sm" aria-label="LinkedIn">
							<Linkedin className="h-5 w-5" />
						</Button>
						<Button variant="ghost" size="sm" aria-label="Twitter">
							<Twitter className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</motion.div>
		</div>
	</section>
);

export default HeroSection;
