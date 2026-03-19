import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 gap-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#4A73D5] text-white",
        brand: "border-transparent bg-[#4A73D5]/20 text-[#6B8FE6]",
        secondary: "border-transparent bg-white/5 text-white/70",
        outline: "border-white/10 text-white/80",
      },
      size: {
        default: "px-3 py-1.5",
        sm: "px-2 py-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
