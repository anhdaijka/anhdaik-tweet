import React from "react";

const PostPageParams = ({ params }: { params: { slug: string[] } }) => {
	return <div>Post: {params.slug.join("/")}</div>;
};

const PostPage = () => {
	return <div>Hello</div>;
};

export default PostPage;
