import { Button } from "@/components/ui/button";
import React from "react";

const ContactForm = () => {
	return (
		<section className="w-full h-[80vh] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[40px] shadow-md p-[40px] rounded-xl py-12 my-12">
			{/* form area */}
			<form className="w-full">
				<div className="text-foreground">
					<h1 className="text-[2rem] font-[600] leading-[35px]">
						Get in <span className="text-primary">touch</span>
					</h1>
					<p className="text-[0.9rem] mt-2 mb-8">
						Let&#39;s align our constellations! Reach out and let the magic of
						collaboration illuminate our skies.
					</p>
				</div>

				<div className="flex sm:flex-row flex-col items-center gap-[20px]">
					<div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
						<input
							type="text"
							placeholder="Your name"
							className="peer border-border placeholder:text-primary/50 border rounded-md outline-none px-4 py-3 w-full text-primary transition-colors duration-300"
						/>
					</div>

					<div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
						<input
							type="email"
							placeholder="Email address"
							className="peer border-border placeholder:text-primary/50 border rounded-md outline-none px-4 py-3 w-full text-primary transition-colors duration-300"
						/>
					</div>
				</div>

				<div className="flex flex-col gap-[5px] w-full mt-[20px]">
					<textarea
						placeholder="Write message"
						rows={5}
						className="peer border-border placeholder:text-primary/50 min-h-[200px] border rounded-md outline-none px-4 py-3 w-full text-primary transition-colors duration-300"
					></textarea>
				</div>

				<Button
					type="submit"
					variant="outline"
					size="lg"
					className="w-full text-primary"
				>
					Submit
				</Button>
			</form>

			{/*  image  */}
			<div className="h-full">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5063419425232!2d105.52271427519923!3d21.012416680632857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc60e7d3f19%3A0x2be9d7d0b5abcbf4!2sFPT%20University!5e0!3m2!1sen!2sbd!4v1749187958510!5m2!1sen!2sbd"
					allowFullScreen
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					className="w-full h-full rounded-md"
				></iframe>
			</div>
		</section>
	);
};

export default ContactForm;
