import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { baseUrl } from "@/configs/site";
import Link from "next/link";
const Nav = () => {
	return (
		<>
			<NavigationMenu className="ml-auto">
				<NavigationMenuList className="gap-3 md:gap-6">
					<NavigationMenuItem>
						<NavigationMenuLink>
							<Link
								href={`${baseUrl}/tweets`}
								className="hover:underline hover:underline-offset-2 text-lg"
							>
								Tweets
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink>
							<Link
								href="/"
								className="hover:underline hover:underline-offset-2 text-lg"
							>
								Thoughts
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink>
							<Link
								href="/"
								className="hover:underline hover:underline-offset-2 text-lg"
							>
								Coding
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink>
							<Link
								href="/"
								className="hover:underline hover:underline-offset-2 text-lg"
							>
								Fitness
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</>
	);
};

export default Nav;
