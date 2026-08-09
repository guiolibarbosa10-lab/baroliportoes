"use client";

import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Produto } from "../lib/products";
import { linhas } from "../lib/products";

const PAGE_SIZE = 24;

export default function CatalogExplorer({
  produtos,
  linhaInicial,
}: {
  produtos: Produto[];
  linhaInicial: string;
}) {
  const [linha, setLinha] = useState<string>(linhaInicial || "todas");
  const [busca, setBusca] = useState("");
  const [visiveis, setVisiveis] = useState(PAGE_SIZE);

  const filtrados = useMemo(() => {
    return produtos.filter((p) => {
      const matchLinha = linha === "todas" || p.linha === linha;
      const matchBusca =
        busca.trim() === "" ||
        p.codigo.toLowerCase().includes(busca.trim().toLowerCase());
      return matchLinha && matchBusca;
    });
  }, [produtos, linha, busca]);

  const visiveisFiltrados = filtrados.slice(0, visiveis);

  return (
    <div className="bg-baroli-blue-50 py-16 rounded-lg">
      <div className="container-baroli">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between mb-10">
          <div className="flex flex-wrap gap-2">
            <FilterPill active={linha === "todas"} onClick={() => setLinha("todas")}>
              Todas as linhas
            </FilterPill>
            {linhas.map((l) => (
              <FilterPill
                key={l.valor}
                active={linha === l.valor}
                onClick={() => setLinha(l.valor)}
              >
                {l.nome}
              </FilterPill>
            ))}
          </div>

          <input
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setVisiveis(PAGE_SIZE);
            }}
            placeholder="Buscar por código (ex: PB_012)"
            className="w-full lg:w-72 bg-white border border-baroli-gray-300 px-4 py-2.5 text-sm text-baroli-gray-900 placeholder:text-baroli-gray-400 focus:border-baroli-blue outline-none focus:ring-2 focus:ring-baroli-blue/10"
          />
        </div>

        <p className="text-baroli-gray-600 text-sm mb-6">
          {filtrados.length} modelo{filtrados.length !== 1 ? "s" : ""} encontrado
          {filtrados.length !== 1 ? "s" : ""}
        </p>

        {visiveisFiltrados.length === 0 ? (
          <div className="py-24 text-center text-baroli-gray-500">
            Nenhum modelo encontrado com esse filtro.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visiveisFiltrados.map((produto, i) => (
              <ProductCard produto={produto} key={produto.id} priority={i < 4} />
            ))}
          </div>
        )}

        {visiveis < filtrados.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisiveis((v) => v + PAGE_SIZE)}
              className="border border-baroli-blue text-baroli-blue px-8 py-3 text-sm uppercase tracking-widest2 hover:bg-baroli-blue hover:text-white transition-colors"
            >
              Carregar mais modelos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-xs uppercase tracking-widest2 border rounded transition-colors ${
        active
          ? "bg-baroli-blue border-baroli-blue text-white"
          : "border-baroli-gray-300 text-baroli-gray-700 hover:border-baroli-blue hover:text-baroli-blue"
      }`}
    >
      {children}
    </button>
  );
}