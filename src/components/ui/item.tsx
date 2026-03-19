import * as React from "react";
import { cn } from "@/lib/utils";

function Item({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item"
      className={cn("flex flex-col gap-4 p-4", className)}
      {...props}
    />
  );
}

function ItemTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="item-title"
      className={cn(
        "text-sm leading-none font-semibold tracking-tight text-white sm:text-base",
        className
      )}
      {...props}
    />
  );
}

function ItemDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-description"
      className={cn(
        "text-white/50 flex max-w-[240px] flex-col gap-2 text-sm text-balance",
        className
      )}
      {...props}
    />
  );
}

function ItemIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-icon"
      className={cn("flex items-center self-start text-[#4A73D5]", className)}
      {...props}
    />
  );
}

export { Item, ItemDescription, ItemIcon, ItemTitle };
