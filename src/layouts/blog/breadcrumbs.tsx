"use client";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { baseUrl } from "@/configs/site";
import { Home, MessageCircle } from "lucide-react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
interface BreadcrumbsProps {
	postTitle: string;
	postSlug: string;
	author?: string;
	date?: string;
}

const Breadcrumbs = ({
	postTitle,
	postSlug,
	author,
	date,
}: BreadcrumbsProps) => {
	const breadcrumbs = [
		{ name: "", href: baseUrl, icon: <Home className="size-4" /> },
		{
			name: "Blog",
			href: `${baseUrl}/blog/post/`,
			icon: <MessageCircle className="size-4" />,
		},
		{
			name: postTitle,
			href: `${baseUrl}/blog/post/${postSlug}`,
			icon: null,
			current: true,
		},
	];
	const { isMobile } = useSidebar();
	return (
		<div className="w-full sticky top-0 left-0 right-0 z-10 bg-card border flex items-center justify-between">
			<Breadcrumb className="flex-1 px-3 py-2">
				<BreadcrumbList>
					{breadcrumbs.map((item, index) => {
						return (
							<BreadcrumbItem
								key={item.name}
								className="inline-flex items-center gap-2"
							>
								{item.current ? (
									<BreadcrumbLink
										className="text-primary font-medium truncate max-w-xs text-md"
										aria-current="page"
									>
										{item.name}
									</BreadcrumbLink>
								) : (
									<>
										<BreadcrumbLink
											href={item.href}
											className="font-medium text-md flex items-center gap-2 hover:text-primary truncate max-w-xs"
										>
											{item.icon}
											{index > 0 && item.name}
										</BreadcrumbLink>
										<BreadcrumbSeparator />
									</>
								)}
							</BreadcrumbItem>
						);
					})}
				</BreadcrumbList>
			</Breadcrumb>
			<p className="hidden md:block text-muted-foreground px-3 py-2">
				Published by
				<span className="text-primary font-medium"> {author} </span>
				on <span className="text-pretty italic">{date}</span>
			</p>
			{isMobile && <SidebarTrigger />}
		</div>
	);
};

export default Breadcrumbs;
