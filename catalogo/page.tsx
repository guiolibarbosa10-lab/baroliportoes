import type { Metadata } from "next";
import CatalogExplorer from "@/components/CatalogExplorer";
import { produtos } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo de Portões",
  description:
    "Explore os modelos reais das linhas Especial, Padrão e Prime da Baroli Portões — basculantes, deslizantes e pivotantes.",
};

export default function CatalogoPage({
  searchParams,
}: {
  searchParams: { linha?: string };
}) {
  const linhaInicial = searchParams.linha ?? "todas";

  return (
    <div className="container-baroli py-16 lg:py-24">
      <p className="eyebrow mb-4">Catálogo Baroli</p>
      <h1 className="font-display text-5xl sm:text-6xl mb-4 text-baroli-gray-900">
        Escolha o portão da sua fachada
      </h1>
      <p className="text-baroli-gray-600 max-w-2xl mb-14">
        {produtos.length} modelos reais, direto do nosso catálogo de fabricação —
        organizados por linha. Clique em um modelo para ver detalhes e pedir
        mais informações.
      </p>

      <CatalogExplorer produtos={produtos} linhaInicial={linhaInicial} />
    </div>
  );
}
