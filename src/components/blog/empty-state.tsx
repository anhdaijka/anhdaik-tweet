import { motion } from "motion/react";
import { Search } from "lucide-react";

const EmptyState: React.FC = () => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		className="text-center py-16"
	>
		<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
			<Search className="h-8 w-8 text-muted-foreground" />
		</div>
		<h3 className="text-lg font-semibold mb-2">No posts found</h3>
		<p className="text-muted-foreground">
			Try adjusting your search or check back later for new content.
		</p>
	</motion.div>
);

export default EmptyState;
