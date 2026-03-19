import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const beamVariants = cva(
  "relative after:content-[''] after:absolute after:inset-0 after:rounded-full after:scale-200",
  {
    variants: {
      tone: {
        default:
          "after:bg-[radial-gradient(circle,rgba(255,255,255,0.1)_10%,transparent_60%)]",
        brand:
          "after:bg-[radial-gradient(circle,rgba(74,115,213,0.3)_10%,transparent_60%)]",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  }
);

function Beam({
  className,
  tone,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof beamVariants>) {
  return (
    <div
      data-slot="beam"
      className={cn(beamVariants({ tone, className }))}
      {...props}
    />
  );
}

export { Beam, beamVariants };
