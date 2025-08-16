
export const colors = {
  pastel: "var(--color-pastel)",
  vivid:  "var(--color-vivid)",
  light:  "var(--color-light)",
  dark:   "var(--color-dark)",
};

export function Container({ className = "", ...props }) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`} {...props} />;
}

export function Card({ className = "", bg = "#fff", border = "rgba(0,0,0,0.1)", ...props }) {
  return (
    <div
      className={`rounded-2xl shadow-sm ${className}`}
      style={{ backgroundColor: bg, border: `1px solid ${border}` }}
      {...props}
    />
  );
}

export function Badge({ className = "", bg = "var(--color-light)", fg = "var(--color-dark)", ...props }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}
      style={{ backgroundColor: bg, color: fg }}
      {...props}
    />
  );
}

export function Button({ className = "", variant = "primary", ...props }) {
  const styles =
    variant === "secondary"
      ? { backgroundColor: colors.pastel, color: colors.dark }
      : { backgroundColor: colors.vivid,  color: "#fff" };
  return (
    <button
      className={`px-5 py-3 rounded-2xl shadow hover:shadow-md transition
                  focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
      style={styles}
      {...props}
    />
  );
}
