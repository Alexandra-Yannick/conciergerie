import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat", // utilisé par Tailwind: font-sans -> var(--font-montserrat)
});

export const metadata = {
  title: "Cap Conciergerie",
  description: "Questionnaire et modules — Édition lancement",
  // robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={montserrat.variable}>
<body className={`${montserrat.className} min-h-screen antialiased`}>        {children}
      </body>
    </html>
  );
}
