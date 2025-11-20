"use client";

import {
	Banner,
	BannerAction,
	BannerClose,
	BannerIcon,
	BannerTitle,
} from "@/components/ui/banner";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { message } from "@/lib/data";

import React from "react";

const NewBanner = () => {
	return (
		<Banner inset>
			<BannerIcon icon={CircleAlert} />
			<BannerTitle>{message.text}</BannerTitle>
			<BannerAction>
				<Link href={message.url}>{message.action}</Link>
			</BannerAction>
			<BannerClose />
		</Banner>
	);
};

export default NewBanner;
