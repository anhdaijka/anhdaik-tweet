import React from "react";
import BentoCard from "./ui/bento-card";
import Image from "next/image";
import { techStackDetails } from "@/lib/data";

const TechStack = () => {
	return (
		<BentoCard tittle="Tech Stack" className="w-[90%]">
			<div className="flex justify-center items-center gap-4 flex-wrap">
				{techStackDetails?.map((stack, idx) => (
					<Image
						key={idx}
						src={stack}
						alt={String(idx)}
						width={24}
						height={24}
						// className="w-16 h-16"
					/>
				))}
			</div>
		</BentoCard>
	);
};

export default TechStack;
