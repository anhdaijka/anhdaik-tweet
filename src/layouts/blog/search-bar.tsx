import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
	return (
		<div className="flex w-2/3 items-center -space-x-px">
			<Input
				type="text"
				id="search"
				name="search"
				placeholder="Find something..."
				className="rounded-r-none"
			/>
			<Button variant="secondary" className="rounded-l-none">
				<Search />
			</Button>
		</div>
	);
}
