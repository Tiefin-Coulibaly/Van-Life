"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimationWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimationWrapper = ({ children, className = "", delay = 0.1 }: AnimationWrapperProps) => {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname} 
      variants={{
        hidden: {
          opacity: 0,
          y: -20,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 1, delay: delay }}
      viewport={{ once: true }}
      className={`animate_top ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;