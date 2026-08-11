import type { Metadata } from "next";
import Reveal from "../../components/Reveal";
import empresa from "../../data/empresa.json";
import { linkWhatsApp } from "../../lib/whatsapp";

export const metadata: Metadata = {
  title: "Automação de Portões",
  description:
    "Instalação e manutenção de motores, fechaduras elétricas e controles de acesso para portões residenciais, comerciais e prediais.",
};

export default function AutomacaoPage() {
  return (
    <div className="container-baroli py-16 lg:py-24">
      <Reveal>
        <p className="eyebrow mb-4">Automação e segurança</p>
        <h1 className="font-display text-5xl sm:text-6xl mb-6 max-w-3xl text-baroli-gray-900">
          Praticidade e segurança para o seu dia a dia
        </h1>
        <p className="text-baroli-gray-600 max-w-2xl mb-16">
          Oferecemos soluções completas em instalação e manutenção de sistemas de
          automação de portões, garantindo mais praticidade, segurança e
          eficiência para sua residência ou empresa.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <Reveal>
          <h2 className="font-display text-3xl mb-8 text-baroli-gray-900">
            Nossos serviços
          </h2>
          <ul className="space-y-4">
            {empresa.servicosAutomacao.map((s) => (
              <li
                key={s}
                className="flex items-start gap-3 text-baroli-gray-700"
              >
                <span className="text-baroli-blue mt-0.5 font-bold">✔</span>
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="border border-baroli-gray-200 bg-white rounded-lg shadow-product p-8">
            <h2 className="font-display text-3xl mb-6 text-baroli-gray-900">
              Manutenção preventiva
            </h2>
            <p className="text-baroli-gray-600 leading-relaxed mb-8">
              Além da instalação, realizamos manutenção corretiva e preventiva,
              aumentando a vida útil dos equipamentos e evitando imprevistos.
              Atendemos ambientes residenciais, comerciais e prediais, sempre com
              qualidade, agilidade e confiança.
            </p>
            <a
              href={linkWhatsApp(
                "Olá! Quero saber mais sobre automação de portões e motores."
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-baroli-blue text-white rounded-md px-8 py-4 text-sm uppercase tracking-widest2 hover:bg-baroli-blue-dark transition-colors"
            >
              Falar com um especialista
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
