import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface HeaderProps {
	tagline: string;
	heading: string;
	description: string;
	buttonText: string;
	buttonUrl: string;
	arrow?: boolean;
}

const Header = ({
	tagline,
	heading,
	description,
	buttonText,
	buttonUrl,
	arrow,
}: HeaderProps) => {
	return (
		<div className="text-center">
			<Badge variant="default" className="mb-6">
				{tagline}
			</Badge>
			<h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
				{heading}
			</h2>
			<p className="text-muted-foreground mb-8 md:text-base lg:max-w-2xl lg:text-lg">
				{description}
			</p>
			<Button variant="link" className="w-full sm:w-auto text-lg" asChild>
				<Link href={buttonUrl}>
					{arrow && <ArrowLeft className="mr-2 size-4" />}
					{buttonText}
					{!arrow && <ArrowRight className="mr-2 size-4" />}
				</Link>
			</Button>
		</div>
	);
};

export default Header;
