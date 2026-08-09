import type { Metadata } from "next";
import Reveal from "../../components/Reveal";
import empresa from "../../data/empresa.json";
import { linkWhatsApp } from "../../lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com a ${empresa.nome}: ${empresa.telefonePrincipal} · ${empresa.endereco}`,
};

export default function ContatoPage() {
  const mapaSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    empresa.endereco
  )}&output=embed`;

  return (
    <div className="container-baroli py-16 lg:py-24">
      <Reveal>
        <p className="eyebrow mb-4">Fale com a gente</p>
        <h1 className="font-display text-5xl sm:text-6xl mb-14">Contato</h1>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Reveal>
          <div className="space-y-8">
            <InfoItem label="Telefone">{empresa.telefonePrincipal}</InfoItem>
            <InfoItem label="WhatsApp">{empresa.whatsapp}</InfoItem>
            <InfoItem label="Endereço">{empresa.endereco}</InfoItem>
            <InfoItem label="Instagram">
              <a
                href={empresa.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-baroli-blue transition-colors"
              >
                {empresa.instagram}
              </a>
            </InfoItem>

            <a
              href={linkWhatsApp(
                "Olá! Vim pelo site da Baroli Portões e gostaria de mais informações."
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-baroli-blue px-8 py-4 text-sm uppercase tracking-widest2 hover:bg-baroli-blue-dark transition-colors"
            >
              Falar no WhatsApp agora
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[360px] border border-white/10">
            <iframe
              src={mapaSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa - Baroli Portões"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function InfoItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest2 text-white/40 mb-1">{label}</p>
      <p className="text-xl text-white/90">{children}</p>
    </div>
  );
}
