import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

const paths: Record<string, ReactNodePathSet> = {
  pump: {
    viewBox: "0 0 24 24",
    children: (
      <>
        <circle cx="12" cy="13" r="6" />
        <path d="M12 7V3M9 3h6M18.5 9.5 21 7M4 15l-2 2" />
        <path d="M9.5 11.5 12 14l3-3" />
      </>
    ),
  },
  pipe: {
    viewBox: "0 0 24 24",
    children: (
      <>
        <path d="M3 8h11a3 3 0 0 1 3 3v5" />
        <circle cx="17" cy="16" r="3" />
        <path d="M3 8v4M3 6v0M3 10v0" />
      </>
    ),
  },
  fitting: {
    viewBox: "0 0 24 24",
    children: (
      <>
        <path d="M4 12h4M16 12h4M8 12a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2Z" />
        <path d="M8 9v6M16 9v6" />
      </>
    ),
  },
  sprinkler: {
    viewBox: "0 0 24 24",
    children: (
      <>
        <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
        <path d="M12 7v4M12 15h.01" />
      </>
    ),
  },
  system: {
    viewBox: "0 0 24 24",
    children: (
      <>
        <circle cx="12" cy="12" r="2" />
        <path d="M12 4v4M12 16v4M4 12h4M16 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" />
      </>
    ),
  },
  equipment: {
    viewBox: "0 0 24 24",
    children: (
      <>
        <rect x="3" y="10" width="13" height="7" rx="1" />
        <path d="M16 13h3l2 3v1h-5" />
        <circle cx="7.5" cy="19" r="1.5" />
        <circle cx="17.5" cy="19" r="1.5" />
      </>
    ),
  },
};

interface ReactNodePathSet {
  viewBox: string;
  children: ReactNode;
}

export function CategoryIcon({ icon, className }: { icon: string; className?: string }) {
  const def = paths[icon] ?? paths.system;
  return (
    <svg
      viewBox={def.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      {def.children}
    </svg>
  );
}
