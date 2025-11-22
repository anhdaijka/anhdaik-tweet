"use client";

import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";

// used for rendering equations (optional)
import "katex/dist/katex.min.css";
import Image from "next/image"; // or import Image from 'next/legacy/image' if you use legacy Image
import Link from "next/link";
import { useTheme } from "next-themes";
interface NotionClientRendererProps {
	recordMap: ExtendedRecordMap;
	image: string;
}
const CustomEmptyHeader = () => null;

const NotionClientRenderer = ({
	recordMap,
	image,
}: NotionClientRendererProps) => {
	const { theme } = useTheme();
	return (
		<NotionRenderer
			recordMap={recordMap}
			fullPage={true}
			darkMode={theme === "dark" ? true : false}
			components={{
				nextImage: Image,
				nextLink: Link,
				Header: CustomEmptyHeader,
				Image: image,
			}}
		/>
	);
};

export default NotionClientRenderer;
