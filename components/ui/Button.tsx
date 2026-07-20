import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base = [
  "btn",
  "inline-flex max-w-full min-h-12 items-center justify-center px-5 sm:px-7",
  "rounded-[2px] text-center text-[11px] sm:text-[12px] font-semibold tracking-[0.1em] sm:tracking-[0.12em] uppercase",
  "whitespace-normal break-words lg:whitespace-nowrap lg:break-normal",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AA6851] focus-visible:ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-55 disabled:pointer-events-none disabled:shadow-none",
].join(" ");

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
  external?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export default function Button({
  children,
  variant = "primary",
  className = "",
  href,
  external,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  const classes = [base, variants[variant], className].filter(Boolean).join(" ");

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={disabled || undefined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={classes}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
