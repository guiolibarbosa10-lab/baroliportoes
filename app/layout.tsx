import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingTechnicalSupport from "@/components/FloatingTechnicalSupport";
import empresa from "../data/empresa.json";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jbmono",
  display: "swap",
});

const siteUrl = "https://www.baroliportoes.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${empresa.nome} | ${empresa.slogan}`,
    template: `%s | ${empresa.nome}`,
  },
  description: empresa.subtitulo,
  keywords: [
    "portões sob medida",
    "portão basculante",
    "portão deslizante",
    "portão pivotante",
    "serralheria São Paulo",
    "automação de portões",
    "Baroli Portões",
  ],
  openGraph: {
    title: `${empresa.nome} | ${empresa.slogan}`,
    description: empresa.subtitulo,
    url: siteUrl,
    siteName: empresa.nome,
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: empresa.nome,
    image: `${siteUrl}/images/catalogo/especial-pb_001.jpg`,
    telephone: empresa.telefonePrincipal,
    address: {
      "@type": "PostalAddress",
      streetAddress: empresa.endereco,
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    url: siteUrl,
    sameAs: [empresa.instagramUrl],
    description: empresa.sobre,
  };

  return (
    <html
      lang="pt-BR"
      className={`${bebas.variable} ${montserrat.variable} ${jbMono.variable}`}
    >
      <body className="font-body antialiased bg-white text-baroli-gray-900">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Header />
        <FloatingTechnicalSupport />

        <main className="pt-20">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
