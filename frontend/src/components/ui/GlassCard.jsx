import { cn } from "../../lib/utils";

export function GlassCard({ children, className, ...props }) {
  return (
    <div className={cn("bg-white border border-hairline rounded-[24px] p-6 transition-all duration-200", className)} {...props}>
      {children}
    </div>
  );
}
