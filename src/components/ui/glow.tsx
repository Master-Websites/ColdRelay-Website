import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "@/lib/utils";

const glowVariants = cva("absolute w-full", {
  variants: {
    variant: {
      top: "top-0",
      above: "-top-[128px]",
      bottom: "bottom-0",
      below: "-bottom-[128px]",
      center: "top-[50%]",
    },
  },
  defaultVariants: {
    variant: "top",
  },
});

function Glow({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof glowVariants>) {
  return (
    <div
      data-slot="glow"
      className={cn(glowVariants({ variant }), className)}
      {...props}
    >
      <div
        className={cn(
          "absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(circle,rgba(74,115,213,0.4)_10%,transparent_60%)] opacity-100 sm:h-[512px]",
          variant === "center" && "-translate-y-1/2"
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-200 rounded-[50%] bg-[radial-gradient(circle,rgba(107,143,230,0.25)_10%,transparent_60%)] opacity-100 sm:h-[256px]",
          variant === "center" && "-translate-y-1/2"
        )}
      />
    </div>
  );
}

export default Glow;
