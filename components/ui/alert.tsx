import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AlertProps {
  children: ReactNode;
  variant?: "default" | "destructive";
  className?: string;
}

export function Alert({ className, variant = "default", children }: AlertProps) {
  return (
    <div className={cn("relative w-full rounded-lg border p-4", variant === "destructive" ? "border-destructive/50 text-destructive dark:border-destructive" : "border-background", className)}>
      {children}
    </div>
  );
}

export function AlertDescription({ children }: { children: ReactNode }) {
  return <div className="text-sm [&_p]:leading-relaxed">{children}</div>;
}
