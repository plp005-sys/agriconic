import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "../../utils/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out focus-visible:outline-offset-4 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants = {
  primary: "bg-ink-900 text-ivory-50 hover:bg-moss-700 active:scale-[0.98]",
  light: "bg-ivory-50 text-ink-900 hover:bg-ivory-200 active:scale-[0.98]",
  outline: "border border-ink-900/20 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-ivory-50",
  outlineLight: "border border-ivory-50/40 text-ivory-50 hover:bg-ivory-50 hover:text-ink-900",
  ghost: "text-ink-900 hover:bg-ink-900/5",
  whatsapp: "bg-moss-600 text-ivory-50 hover:bg-moss-700 active:scale-[0.98]",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button"; href?: undefined; to?: undefined };
type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string; to?: undefined };
type ButtonAsLink = CommonProps & Omit<LinkProps, "className"> & { as: "link"; to: string; href?: undefined };

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", children, className, icon } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.as === "a") {
    const { as: _as, variant: _v, size: _s, icon: _i, children: _c, className: _cl, ...rest } = props;
    return (
      <a className={classes} {...rest}>
        {children}
        {icon}
      </a>
    );
  }

  if (props.as === "link") {
    const { as: _as, variant: _v, size: _s, icon: _i, children: _c, className: _cl, ...rest } = props;
    return (
      <Link className={classes} {...rest}>
        {children}
        {icon}
      </Link>
    );
  }

  const { as: _as, variant: _v, size: _s, icon: _i, children: _c, className: _cl, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
      {icon}
    </button>
  );
}
