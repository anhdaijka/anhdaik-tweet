import React from "react";
import { Heart, ArrowUpRightFromSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

interface Props {
	image: string;
	name: string;
	description: string;
	tech: { name: string; url: string }[];
	url: string;
}

const AnimatedCard = ({ image, name, description, tech, url }: Props) => {
	return (
		<Link
			href={url}
			target="_blank"
			className="min-w-[60%] max-w-[75%] relative overflow-hidden"
		>
			<Image
				src={image}
				alt="image"
				className="w-full h-[400px] object-cover object-center rounded-xl"
				width={1000}
				height={1000}
			/>

			<div className="absolute top-3 right-3">
				<Heart className="text-destructive fill-destructive" />
			</div>

			<div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-[#000] to-[rgb(0,0,0,0.0001)] p-5 rounded-b-xl">
				<div className="flex items-center gap-2 flex-wrap">
					{tech.map((item, idx) => (
						<Badge key={idx} variant="secondary">
							<Link href={item.url}>{item.name}</Link>
						</Badge>
					))}
				</div>
				<h1 className="text-md text-primary-foreground font-bold leading-relaxed mt-4">
					{name}
				</h1>
				<p className="text-sm text-foreground mt-2">{description}</p>
			</div>
		</Link>
	);
};

export default AnimatedCard;
