import { siteConfig } from "@/configs/site"
import Blog from "@/layouts/blog/blog"

export const metadata = {
	title: `${siteConfig.name} | `+"Featured Posts from anhdaijka",
	description: "Blog",
}

const BlogPage = async () => {
  return (
	<>
	  <Blog/>
	</>
  )
}

export default BlogPage
