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
	Accessibility,
	Code,
	Ellipsis,
} from "lucide-react";

export default function Categories() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="link">
					{/* <FolderCode className="size-5" /> */}
					Categories
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuItem>
					<Accessibility className="mr-2 size-4" />
					<span>Thoughts</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Activity className="mr-2 size-4" />
					<span>Fitness</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Code className="mr-2 size-4" />
					<span>Development</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Ellipsis className="mr-2 size-4" />
					<span>Others</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
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
