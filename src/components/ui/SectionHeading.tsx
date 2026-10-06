import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 text-xs font-semibold uppercase tracking-[0.25em]",
            tone === "dark" ? "text-moss-600" : "text-moss-300"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl",
          tone === "dark" ? "text-ink-900" : "text-ivory-50",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-ink-700" : "text-ivory-200"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
