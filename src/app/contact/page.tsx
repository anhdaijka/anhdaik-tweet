import { siteConfig } from "@/configs/site"
import Contact from "@/layouts/homepage/contact"

export const metadata = {
	title: `${siteConfig.name} | ` + "Contact",
	description: "Contact",
}

const ContactPage = async () => {
  return (
	<>
	  <Contact/>
	</>
  )
}

export default ContactPage
