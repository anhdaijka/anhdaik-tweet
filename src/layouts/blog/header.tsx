"use client";

import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Searchbar from "./search-bar";
import Posts from "./posts";
import Nav from "./nav";
const Header = () => {
	return (
		<div className="w-full flex items-center justify-between h-16 border-b border-border relative">
			<div className="flex items-center gap-4 mx-4 max-w-[80%] md:shrink-0 md:grow">
				<Searchbar />
				<Nav />
				<div className="md:absolute md:right-4 md:top-4 static ml-auto">
					<Posts />
				</div>
			</div>
			<div className="md:hidden absolute right-4 top-4 flex items-center gap-2">
				<SidebarTrigger />
			</div>
		</div>
	);
};

export default Header;
