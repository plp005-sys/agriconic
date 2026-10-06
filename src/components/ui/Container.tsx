import type { ElementType, ReactNode } from "react";
import { cn } from "../../utils/cn";

export function Container({
  children,
  className,
  as,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const Tag: ElementType = as ?? "div";
  return <Tag className={cn("mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12", className)}>{children}</Tag>;
}
