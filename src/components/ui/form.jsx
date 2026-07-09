import PropTypes from "prop-types";
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

FormItem.propTypes = {
  className: PropTypes.string,
};

// ─── FormLabel ────────────────────────────────────────────────────────────────
function FormLabel({ className, error, ...props }) {
  return (
    <Label
      data-slot="form-label"
      className={cn(error && "text-red-500", className)}
      {...props}
    />
  );
}

FormLabel.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
};

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

FormDescription.propTypes = {
  className: PropTypes.string,
};

// ─── FormMessage ──────────────────────────────────────────────────────────────
function FormMessage({ className, children, ...props }) {
  if (!children) return null;

  return (
    <p
      data-slot="form-message"
      className={cn("text-red-500 text-xs font-medium", className)}
      {...props}
    >
      {children}
    </p>
  );
}

FormMessage.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export { FormItem, FormLabel, FormDescription, FormMessage };
