import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

const Navigation: React.FC<{
	currentView: string;
	onViewChange: (view: string) => void;
}> = ({ currentView, onViewChange }) => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const navItems = [
		{ id: "home", label: "Home" },
		{ id: "about", label: "About" },
		{ id: "blog", label: "Blog" },
		{ id: "contact", label: "Contact" },
	];

	return (
		<nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className="font-bold text-xl"
					>
						DevBlog
					</motion.div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex space-x-8">
						{navItems.map((item) => (
							<button
								key={item.id}
								onClick={() => onViewChange(item.id)}
								className={`px-3 py-2 text-sm font-medium transition-colors relative ${
									currentView === item.id
										? "text-foreground"
										: "text-muted-foreground hover:text-foreground"
								}`}
								aria-current={currentView === item.id ? "page" : undefined}
							>
								{item.label}
								{currentView === item.id && (
									<motion.div
										layoutId="activeTab"
										className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
									/>
								)}
							</button>
						))}
					</div>

					{/* Mobile Menu Button */}
					<Button
						variant="ghost"
						size="sm"
						className="md:hidden"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label="Toggle menu"
					>
						{mobileMenuOpen ? (
							<X className="h-5 w-5" />
						) : (
							<Menu className="h-5 w-5" />
						)}
					</Button>
				</div>

				{/* Mobile Navigation */}
				<AnimatePresence>
					{mobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="md:hidden border-t"
						>
							<div className="py-4 space-y-2">
								{navItems.map((item) => (
									<button
										key={item.id}
										onClick={() => {
											onViewChange(item.id);
											setMobileMenuOpen(false);
										}}
										className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
											currentView === item.id
												? "text-foreground bg-muted"
												: "text-muted-foreground hover:text-foreground hover:bg-muted"
										}`}
									>
										{item.label}
									</button>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</nav>
	);
};

export default Navigation;
