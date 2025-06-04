"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

// Common animation variants
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

// Reusable motion components
interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  viewportMargin?: string;
  viewportOnce?: boolean;
}

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  viewportMargin = "-100px",
  viewportOnce = true,
  ...props
}: FadeInProps) => {
  const getInitialValue = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 20 };
      case "down":
        return { opacity: 0, y: -20 };
      case "left":
        return { opacity: 0, x: 30 };
      case "right":
        return { opacity: 0, x: -30 };
      default:
        return { opacity: 0, y: 20 };
    }
  };

  const getFinalValue = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialValue()}
      whileInView={getFinalValue()}
      viewport={{ once: viewportOnce, margin: viewportMargin }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Hover animation component
interface HoverScaleProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  scale?: number;
  duration?: number;
}

export const HoverScale = ({
  children,
  scale = 1.05,
  duration = 0.2,
  ...props
}: HoverScaleProps) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: scale * 0.95 }}
      transition={{ duration }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Stagger container for child animations
interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  staggerDelay?: number;
  viewportMargin?: string;
  viewportOnce?: boolean;
}

export const StaggerContainer = ({
  children,
  staggerDelay = 0.2,
  viewportMargin = "-100px",
  viewportOnce = true,
  ...props
}: StaggerContainerProps) => {
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, margin: viewportMargin }}
      variants={staggerVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Animated button with hover effect
interface AnimatedButtonProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  scale?: number;
}

export const AnimatedButton = ({
  children,
  scale = 1.05,
  ...props
}: AnimatedButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
