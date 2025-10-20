import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	ArrowUpDown,
	Activity,
	Pen,
	FolderCode,
	ShieldCheck,
	BookOpenText,
	Accessibility,
	Code,
	Ellipsis,
} from "lucide-react";

export default function Posts() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<BookOpenText className="size-5" />
					Posts
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuItem>
					<Pen className="mr-2 size-4" />
					<span>Write</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<ShieldCheck className="mr-2 size-4" />
					<span>Manage posts</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<ArrowUpDown className="mr-2 size-4" />
					<span>Changelog</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
