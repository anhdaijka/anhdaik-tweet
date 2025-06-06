"use client";

import { User, Session, Provider } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
interface AuthContextType {
	user: User | null;
	signInOAuth: ({ provider }: { provider: Provider }) => void;
	signOut: () => Promise<void>;
	signIn: ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const supabase = createClient();
	const router = useRouter();

	useEffect(() => {
		supabase.auth
			.getSession()
			.then((response: { data: { session: Session | null } }) => {
				const { session } = response.data;
				setUser(session?.user ?? null);
			});

		const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
			setUser(session?.user ?? null);
		});

		return () => {
			listener.subscription.unsubscribe();
		};
	}, []);

	const signInOAuth = ({ provider }: { provider: Provider }) => {
		supabase.auth.signInWithOAuth({ provider, options: { redirectTo: "/" } });
	};

	const signOut = async () => {
		const res = await supabase.auth.signOut();
		if (res.error) {
			console.error(res.error);
		}
		setUser(null);
		router.push("/auth/login");
	};

	const signIn = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		const res = await supabase.auth.signInWithPassword({ email, password });
		if (res.error) {
			console.error(res.error);
			router.push("/auth/error");
		}
		if (res.data.session) {
			setUser(res.data?.session?.user ?? null);
			router.push("/");
		}
	};
	return (
		<AuthContext.Provider value={{ user, signInOAuth, signOut, signIn }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within the AuthProvider");
	}
	return context;
};
