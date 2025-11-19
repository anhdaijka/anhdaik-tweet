"use client";

import TweetCard, { TweetCardSkeleton } from "@/components/twitter-card";
import { getTweets } from "@/services/tweetQuery";
import { motion } from "motion/react";
import dayjs from "dayjs";
// 1. Import thêm useInfiniteQuery và các hook/component cần thiết
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMemo } from "react"; // Dùng để "làm phẳng" (flatten) dữ liệu
import EmptyMuted from "./empty";

const Following = () => {
	// 2. Đổi sang dùng useInfiniteQuery
	const {
		data,
		error,
		fetchNextPage, // Hàm để tải trang tiếp theo
		hasNextPage, // Biến boolean báo còn trang hay khôn
		isLoading, // Trạng thái tải lần đầu
		isFetchingNextPage, // Trạng thái tải các trang sau
	} = useInfiniteQuery({
		// 3. queryKey cần chứa cả điều kiện lọc
		queryKey: ["tweets", { tag: true }] as const, // Lọc các tweet có tag: true
		queryFn: getTweets, // Hàm getTweets đã cập nhật ở Bước 2
		initialPageParam: 0, // Bắt đầu từ trang 0
		getNextPageParam: (lastPage) => lastPage.nextPage, // Lấy trang tiếp theo
	});

	// 4. "Làm phẳng" mảng data từ useInfiniteQuery
	// data.pages là một mảng các trang, mỗi trang chứa 1 mảng data
	// [ {data: [...]}, {data: [...]}, ... ]
	const tweets = useMemo(
		() => data?.pages.flatMap((page) => page.data) ?? [],
		[data]
	);

	// 5. Giữ nguyên phần xử lý loading ban đầu
	if (isLoading)
		return Array.from({ length: 5 }, (_, i) => i).map((i) => (
			<TweetCardSkeleton key={i} />
		));

	if (error) return <div>{error.message}</div>;

	if (tweets.length === 0)
		return (
			<div className="text-center w-full max-w-screen-sm mx-auto py-20">
				No tweets found 😥
			</div>
		);

	// 6. Bọc danh sách tweet bằng InfiniteScroll
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			transition={{
				duration: 0.3,
				stiffness: 100,
				damping: 20,
				type: "spring",
				mass: 0.5,
			}}
		>
			<InfiniteScroll
				dataLength={tweets.length} // Số lượng tweet đang hiển thị
				next={fetchNextPage} // Hàm gọi khi cuộn xuống
				hasMore={hasNextPage} // Báo cho component biết còn dữ liệu hay không
				loader={<TweetCardSkeleton />} // Hiển thị khi đang tải thêm
				endMessage={
					// <div className="text-center w-full max-w-screen-sm mx-auto py-20">
					// 	You have reached the end 😥
					// </div>
					<EmptyMuted name="tweets" />
				}
			>
				{tweets.map((tweet) => (
					<TweetCard
						key={tweet.id}
						{...tweet}
						created_at={dayjs(tweet.created_at).format("h:mm A ・ MMM D, YYYY")}
					/>
				))}
			</InfiniteScroll>
		</motion.div>
	);
};

export default Following;
