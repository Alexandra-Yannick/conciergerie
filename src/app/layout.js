import "./globals.css";

export const metadata = {
  title: "Cap Conciergerie",
  description: "Questionnaire et modules — Édition lancement",
  // robots: { index: false, follow: false }, // décommente si tu veux bloquer Google
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen antialiased">
        {/* Header global (facultatif) */}
        {/* <header className="py-4">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <a href="/" className="font-semibold">Cap Conciergerie</a>
            <nav className="text-sm">
              <a className="mr-4 hover:underline" href="/quiz">Quiz</a>
              <a className="hover:underline" href="/offre">Offre</a>
            </nav>
          </div>
        </header> */}

        {children}

        {/* Footer global (facultatif) */}
        {/* <footer className="py-10">
          <p className="text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} — Cap Conciergerie. Tous droits réservés.
          </p>
        </footer> */}
      </body>
    </html>
  );
}
