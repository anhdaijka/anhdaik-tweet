"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function BlogHeader() {
	const path = usePathname();

	// Split and filter the path segments
	const segments = path.split("/").filter(Boolean);

	// Build the breadcrumb items
	const breadcrumbs = [
		{ name: "Home", href: "/" },
		...segments.map((segment, idx) => {
			const href = "/" + segments.slice(0, idx + 1).join("/");
			// Optionally, format the segment (capitalize, replace dashes, etc.)
			const name =
				segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
			return { name, href };
		}),
	];

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((crumb, idx) => (
					<BreadcrumbItem key={crumb.href}>
						{idx < breadcrumbs.length - 1 ? (
							<>
								<BreadcrumbLink href={crumb.href}>{crumb.name}</BreadcrumbLink>
								<BreadcrumbSeparator />
							</>
						) : (
							<BreadcrumbPage>{crumb.name}</BreadcrumbPage>
						)}
					</BreadcrumbItem>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
