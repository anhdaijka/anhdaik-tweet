import { SearchIcon } from "lucide-react";

import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
// import {
// 	InputGroup,
// 	InputGroupAddon,
// 	InputGroupInput,
// } from "@/components/ui/input-group";
// import { Kbd } from "@/components/ui/kbd";
import { admin } from "@/lib/data";

export default function NotFoundPage() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyTitle className="text-3xl">404 - Not Found</EmptyTitle>
				<EmptyDescription>
					The page you&apos;re looking for doesn&apos;t exist. Try searching for
					what you need below.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				{/* <InputGroup className="sm:w-3/4">
					<InputGroupInput placeholder="Try searching for pages..." />
					<InputGroupAddon>
						<SearchIcon />
					</InputGroupAddon>
					<InputGroupAddon align="inline-end">
						<Kbd>/</Kbd>
					</InputGroupAddon>
				</InputGroup> */}
				<EmptyDescription>
					Need help? <a href={`mailto:${admin.email}`}>Contact support</a>
				</EmptyDescription>
			</EmptyContent>
		</Empty>
	);
}
