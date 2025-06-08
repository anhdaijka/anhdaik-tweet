import { CodeBlockProps } from "@/types";
import { useState } from "react";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";

const CodeBlock: React.FC<CodeBlockProps> = ({
	children,
	language = "javascript",
}) => {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(children);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="relative group">
			<div className="flex items-center justify-between bg-muted px-4 py-2 rounded-t-lg border border-b-0">
				<span className="text-sm text-muted-foreground font-mono">
					{language}
				</span>
				<Button
					variant="ghost"
					size="sm"
					onClick={copyToClipboard}
					className="opacity-0 group-hover:opacity-100 transition-opacity"
					aria-label="Copy code"
				>
					{copied ? (
						<Check className="h-4 w-4" />
					) : (
						<Copy className="h-4 w-4" />
					)}
				</Button>
			</div>
			<pre className="bg-muted/50 p-4 rounded-b-lg border overflow-x-auto">
				<code className="text-sm font-mono">{children}</code>
			</pre>
		</div>
	);
};

export default CodeBlock;
