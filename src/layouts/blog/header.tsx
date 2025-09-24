"use client";

import Logo from "@/components/logo";
import { useSidebar } from "@/components/ui/sidebar";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Searchbar from "./search-bar";
import Categories from "./categories";
const Header = () => {
	const { isMobile } = useSidebar();
	return (
		<div className="w-full flex items-center justify-between h-16 border-b border-border relative">
			<div className="flex items-center gap-4 mx-4 shrink-0 grow">
				<Logo />
				<Searchbar />
			</div>
			{isMobile && (
				<div className="absolute right-4 top-4 flex items-center gap-2">
					<Categories />
					<SidebarTrigger />
				</div>
			)}
		</div>
	);
};

export default Header;
