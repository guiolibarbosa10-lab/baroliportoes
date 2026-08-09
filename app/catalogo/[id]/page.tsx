import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { produtos, getProdutoPorId, getProdutosPorLinha, campoOuIndefinido } from "../../../lib/products";
import { linkWhatsApp, mensagemProduto } from "../../../lib/whatsapp";
import ProductCard from "../../../components/ProductCard";
import Reveal from "../../../components/Reveal";

export function generateStaticParams() {
  return produtos.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const produto = getProdutoPorId(params.id);
  if (!produto) return {};
  return {
    title: `${produto.codigo} — ${produto.linhaNome}`,
    description: `Portão ${produto.codigo} da ${produto.linhaNome} da Baroli Portões. Peça orçamento sob medida.`,
  };
}

export default function ProdutoPage({ params }: { params: { id: string } }) {
  const produto = getProdutoPorId(params.id);
  if (!produto) notFound();

  const semelhantes = getProdutosPorLinha(produto.linha)
    .filter((p) => p.id !== produto.id)
    .slice(0, 4);

  const especificacoes: { label: string; valor: string | number }[] = [
    { label: "Código", valor: produto.codigo },
    { label: "Linha", valor: produto.linhaNome },
    { label: "Tipo", valor: campoOuIndefinido(produto.tipo) },
    { label: "Material", valor: campoOuIndefinido(produto.material) },
    { label: "Cor", valor: campoOuIndefinido(produto.cor) },
    { label: "Acabamento", valor: campoOuIndefinido(produto.acabamento) },
    {
      label: "Pode automatizar?",
      valor:
        produto.automatizavel === null
          ? "A confirmar"
          : produto.automatizavel
          ? "Sim"
          : "Não",
    },
  ];

  return (
    <div className="container-baroli py-16 lg:py-24">
      <nav className="text-xs text-white/40 uppercase tracking-widest2 mb-10">
        <Link href="/catalogo" className="hover:text-white">Catálogo</Link>
        <span className="mx-2">/</span>
        <Link href={`/catalogo?linha=${produto.linha}`} className="hover:text-white">
          {produto.linhaNome}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white/70">{produto.codigo}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="relative aspect-[4/3] bg-black border border-white/10">
          <Image
            src={produto.imagem}
            alt={`Portão ${produto.codigo} - ${produto.linhaNome}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="eyebrow mb-3">{produto.linhaNome}</p>
          <h1 className="font-display text-5xl sm:text-6xl mb-2">{produto.codigo}</h1>
          <p className="text-white/50 font-mono text-sm mb-8">
            Modelo de fabricação própria — Baroli Portões
          </p>

          <p className="text-white/70 leading-relaxed mb-10">
            {produto.descricao ??
              `Este modelo faz parte da ${produto.linhaNome} do nosso catálogo. As especificações completas (material, cor, medidas e valor) são confirmadas com um de nossos consultores, já que cada portão pode ser fabricado sob medida.`}
          </p>

          <dl className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10 border-y border-white/10 py-8">
            {especificacoes.map((e) => (
              <div key={e.label}>
                <dt className="text-xs uppercase tracking-widest2 text-white/40 mb-1">
                  {e.label}
                </dt>
                <dd className="text-white/90">{e.valor}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/calculadora?linha=${produto.linha}`}
              className="flex-1 text-center border border-white/20 px-6 py-4 text-sm uppercase tracking-widest2 hover:border-baroli-blue hover:text-baroli-blue transition-colors"
            >
              Calcular preço
            </Link>
            <a
              href={linkWhatsApp(mensagemProduto(produto.codigo, produto.linhaNome))}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center bg-baroli-blue px-6 py-4 text-sm uppercase tracking-widest2 hover:bg-baroli-blue-dark transition-colors"
            >
              Pedir orçamento no WhatsApp
            </a>
          </div>
        </div>
      </div>

      {semelhantes.length > 0 && (
        <section className="mt-28">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl mb-10">
              Modelos semelhantes na {produto.linhaNome}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {semelhantes.map((p) => (
              <ProductCard produto={p} key={p.id} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
