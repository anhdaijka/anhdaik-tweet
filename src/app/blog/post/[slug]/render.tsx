"use client";

import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import "react-notion-x/src/styles.css";
import Image from "next/image"; // or import Image from 'next/legacy/image' if you use legacy Image
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
interface NotionClientRendererProps {
	recordMap: ExtendedRecordMap;
	image: string;
}
const CustomEmptyHeader = () => null;

const NotionClientRenderer = ({ recordMap,image }: NotionClientRendererProps) => {
	const path = usePathname();
	console.log(path)
	const {theme} = useTheme();
	return (
		<NotionRenderer
			recordMap={recordMap}
			fullPage={true}
			darkMode={theme === "dark" ? true : false}
			components={{
				nextImage: Image,
				nextLink: Link,
				Header: CustomEmptyHeader,
				Image: image
			}}
		/>
	);
};

export default NotionClientRenderer;
