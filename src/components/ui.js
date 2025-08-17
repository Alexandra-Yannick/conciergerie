"use client";

import Link from "next/link";

export const colors = {
  pastel: "var(--color-pastel)",
  vivid:  "var(--color-vivid)",
  light:  "var(--color-light)",
  dark:   "var(--color-dark)",
  // alias legacy pour vieux code
  darkText: "var(--color-dark)",
};

export function Container({ className = "", children, ...props }) {
  return (
    <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function Card({
  className = "",
  children,
  bg = "#fff",
  border = "rgba(0,0,0,0.1)",
  // aliases legacy
  bgColor,
  borderColor,
  style,
  ...props
}) {
  const _bg = bgColor ?? bg;
  const _border = borderColor ?? border;
  return (
    <div
      className={`rounded-2xl shadow-sm ${className}`}
      style={{ backgroundColor: _bg, border: `1px solid ${_border}`, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({
  className = "",
  children,
  bg = "var(--color-light)",
  fg = "var(--color-dark)",
  // aliases legacy
  bgColor,
  textColor,
  style,
  ...props
}) {
  const _bg = bgColor ?? bg;
  const _fg = textColor ?? fg;
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}
      style={{ backgroundColor: _bg, color: _fg, ...style }}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * Button polyvalent :
 * - si 'href' est fourni -> rend un lien (Link interne si href commence par "/")
 * - sinon -> rend un <button>
 */
export function Button({ className = "", variant = "primary", href, children, ...props }) {
  const styles =
    variant === "secondary"
      ? { backgroundColor: colors.pastel, color: colors.dark }
      : { backgroundColor: colors.vivid,  color: "#fff" };

const common = `
  inline-flex items-center justify-center gap-2
  px-5 py-3 rounded-2xl font-semibold
  shadow hover:shadow-md transition hover:-translate-y-[1px] active:translate-y-0
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
  ${className}
`;
  if (href) {
    const isInternal = typeof href === "string" && href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} className={common} style={styles} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={common} style={styles} rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={common} style={styles} {...props}>
      {children}
    </button>
  );
}
