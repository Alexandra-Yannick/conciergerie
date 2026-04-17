import "./globals.css";
import { Montserrat } from "next/font/google";
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat", // utilisé par Tailwind: font-sans -> var(--font-montserrat)
});

export const metadata = {
  title: "Lancer sa conciergerie – Formation complète | Cap Conciergerie",
  description: "Découvrez la méthode pas-à-pas pour créer et rentabiliser votre activité de conciergerie. 29 h de contenu actionnable, fiches pratiques et quiz personnalisé pour vous lancer sereinement.",
  other: {
    'Content-Security-Policy': 'upgrade-insecure-requests',
  },// robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={montserrat.variable}>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TJHT2C77');`,
          }}
        />
      </head>
      <body className={`${montserrat.className} min-h-screen antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TJHT2C77"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
