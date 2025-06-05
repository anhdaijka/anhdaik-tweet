import React from "react";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface BentoCardProps {
	tittle?: string;
	description?: string;
	action?: React.ReactNode;
	footer?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

const BentoCard = ({
	tittle,
	description,
	action,
	footer,
	children,
	className,
	style,
}: BentoCardProps) => {
	return (
		<Card className={className} style={style}>
			<CardHeader className="text-2xl">
				<CardTitle>{tittle}</CardTitle>
				<CardDescription>{description}</CardDescription>
				<CardAction>{action}</CardAction>
			</CardHeader>
			<CardContent>{children}</CardContent>
			<CardFooter>{footer}</CardFooter>
		</Card>
	);
};

export default BentoCard;
