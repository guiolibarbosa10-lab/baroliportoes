import type { Metadata } from "next";
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
            <h1 className="font-display text-5xl sm:text-6xl mb-8 text-baroli-gray-900">
              {empresa.anosExperiencia} anos de serralheria de alto padrão
            </h1>
            <p className="text-baroli-gray-600 leading-relaxed text-lg">
              {empresa.sobre}
            </p>
          </Reveal>

          {/* Painel de destaques no lugar da foto de portão */}
          <Reveal delay={0.15}>
            <div className="border border-baroli-gray-200 bg-baroli-blue-50 rounded-lg p-8 lg:p-10">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="font-display text-5xl text-baroli-blue leading-none">
                    {empresa.anosExperiencia}+
                  </p>
                  <p className="text-sm text-baroli-gray-600 mt-2">
                    anos de experiência
                  </p>
                </div>
                <div>
                  <p className="font-display text-5xl text-baroli-blue leading-none">
                    295+
                  </p>
                  <p className="text-sm text-baroli-gray-600 mt-2">
                    modelos de portões
                  </p>
                </div>
              </div>
              <div className="h-px bg-baroli-gray-200 mb-8" />
              <ul className="space-y-3">
                {empresa.diferenciais.slice(0, 5).map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-3 text-baroli-gray-700 text-sm"
                  >
                    <span className="text-baroli-blue font-bold">✔</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-baroli-gray-50 py-20 lg:py-28 border-y border-baroli-gray-200">
        <div className="container-baroli">
          <Reveal>
            <p className="eyebrow mb-4">O que fazemos</p>
            <h2 className="font-display text-4xl sm:text-5xl mb-14 text-baroli-gray-900">
              Especialização completa em estruturas metálicas
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {empresa.servicos.map((s, i) => (
              <Reveal key={s} delay={i * 0.06}>
                <div className="border border-baroli-gray-200 bg-white rounded-lg p-6 h-full shadow-sm hover:shadow-product-hover transition-shadow">
                  <span className="font-mono text-baroli-blue text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-baroli-gray-800">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
