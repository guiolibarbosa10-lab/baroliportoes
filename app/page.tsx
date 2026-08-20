import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import Avaliacoes from "@/components/Avaliacoes";
import { produtos, linhas } from "@/lib/products";
import empresa from "@/data/empresa.json";
import Link from "next/link";

export default function HomePage() {
  const destaques = [
    produtos.find((p) => p.id === "prime-pb_265"),
    produtos.find((p) => p.id === "especial-pb_003"),
    produtos.find((p) => p.id === "prime-pb_270"),
    produtos.find((p) => p.id === "padrao-pb_042"),
  ].filter(Boolean) as typeof produtos;

  return (
    <>
      <Hero />

      {/* LINHAS */}
      <section className="container-baroli py-24 lg:py-32">
        <Reveal>
          <p className="eyebrow mb-4">O catálogo</p>
          <h2 className="font-display text-4xl sm:text-5xl mb-16 max-w-2xl text-baroli-gray-900">
            Três linhas. {produtos.length} modelos reais em fabricação.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {linhas.map((linha, i) => (
            <Reveal key={linha.valor} delay={i * 0.1}>
              <Link
                href={`/catalogo?linha=${linha.valor}`}
                className="group block h-full border border-baroli-gray-200 bg-white rounded-lg p-8 hover:border-baroli-blue transition-colors shadow-sm hover:shadow-product-hover"
              >
                <span className="font-mono text-baroli-blue text-sm">0{i + 1}</span>
                <h3 className="font-display text-3xl mt-4 mb-4 text-baroli-gray-900">
                  {linha.nome}
                </h3>
                <p className="text-baroli-gray-600 text-sm leading-relaxed mb-8">
                  {linha.descricao}
                </p>
                <span className="text-xs uppercase tracking-widest2 text-baroli-blue">
                  Explorar modelos →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="bg-baroli-gray-50 py-24 lg:py-32">
        <div className="container-baroli">
          <Reveal>
            <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
              <div>
                <p className="eyebrow mb-4">Selecionados do catálogo</p>
                <h2 className="font-display text-4xl sm:text-5xl text-baroli-gray-900">
                  Modelos em destaque
                </h2>
              </div>
              <Link
                href="/catalogo"
                className="text-sm uppercase tracking-widest2 border-b border-baroli-blue pb-1 text-baroli-gray-700 hover:text-baroli-blue transition-colors"
              >
                Ver catálogo completo
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destaques.map((produto, i) => (
              <Reveal key={produto.id} delay={i * 0.08}>
                <ProductCard produto={produto} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULADORA CTA */}
      <section className="container-baroli py-24 lg:py-32">
        <Reveal>
          <div className="relative overflow-hidden border border-baroli-gray-200 bg-baroli-blue-50 rounded-lg px-8 py-16 lg:px-20 lg:py-24 text-center">
            <p className="eyebrow mb-4 relative">Configurador de orçamento</p>
            <h2 className="font-display text-4xl sm:text-5xl mb-6 relative max-w-2xl mx-auto text-baroli-gray-900">
              Simule o investimento do seu portão em menos de 2 minutos
            </h2>
            <p className="text-baroli-gray-600 max-w-xl mx-auto mb-10 relative">
              Escolha tipo, medidas, material e automação — receba uma estimativa
              e envie direto para o nosso WhatsApp.
            </p>
            <Link
              href="/calculadora"
              className="relative inline-block bg-baroli-blue text-white rounded-md px-10 py-4 text-sm uppercase tracking-widest2 hover:bg-baroli-blue-dark transition-colors"
            >
              Calcular meu orçamento
            </Link>
          </div>
        </Reveal>
      </section>

      {/* DIFERENCIAIS */}
      <section className="bg-white py-24 lg:py-32 border-t border-baroli-gray-200">
        <div className="container-baroli">
          <Reveal>
            <p className="eyebrow mb-4">Por que a Baroli</p>
            <h2 className="font-display text-4xl sm:text-5xl mb-16 max-w-2xl text-baroli-gray-900">
              {empresa.anosExperiencia}+ anos transformando fachadas em segurança
              e estética
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
            {empresa.diferenciais.map((d, i) => (
              <Reveal key={d} delay={i * 0.05}>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-baroli-blue text-xs mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-baroli-gray-700 text-sm">{d}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AVALIACOES */}
      <section className="container-baroli py-24 lg:py-32">
        <Reveal>
          <p className="eyebrow mb-4">Avaliações</p>
          <h2 className="font-display text-4xl sm:text-5xl mb-14 text-baroli-gray-900">
            O que dizem nossos clientes
          </h2>
        </Reveal>
        <Avaliacoes />
      </section>
    </>
  );
}
