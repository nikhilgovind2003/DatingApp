import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

// ─── FormItem ─────────────────────────────────────────────────────────────────
function FormItem({ className, ...props }) {
  return (
    <div
      data-slot="form-item"
      className={cn("space-y-2", className)}
      {...props}
    />
  );
}

// ─── FormLabel ────────────────────────────────────────────────────────────────
function FormLabel({ className, error, ...props }) {
  return (
    <Label
      data-slot="form-label"
      className={cn(error && "text-destructive", className)}
      {...props}
    />
  );
}

// ─── FormDescription ──────────────────────────────────────────────────────────
function FormDescription({ className, ...props }) {
  return (
    <p
      data-slot="form-description"
      className={cn("text-muted-foreground text-xs", className)}
      {...props}
    />
  );
}

// ─── FormMessage ──────────────────────────────────────────────────────────────
function FormMessage({ className, children, ...props }) {
  if (!children) return null;

  return (
    <p
      data-slot="form-message"
      className={cn("text-destructive text-xs font-medium", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export { FormItem, FormLabel, FormDescription, FormMessage };
