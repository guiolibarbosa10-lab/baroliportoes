import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "../../components/Reveal";
import empresa from "../../data/empresa.json";

export const metadata: Metadata = {
  title: "Sobre nós",
  description: empresa.sobre,
};

export default function SobrePage() {
  return (
    <div>
      <section className="container-baroli py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="eyebrow mb-4">Quem somos</p>
            <h1 className="font-display text-5xl sm:text-6xl mb-8">
              {empresa.anosExperiencia} anos de serralheria de alto padrão
            </h1>
            <p className="text-white/70 leading-relaxed text-lg">{empresa.sobre}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] border border-white/10 bg-black">
              <Image
                src="/images/catalogo/prime-pb_270.jpg"
                alt="Portão instalado pela Baroli"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-xs text-white/30 mt-3">
              Foto de equipe, oficina e instalações reais podem substituir esta
              imagem — veja o README.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-baroli-gray-900/40 py-20 lg:py-28 border-y border-white/10">
        <div className="container-baroli">
          <Reveal>
            <p className="eyebrow mb-4">O que fazemos</p>
            <h2 className="font-display text-4xl sm:text-5xl mb-14">
              Especialização completa em estruturas metálicas
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {empresa.servicos.map((s, i) => (
              <Reveal key={s} delay={i * 0.06}>
                <div className="border border-white/10 p-6 h-full">
                  <span className="font-mono text-baroli-blue text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-white/85">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
