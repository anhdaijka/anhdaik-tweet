import TweetCard from "@/components/twitter-card";
import { tweets } from "./posts";

export default function Likes() {
	return (
		<>
			<TweetCard tweet={tweets[1]} />
			<TweetCard tweet={tweets[2]} />;
		</>
	);
}
