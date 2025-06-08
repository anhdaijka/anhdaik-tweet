"use client";

import FuzzyText from "@/components/animations/FuzzyText";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
	const router = useRouter();
	return (
		<section className="bg-card min-h-screen w-full flex flex-col items-center justify-center">
			<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
				<div className="mx-auto max-w-screen-sm text-center">
					<h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
						<FuzzyText
							baseIntensity={0.2}
							hoverIntensity={0.3}
							enableHover={true}
						>
							500
						</FuzzyText>
					</h1>
					<p className="mb-4 text-3xl tracking-tight font-bold text-destructive md:text-4xl">
						Internal Server Error.
					</p>
					<p className="mb-4 text-lg font-light text-card-foreground md:text-xl">
						We are already working to solve the problem.{" "}
					</p>
				</div>
				<div className="text-center w-full mt-12">
					<Button onClick={() => router.back()} size="lg">
						Go Back
					</Button>
				</div>
			</div>
		</section>
	);
}
