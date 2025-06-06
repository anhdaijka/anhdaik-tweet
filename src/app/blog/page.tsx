"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";

export default function Blog() {
	const { setOpen } = useSidebar();
	useEffect(() => {
		setOpen(false);
	}, []);
	return <h1>Welcome to the blog</h1>;
}
