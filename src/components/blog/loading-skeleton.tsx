import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton: React.FC = () => (
	<div className="space-y-6">
		{[...Array(3)].map((_, i) => (
			<Card key={i} className="overflow-hidden">
				<CardHeader>
					<Skeleton className="h-6 w-3/4" />
					<Skeleton className="h-4 w-1/2" />
				</CardHeader>
				<CardContent>
					<Skeleton className="h-4 w-full mb-2" />
					<Skeleton className="h-4 w-2/3" />
				</CardContent>
			</Card>
		))}
	</div>
);

export default LoadingSkeleton;
