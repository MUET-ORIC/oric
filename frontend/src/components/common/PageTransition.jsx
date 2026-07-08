import { motion } from 'framer-motion';

const pageVariants = {
    initial: { opacity: 0, y: 10, scale: 0.99 },
    enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -10, scale: 0.99, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
};

export default function PageTransition({ children }) {
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            className="w-full"
        >
            {children}
        </motion.div>
    );
}