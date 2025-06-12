"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { GithubIcon, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Provider } from "@supabase/supabase-js";

interface FormProps {
	email: string;
	password: string;
	full_name: string;
}

export default function LoginPage() {
	const { signInOAuth, signIn, user } = useAuth();
	const router = useRouter();
	const [activeForm, setActiveForm] = useState<"signin" | "signup">("signin");
	const [formData, setFormData] = useState<FormProps>({
		email: "",
		password: "",
		full_name: "",
	});

	if (user) router.push("/");

	const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (activeForm === "signin") {
			toast.info("Signing in...", {
				position: "top-center",
				onAutoClose: () => {
					toast.dismiss();
				},
			});
			signIn({
				email: formData.email,
				password: formData.password,
			});
		} else {
			toast.warning("These functions are paused for now", {
				position: "top-center",
			});
			// await signup({ ...formData });
		}
	};
	return (
		<div className="flex flex-col min-h-[calc(100vh+5rem)] min-[380px]:min-h-screen w-full items-center justify-center">
			<Button
				className="flex sm:hidden items-center justify-center fixed sm:absolute bottom-4 left-4 cursor-pointer rounded-2xl gap-4 text-md z-[16]"
				variant="secondary"
				onClick={() => router.push("/")}
			>
				<HomeIcon />
				Home
			</Button>
			<div className="relative overflow-hidden rounded-xl bg-card shadow-xl min-w-sm md:min-w-md lg:min-w-xl z-[15]">
				<div className="flex flex-col items-center justify-center p-6 sm:p-8">
					<div className="mb-8 flex w-full justify-center">
						<div className="relative flex rounded-full bg-background p-1">
							<button
								onClick={() => setActiveForm("signin")}
								className={cn(
									"relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors",
									activeForm === "signin"
										? "text-primary-foreground"
										: "text-foreground"
								)}
							>
								Sign In
							</button>
							<button
								onClick={() => setActiveForm("signup")}
								className={cn(
									"relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors",
									activeForm === "signup"
										? "text-primary-foreground"
										: "text-foreground"
								)}
							>
								Sign Up
							</button>
							<motion.div
								className="absolute inset-0 z-0 rounded-full bg-primary"
								initial={{ x: activeForm === "signin" ? 0 : "100%" }}
								animate={{ x: activeForm === "signin" ? 0 : "100%" }}
								transition={{ type: "spring", damping: 20, stiffness: 300 }}
								style={{
									width: "50%",
									transform:
										activeForm === "signin"
											? "translateX(0%)"
											: "translateX(100%)",
								}}
							/>
						</div>
					</div>

					<div className="relative w-full overflow-hidden">
						<div className="flex w-full">
							<AnimatePresence mode="wait">
								{activeForm === "signin" ? (
									<motion.div
										key="signin"
										className="w-full"
										initial={{ x: -20, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										exit={{ x: -20, opacity: 0 }}
										transition={{ duration: 0.3 }}
									>
										<SignInForm
											formData={formData}
											handleChangeForm={handleChangeForm}
											handleSubmitForm={handleSubmitForm}
											onSwitchForm={() => setActiveForm("signup")}
											signInOAuth={signInOAuth}
										/>
									</motion.div>
								) : (
									<motion.div
										key="signup"
										className="w-full"
										initial={{ x: 20, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										exit={{ x: 20, opacity: 0 }}
										transition={{ duration: 0.3 }}
									>
										<SignUpForm
											formData={formData}
											handleChangeForm={handleChangeForm}
											handleSubmitForm={handleSubmitForm}
											onSwitchForm={() => setActiveForm("signin")}
											signInOAuth={signInOAuth}
										/>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

interface AuthFormProps {
	onSwitchForm: () => void;
	formData: FormProps;
	handleChangeForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmitForm: (e: React.ChangeEvent<HTMLFormElement>) => void;
	signInOAuth: ({ provider }: { provider: Provider }) => void;
}

function SignInForm({
	onSwitchForm,
	formData,
	handleChangeForm,
	handleSubmitForm,
	signInOAuth,
}: AuthFormProps) {
	return (
		<div className="space-y-4">
			<div className="space-y-2 text-center">
				<h1 className="text-3xl font-bold">Welcome back</h1>
				<p className="text-foreground">Enter your credentials to sign in</p>
			</div>
			<form className="space-y-4" onSubmit={handleSubmitForm}>
				<div className="space-y-2">
					<Label htmlFor="email-signin">Email</Label>
					<Input
						id="email-signin"
						type="email"
						placeholder="youremail@example.com"
						name="email"
						value={formData.email}
						onChange={handleChangeForm}
					/>
				</div>
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<Label htmlFor="password-signin">Password</Label>
						<a href="#" className="text-xs text-primary hover:underline">
							Forgot password?
						</a>
					</div>
					<Input
						id="password-signin"
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChangeForm}
					/>
				</div>
				<div className="flex items-center space-x-2">
					<Checkbox id="remember" />
					<label
						htmlFor="remember"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Remember me
					</label>
				</div>
				<Button type="submit" className="w-full bg-primary">
					Sign In
				</Button>
			</form>
			<div className="relative my-4">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-border"></div>
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 ">Or continue with</span>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<Button
					variant="outline"
					className="w-full"
					onClick={() => {
						signInOAuth({ provider: "github" });
					}}
				>
					<GithubIcon className="mr-2 h-4 w-4" />
					GitHub
				</Button>
				<Button
					variant="outline"
					className="w-full"
					onClick={() => {
						signInOAuth({ provider: "google" });
					}}
				>
					<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						/>
						<path
							fill="currentColor"
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						/>
						<path
							fill="currentColor"
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
						/>
						<path
							fill="currentColor"
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
						/>
					</svg>
					Google
				</Button>
			</div>
			<div className="mt-4 text-center text-sm">
				Don&apos;t have an account?{" "}
				<button onClick={onSwitchForm} className="text-primary hover:underline">
					Sign up
				</button>
			</div>
		</div>
	);
}

function SignUpForm({
	onSwitchForm,
	formData,
	handleChangeForm,
	handleSubmitForm,
	signInOAuth,
}: AuthFormProps) {
	return (
		<div className="space-y-4">
			<div className="space-y-2 text-center">
				<h1 className="text-3xl font-bold">Create an account</h1>
				<p className="text-foreground">Enter your information to get started</p>
			</div>
			<form className="space-y-4" onSubmit={handleSubmitForm}>
				<div className="space-y-2">
					<Label htmlFor="full_name">Display name</Label>
					<Input
						id="full_name"
						placeholder="Your name"
						name="full_name"
						value={formData.full_name}
						onChange={handleChangeForm}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="email-signup">Email</Label>
					<Input
						id="email-signup"
						type="email"
						placeholder="youremail@example.com"
						name="email"
						value={formData.email}
						onChange={handleChangeForm}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="password-signup">Password</Label>
					<Input
						id="password-signup"
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChangeForm}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="confirm-password">Confirm Password</Label>
					<Input id="confirm-password" type="password" />
				</div>
				<div className="flex items-center space-x-2">
					<Checkbox id="terms" />
					<label
						htmlFor="terms"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						I agree to the{" "}
						<a href="#" className="text-primary hover:underline">
							terms and conditions
						</a>
					</label>
				</div>
				<Button type="submit" className="w-full bg-primary">
					Create Account
				</Button>
			</form>
			<div className="relative my-4">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-border"></div>
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2">Or continue with</span>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<Button
					variant="outline"
					className="w-full"
					onClick={() => {
						signInOAuth({ provider: "github" });
					}}
				>
					<GithubIcon className="mr-2 h-4 w-4" />
					GitHub
				</Button>
				<Button
					variant="outline"
					className="w-full"
					onClick={() => {
						signInOAuth({ provider: "google" });
					}}
				>
					<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						/>
						<path
							fill="currentColor"
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						/>
						<path
							fill="currentColor"
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
						/>
						<path
							fill="currentColor"
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
						/>
					</svg>
					Google
				</Button>
			</div>
			<div className="mt-4 text-center text-sm">
				Already have an account?{" "}
				<button onClick={onSwitchForm} className="text-primary hover:underline">
					Sign in
				</button>
			</div>
		</div>
	);
}
