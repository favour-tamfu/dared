import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "white" | "outlineLight";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-crimson-400 disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-crimson-500 text-white shadow-sm hover:bg-crimson-600 hover:shadow-md hover:-translate-y-0.5",
  secondary:
    "border border-velvet-600 text-velvet-700 hover:bg-velvet-600 hover:text-white",
  ghost: "text-velvet-700 hover:bg-velvet-50",
  white:
    "bg-white text-crimson-700 shadow-sm hover:bg-cream hover:shadow-md hover:-translate-y-0.5",
  outlineLight: "border border-white/60 text-white hover:bg-white hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkProps = BaseProps & {
  href: string;
  external?: boolean;
};

type ButtonProps = BaseProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.href !== undefined) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
