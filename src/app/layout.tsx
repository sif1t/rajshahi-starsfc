import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rajshahi Stars FC | Official Website",
  description:
    "Official website of Rajshahi Stars FC — the pride of Rajshahi. Follow the latest news, squad updates, match results, and more from Bangladesh's premier women's football club.",
  keywords:
    "Rajshahi Stars FC, football, Bangladesh, women's football, SAFF, futsal, squad, matches",
  openGraph: {
    title: "Rajshahi Stars FC | Official Website",
    description:
      "Official website of Rajshahi Stars FC — Bangladesh's premier women's football club.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
