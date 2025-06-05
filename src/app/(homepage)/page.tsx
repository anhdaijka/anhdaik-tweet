"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		const hasVisited = localStorage.getItem("hasVisited");

		if (!hasVisited) {
			localStorage.setItem("hasVisited", "true"); // Đánh dấu đã truy cập
			router.push("/profile"); // Chuyển hướng
		}
	}, []);

	return <h1>Welcome to the homepage</h1>;
}
