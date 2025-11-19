export const parentVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
            staggerDirection: 1,
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

export const slideRight = {
	hidden: {
		opacity: 0,
		x: -100,
	},
	visible: {
		opacity: 1,
		x: 0,
	},
};
export const slideLeft = {
	hidden: {
		opacity: 0,
		x: 100,
	},
	visible: {
		opacity: 1,
		x: 0,
	},
};

export const fromTop = {
	hidden: {
		opacity: 0,
		y: -100,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
};

export const fromBottom = {
	hidden: {
		opacity: 0,
		y: 100,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
};

export const fallBounce = {
	hidden: {
		opacity: 0,
		y: 100,
	},
	visible: {
		opacity: 1,
		y: [-50, 80, -20, 10, -10, 5, 0],
	},
};

export const appear = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
};
