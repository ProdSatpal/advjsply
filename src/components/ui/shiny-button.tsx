
"use client";

import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.button
      initial={{ scale: 0.98 }}
      animate={{ scale: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 10,
      }}
      {...props}
      className={cn(
        "relative rounded-lg px-6 py-3 font-medium text-white transition-shadow duration-300 ease-in-out hover:shadow bg-[#4285F4] hover:bg-[#3b78dc]",
        className
      )}
    >
      {children}
    </motion.button>
  );
};

export default { ShinyButton };
