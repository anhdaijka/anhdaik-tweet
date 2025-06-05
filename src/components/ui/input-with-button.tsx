import { Input } from "@/components/ui/input";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { SidebarMenuButton, useSidebar } from "./sidebar";
import { Button } from "./button";
interface InputWithButtonProps {
	placeholder: string;
	type: string;
	icon: ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
	>;
}

export function InputWithButton({
	placeholder,
	type = "text",
	icon,
	...props
}: InputWithButtonProps) {
	const Icon = icon;
	const { state } = useSidebar();
	return (
		state === "expanded" && (
			<div className="flex w-full max-w-sm items-center gap-2">
				<Input type={type} placeholder={placeholder} />

				<Button size="sm" variant="outline" type={"submit"}>
					{Icon && <Icon />}
				</Button>
			</div>
		)
	);
}
