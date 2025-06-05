export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "AnhDaiK's blog",
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
		github: "https://github.com/anhdaik",
		instagram: "https://www.instagram.com/anhdaik",
		facebook: "https://www.facebook.com/anhdaika",
	},
};

export const baseUrl =
	process.env.NODE_ENV === "production"
		? "https://anhdaik.vercel.app"
		: "http://localhost:3000";
