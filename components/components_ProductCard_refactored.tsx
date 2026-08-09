import Image from "next/image";
import Link from "next/link";
import type { Produto } from "@/lib/products";
import Badge from "./Badge";

interface ProductCardProps {
  produto: Produto;
  priority?: boolean;
  showPrice?: boolean;
}

/**
 * ProductCard Component - REFACTORED
 * 
 * MUDANÇAS REALIZADAS:
 * ✅ Novo visual para tema claro (fundo branco)
 * ✅ Sombra profissional (card elevation)
 * ✅ Badge melhorado com cores corretas
 * ✅ Melhor efeito de hover (sombra + escala)
 * ✅ Preço estimado (se showPrice=true)
 * ✅ Ícone de favorito (preparado para funcionalidade)
 * ✅ Borders suaves em vez de hard edges
 * ✅ Tipografia melhorada
 * ✅ Espaçamento profissional
 * 
 * @example
 * <ProductCard produto={produto} priority showPrice />
 */
export default function ProductCard({
  produto,
  priority = false,
  showPrice = false,
}: ProductCardProps) {
  // Mapear cor do badge por linha
  const getBadgeVariant = (linha: string): "blue" | "default" => {
    return linha === "Linha Prime" ? "blue" : "default";
  };

  // Preço estimado (exemplo - substituir com valor real do BD)
  const precoEstimado = Math.floor(Math.random() * (15000 - 3000) + 3000);

  return (
    <Link href={`/catalogo/${produto.id}`} className="group block h-full">
      <div className="h-full flex flex-col rounded-lg border border-baroli-gray-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-product-hover hover:-translate-y-1">
        
        {/* Imagem do Produto */}
        <div className="relative aspect-[4/3] overflow-hidden bg-baroli-gray-100">
          <Image
            src={produto.imagem}
            alt={`Portão ${produto.codigo} - ${produto.linhaNome}`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          
          {/* Overlay com gradiente sutil */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badge de Linha */}
          <div className="absolute top-3 left-3">
            <Badge variant={getBadgeVariant(produto.linhaNome)} size="sm">
              {produto.linhaNome.replace("Linha ", "")}
            </Badge>
          </div>

          {/* Ícone de Favorito (para futura funcionalidade) */}
          <button
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-baroli-blue hover:text-white transition-all opacity-0 group-hover:opacity-100"
            aria-label="Adicionar aos favoritos"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Implementar funcionalidade de favorito
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Informações do Produto */}
        <div className="flex-1 flex flex-col p-4">
          {/* Código */}
          <p className="text-xs font-mono text-baroli-gray-500 mb-2">
            COD. {produto.codigo}
          </p>

          {/* Título */}
          <h3 className="font-display text-lg text-baroli-gray-900 mb-auto line-clamp-2 group-hover:text-baroli-blue transition-colors">
            Portão {produto.codigo}
          </h3>

          {/* Descrição (se disponível) */}
          {produto.descricao && (
            <p className="text-sm text-baroli-gray-600 mt-2 line-clamp-2">
              {produto.descricao}
            </p>
          )}

          {/* Separador */}
          <div className="my-3 h-px bg-baroli-gray-200" />

          {/* Rodapé: Preço e CTA */}
          <div className="flex items-center justify-between pt-2">
            {showPrice && (
              <span className="text-sm font-semibold text-baroli-blue">
                A partir de <br />
                <span className="text-base">R$ {precoEstimado.toLocaleString("pt-BR")}</span>
              </span>
            )}
            
            <span className="text-xs uppercase tracking-widest2 text-baroli-blue font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Ver detalhes →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
