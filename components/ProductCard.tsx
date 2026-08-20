import Image from "next/image";
import Link from "next/link";
import type { Produto } from "@/lib/products";
import Badge from "./Badge";

export default function ProductCard({
  produto,
  priority = false,
}: {
  produto: Produto;
  priority?: boolean;
}) {
  return (
    <Link href={`/catalogo/${produto.id}`} className="group block h-full">
      <div className="h-full flex flex-col rounded-lg border border-baroli-gray-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-product-hover hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden bg-baroli-gray-100">
          <Image
            src={produto.imagem}
            alt={`Portão ${produto.codigo} - ${produto.linhaNome}`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge variant={produto.linhaNome === "Linha Prime" ? "blue" : "default"} size="sm">
              {produto.linhaNome.replace("Linha ", "")}
            </Badge>
          </div>
        </div>

        <div className="flex-1 flex flex-col p-4">
          <p className="text-xs font-mono text-baroli-gray-500 mb-2">COD. {produto.codigo}</p>
          <h3 className="font-display text-lg text-baroli-gray-900 mb-auto line-clamp-2 group-hover:text-baroli-blue transition-colors">
            Portão {produto.codigo}
          </h3>
          <div className="my-3 h-px bg-baroli-gray-200" />
          <span className="text-xs uppercase tracking-widest2 text-baroli-blue font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 self-end">
            Ver detalhes →
          </span>
        </div>
      </div>
    </Link>
  );
}
