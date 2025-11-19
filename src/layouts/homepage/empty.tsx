"use client";

import { IconBell } from "@tabler/icons-react";
import { RefreshCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { useRouter } from "next/navigation";

function EmptyMuted() {
    const router = useRouter();
	return (
		<Empty className="text-center w-full max-w-screen-sm mx-auto bg-gradient-to-b from-30%">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<IconBell />
				</EmptyMedia>
				<EmptyTitle>No Tweets More</EmptyTitle>
				<EmptyDescription>
					You&apos;re all caught up. New tweet will appear then.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button variant="outline" size="sm" onClick={() => router.push("/tweets")}>
					<RefreshCcwIcon />
					Refresh
				</Button>
			</EmptyContent>
		</Empty>
	);
}
export default EmptyMuted;