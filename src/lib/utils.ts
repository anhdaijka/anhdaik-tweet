import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function calculateReadingTime(text: string) {
	const wordsPerMinute = 225; // Average adult reading speed (adjust as needed)

	// Remove leading/trailing whitespace and split the text by one or more whitespace characters
	const words = text.trim().split(/\s+/);

	// Get the total number of words
	const wordCount = words.length;

	// Calculate the raw reading time in minutes
	const rawMinutes = wordCount / wordsPerMinute;

	// Round up to the nearest whole minute
	const estimatedMinutes = Math.ceil(rawMinutes);

	return estimatedMinutes;
}
