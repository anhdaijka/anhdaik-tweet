"use client";
import React, { useEffect, useState } from "react";

import { Search, SquareArrowOutUpRight } from "lucide-react";

// data
import { data } from "@/lib/data";
import Link from "next/link";
import { useSidebar } from "./sidebar";
import { cn } from "@/lib/utils";
const Searchbar = () => {
	const [filteredData, setFilteredData] = useState(data.projects);
	const [inputText, setInputText] = useState("");
	const [inputFocus, setInputFocus] = useState(false);
	const { state } = useSidebar();

	useEffect(() => {
		const filtered = data.projects?.filter((project) => {
			if (inputText === "") {
				return data.projects;
			} else {
				return project?.name.toLowerCase().includes(inputText);
			}
		});

		setFilteredData(filtered);
	}, [inputText]);

	interface TruncateOptions {
		ellipsis?: string;
	}

	function truncate(
		text: string,
		maxLength: number,
		ellipsis: string = "..."
	): string {
		if (text?.length <= maxLength) {
			return text;
		}
		return text?.slice(0, maxLength - ellipsis?.length) + ellipsis;
	}

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				!(event.target as HTMLElement).closest(".product_search_bar") &&
				!(event.target as HTMLElement).closest(".product_search_input")
			) {
				setInputFocus(false);
			}
		};
		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<div
			className={cn(
				"relative w-full product_search_input",
				state === "collapsed" && "hidden"
			)}
		>
			<input
				className="px-4 py-2 border-border text-sm bg-transparent text-secondary-foreground placeholder:text-secondary-foreground border rounded-md w-full pl-[40px] outline-none focus:border-primary focus:text-primary"
				placeholder="Search..."
				onChange={(e) => setInputText(e.target.value)}
				onClick={() => setInputFocus(true)}
			/>
			<Search className="absolute text-secondary-foreground top-[9px] left-2 size-5 opacity-50" />

			<div
				className={`${
					inputFocus
						? "opacity-100 h-auto translate-y-0 mt-2"
						: "translate-y-[-10px] opacity-0 h-0"
				} product_search_bar bg-background shadow-2xl shadow-primary w-full transition-all duration-500 overflow-hidden flex flex-col rounded-md border border-border absolute top-full left-0 z-10`}
			>
				{filteredData?.map((project, index) => (
					<div
						key={index}
						className="flex items-center justify-between w-full px-4 py-2 h-18 bg-background hover:bg-secondary text-secondary-foreground hover:text-primary cursor-pointer rounded-md"
					>
						<Link
							href={project?.url}
							target="_blank"
							className="flex items-center gap-4"
						>
							<span>{project?.emoji}</span>
							<h1 className="text-sm">{truncate(project?.name, 60)}</h1>
						</Link>
						<SquareArrowOutUpRight className="size-4 absolute right-4" />
					</div>
				))}

				{!filteredData?.length && (
					<p className="text-md py-3 text-destructive text-center">
						No search matched!
					</p>
				)}
			</div>
		</div>
	);
};

export default Searchbar;
