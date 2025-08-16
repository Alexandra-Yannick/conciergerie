import "./globals.css";

export const metadata = {
  title: "Cap Conciergerie",
  description: "Questionnaire et modules — édition lancement",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className="
          min-h-screen antialiased
          text-[color:var(--color-dark)]
          bg-[linear-gradient(to_bottom,var(--color-light),#ffffff)]
        "
      >
        {/* Ici tu peux mettre un header global si tu veux */}
        {children}
        {/* Et un footer global si besoin */}
      </body>
    </html>
  );
}
