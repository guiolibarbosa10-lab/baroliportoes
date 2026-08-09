import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import projetosData from "../../data/projetos.json";
import Reveal from "../../components/Reveal";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Galeria de projetos de portões instalados pela Baroli Portões.",
};

interface Projeto {
  id: string;
  titulo: string;
  categoria: "residencial" | "condominio" | "empresa";
  imagemAntes?: string;
  imagemDepois: string;
}

const projetos = projetosData as Projeto[];

export default function ProjetosPage() {
  return (
    <div className="container-baroli py-16 lg:py-24">
      <p className="eyebrow mb-4">Nosso trabalho no dia a dia</p>
      <h1 className="font-display text-5xl sm:text-6xl mb-4">Projetos realizados</h1>
      <p className="text-white/60 max-w-2xl mb-14">
        Fotos reais de instalações em residências, condomínios e empresas.
      </p>

      {projetos.length === 0 ? (
        <Reveal>
          <div className="border border-white/10 bg-baroli-gray-900 px-8 py-20 text-center max-w-2xl">
            <p className="text-white/70 mb-4">
              Esta galeria está pronta para receber fotos reais de projetos
              (antes/depois, residenciais, condomínios e empresas).
            </p>
            <p className="text-white/40 text-sm mb-8">
              Adicione as fotos em{" "}
              <code className="text-baroli-blue">public/images/projetos</code> e os
              dados em <code className="text-baroli-blue">data/projetos.json</code>{" "}
              (veja o modelo no README) para que apareçam aqui automaticamente.
            </p>
            <Link
              href="/catalogo"
              className="inline-block border border-white/20 px-6 py-3 text-sm uppercase tracking-widest2 hover:border-baroli-blue hover:text-baroli-blue transition-colors"
            >
              Ver catálogo de modelos
            </Link>
          </div>
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetos.map((p) => (
            <div key={p.id} className="border border-white/10">
              <div className="relative aspect-[4/3]">
                <Image src={p.imagemDepois} alt={p.titulo} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-widest2 text-baroli-blue mb-1">
                  {p.categoria}
                </p>
                <p className="text-white/90">{p.titulo}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
