export const parentVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0.2,
			staggerChildren: 0.2,
			staggerDirection: 1,
			type: "spring",
		},
	},
};

export const childVariants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
};
