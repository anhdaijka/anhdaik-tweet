import { siteConfig } from '@/configs/site'
import Home from '@/layouts/homepage/homepage'

export const metadata = {
	title: `${siteConfig.name} | ` + "Tweets",
	description: "Tweets",
}

const HomePage = async () => {
  return (
	<>
	  <Home/>
	</>
  )
}

export default HomePage
