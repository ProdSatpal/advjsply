
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

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
    <Button
      {...props}
      className={cn(
        "relative rounded-lg px-6 py-3 font-medium text-white transition-colors duration-300 ease-in-out hover:shadow bg-[#4285F4] hover:bg-[#3b78dc]",
        className
      )}
    >
      {children}
    </Button>
  );
};

export default { ShinyButton };
