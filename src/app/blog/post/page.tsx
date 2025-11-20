import { siteConfig } from '@/configs/site'
import Posts from '@/layouts/blog/posts'

export const metadata = {
	title: `${siteConfig.name} | ` + "Latest Posts from anhdaijka",
	description: "Blog",
}

const PostPage = async () => {
  return (
	<>
	  <Posts/>
	</>
  )
}

export default PostPage
