import TabsProfile from "@/layouts/profile/tabs";
import Header from "@/layouts/profile/header";
import Profile from "@/layouts/profile/profile";

export default async function Page() {
	return (
		<>
			<Header />
			<Profile />
			<div className="flex flex-1 flex-col gap-4">
				<TabsProfile />
			</div>
		</>
	);
}
