import { Variants } from 'framer-motion';

const fadeInUpEasing = [0.6, -0.05, 0.01, 0.99];

export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: fadeInUpEasing,
    },
  },
};

export const stagger = (staggerChildren = 0.3): Variants => ({
  animate: {
    transition: {
      staggerChildren,
    },
  },
});
