import Link from "next/link";
import logo from "@/assets/images/logo.webp";
import Image from "next/image";

const Logo = () => {
	return (
		<Link href="/">
			<Image
				src={logo.src}
				alt="logo"
				className="size-10 border border-transparent rounded-full"
				width={24}
				height={24}
			/>
		</Link>
	);
};

export default Logo;
