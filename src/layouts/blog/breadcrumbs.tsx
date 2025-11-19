import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { baseUrl } from "@/configs/site";
import { Home } from "lucide-react";
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
}

const Breadcrumbs = ({ postTitle, postSlug }: BreadcrumbsProps) => {
	const breadcrumbs = [
		{ name: "", href: baseUrl, icon: <Home className="size-4" /> },
		{ name: "Blog", href: `${baseUrl}/blog`, icon: null },
		{
			name: postTitle,
			href: `${baseUrl}/blog/post/${postSlug}`,
			icon: null,
			current: true,
		},
	];

	return (
		<>
			<Breadcrumb className="w-full sticky top-0 left-0 right-0 z-10 bg-card border px-3 py-2">
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
											className="font-medium text-md"
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
		</>
	);
};

export default Breadcrumbs;
