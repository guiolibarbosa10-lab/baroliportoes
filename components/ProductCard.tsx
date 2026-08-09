import Image from "next/image";
import Link from "next/link";
import type { Produto } from "../lib/products";

export default function ProductCard({ produto, priority = false }: { produto: Produto; priority?: boolean }) {
  return (
    <Link
      href={`/catalogo/${produto.id}`}
      className="group relative block overflow-hidden bg-baroli-gray-900 border border-white/5 transition-colors hover:border-baroli-blue/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <Image
          src={produto.imagem}
          alt={`Portão ${produto.codigo} - ${produto.linhaNome}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-fade-black opacity-60" />
        <span className="absolute top-3 left-3 eyebrow bg-black/60 px-2 py-1">
          {produto.linhaNome}
        </span>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-mono text-sm text-white/80">{produto.codigo}</span>
        <span className="text-xs uppercase tracking-widest2 text-baroli-blue opacity-0 group-hover:opacity-100 transition-opacity">
          Ver modelo →
        </span>
      </div>
    </Link>
  );
}
