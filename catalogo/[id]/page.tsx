import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { produtos, getProdutoPorId, getProdutosPorLinha } from "@/lib/products";
import { linkWhatsApp, mensagemProduto } from "@/lib/whatsapp";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return produtos.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const produto = getProdutoPorId(params.id);
  if (!produto) return {};
  return {
    title: `${produto.codigo} — ${produto.linhaNome}`,
    description: `Portão ${produto.codigo} da ${produto.linhaNome} da Baroli Portões. Peça mais informações.`,
  };
}

export default function ProdutoPage({ params }: { params: { id: string } }) {
  const produto = getProdutoPorId(params.id);
  if (!produto) notFound();

  const semelhantes = getProdutosPorLinha(produto.linha)
    .filter((p) => p.id !== produto.id)
    .slice(0, 4);

  return (
    <div className="container-baroli py-16 lg:py-24">
      <nav className="text-xs text-baroli-gray-500 uppercase tracking-widest2 mb-10">
        <Link href="/catalogo" className="hover:text-baroli-blue">Catálogo</Link>
        <span className="mx-2">/</span>
        <Link href={`/catalogo?linha=${produto.linha}`} className="hover:text-baroli-blue">
          {produto.linhaNome}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-baroli-gray-700">{produto.codigo}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="relative aspect-[4/3] bg-baroli-gray-100 border border-baroli-gray-200 rounded-lg overflow-hidden">
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
          <h1 className="font-display text-5xl sm:text-6xl mb-8 text-baroli-gray-900">
            {produto.codigo}
          </h1>

          <p className="text-baroli-gray-600 leading-relaxed mb-10">
            {produto.descricao ??
              `Este modelo faz parte da ${produto.linhaNome} do nosso catálogo, com fabricação sob medida. Fale com a gente para tirar dúvidas sobre material, cor e medidas do seu projeto.`}
          </p>

          <a
            href={linkWhatsApp(mensagemProduto(produto.codigo, produto.linhaNome))}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-baroli-blue text-white rounded-md px-8 py-4 text-sm uppercase tracking-widest2 hover:bg-baroli-blue-dark transition-colors"
          >
            Pedir mais informações no WhatsApp
          </a>
        </div>
      </div>

      {semelhantes.length > 0 && (
        <section className="mt-28">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl mb-10 text-baroli-gray-900">
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
