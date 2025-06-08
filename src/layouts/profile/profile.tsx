import Image from "next/image";
import cover from "@/assets/images/cover.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { admin } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { baseUrl } from "@/configs/site";
import { MapPin, CalendarDays } from "lucide-react";
import { motion } from "motion/react";
import badge from "@/assets/images/Verified_Badge.png";
import { fallBounce } from "@/lib/animation";
const Profile = () => {
	return (
		<section className="h-[25rem] w-full mb-[2.5rem]">
			{/* Image & cover  */}
			<div className="relative">
				<div className="w-full h-[12.5rem]">
					<Image
						src={cover.src}
						alt="profile"
						width={832}
						height={416}
						className="w-full h-full object-cover object-bottom"
					/>
				</div>
				<motion.div
					variants={fallBounce}
					initial="hidden"
					whileInView={"visible"}
					transition={{ timestamp: 0.5, duration: 1, ease: "easeInOut" }}
					className="absolute size-32 left-[0.8rem] bottom-[-4rem]"
				>
					<Avatar className="w-full h-full ring-2 ring-primary/60 ring-offset-1">
						<AvatarImage src={admin.avatar} className="object-cover" />
						<AvatarFallback>A</AvatarFallback>
					</Avatar>
				</motion.div>
			</div>
			{/* Button  */}
			<div className="text-end mt-[0.5rem]">
				<Button
					variant="outline"
					size="lg"
					className="rounded-3xl mr-[1rem] ring-1 ring-primary text-primary text-lg"
				>
					<Link href={`${baseUrl}/contact`}>Get in Touch</Link>
				</Button>
			</div>
			{/* Profile Info  */}
			<div className="flex flex-col items-start p-4 mt-4">
				<h1 className="text-2xl font-bold flex items-center">
					{admin.name}
					<span className="ml-2">
						<Image src={badge} width={20} height={20} alt="badge" />
					</span>
				</h1>
				<span className="text-secondary-foreground text-sm">
					@{admin.username}
				</span>
				<p className="mt-2">{admin.ocupation}</p>
				<div className="flex items-center gap-4 text-secondary-foreground text-sm mt-2">
					<div className="flex items-center gap-1">
						<MapPin className="size-4" />
						<span className="text-secondary-foreground/70">Hanoi, Vietnam</span>
					</div>
					<div className="flex items-center gap-1">
						<CalendarDays className="size-4" />
						<span className="text-secondary-foreground/70">01/10/2000</span>
					</div>
				</div>
				<div className="flex items-center gap-4 text-md text-secondary-foreground mt-2">
					<p className="flex items-center gap-1">
						<span className="font-semibold">3</span>
						<span className="text-secondary-foreground/70">Projects</span>
					</p>
					<p className="flex items-center gap-1">
						<span className="font-semibold">9</span>
						<span className="text-secondary-foreground/70">
							Months Experience
						</span>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Profile;
