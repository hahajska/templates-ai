import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

export function Breadcrumb({ children, ...props }) {
  return (
    <nav aria-label="breadcrumb" {...props}>
      {children}
    </nav>
  );
}

export function BreadcrumbList({ className, children, ...props }) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className
      )}
      {...props}
    >
      {children}
    </ol>
  );
}

export function BreadcrumbItem({ className, children, ...props }) {
  return (
    <li
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    >
      {children}
    </li>
  );
}

export function BreadcrumbLink({ className, children, ...props }) {
  return (
    <a
      className={cn(
        "transition-colors hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function BreadcrumbPage({ className, children, ...props }) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    >
      {children}
    </span>
  );
}

export function BreadcrumbSeparator({ className, children, ...props }) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children || <ChevronRight />}
    </li>
  );
}
