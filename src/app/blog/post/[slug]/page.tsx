import React from 'react'

interface PostPageProps {
	params: Promise<{
		slug: string;
	}>;
}
const PostPage = async ({params}:PostPageProps) => {
    const {slug} = await params;
  return (
    <div>
      {slug}
    </div>
  )
}

export default PostPage
