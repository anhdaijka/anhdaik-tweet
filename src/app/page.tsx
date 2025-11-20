import { siteConfig } from "@/configs/site";
import Portfolio from "@/layouts/homepage/portfolio";

export const metadata = {
	title: `${siteConfig.name} | ` + "Portfolio",
	description: "Portfolio",
}

export default async function Page() {
	return (
		<>
			<Portfolio />
		</>
	);
}
