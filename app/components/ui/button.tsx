import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-md font-inter font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-primary text-primary hover:text-white before:absolute before:bottom-0 before:-left-20 before:-top-10 before:z-[-99] before:h-48 before:w-8 before:bg-orange-500 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-96 relative z-50 bg-neutral-50 overflow-hidden before:rotate-12 hover:before:rotate-12 hover:before:-left-5",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "border bg-neutral-800 dark:bg-neutral-200 border-neutral-200 dark:border-neutral-900 dark:text-neutral-900 text-neutral-200 hover:text-white before:absolute before:bottom-0 before:-left-20 before:-top-10 before:z-[-99] before:h-48 before:w-8 before:bg-neutral-900 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-96 relative z-50  overflow-hidden before:rotate-12 hover:before:rotate-12 hover:before:-left-5",
        secondaryNoAnimation:
          "border bg-neutral-800 dark:bg-neutral-200 border-neutral-200 dark:border-neutral-900 text-background px-8",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        onDark:
          "border-y border-neutral-800 dark:border-neutral-200 py-8 text-foreground px-12",
      },
      size: {
        default: "h-12 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, asChild = false, ...props}, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({variant, size, className}))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export {Button, buttonVariants};
