export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "AnhDaijKa's Blog",
	description: "Another Phùng's Characteristics",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Docs",
			href: "/docs",
		},
		{
			label: "Pricing",
			href: "/pricing",
		},
		{
			label: "Blog",
			href: "/blog",
		},
		{
			label: "About",
			href: "/about",
		},
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Projects",
			href: "/projects",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/anhdaijka",
		instagram: "https://www.instagram.com/anhdaijka",
		facebook: "https://www.facebook.com/anhdaijka",
	},
};

export const baseUrl =
	process.env.NODE_ENV === "production"
		? "https://anhdaijka.vercel.app"
		: "http://localhost:3000";

export const APIUrl = "https://better-wonder-c9d27dd40d.strapiapp.com/api";
