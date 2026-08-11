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
      <h1 className="font-display text-5xl sm:text-6xl mb-4 text-baroli-gray-900">
        Projetos realizados
      </h1>
      <p className="text-baroli-gray-600 max-w-2xl mb-14">
        Fotos reais de instalações em residências, condomínios e empresas.
      </p>

      {projetos.length === 0 ? (
        <Reveal>
          <div className="border border-baroli-gray-200 bg-baroli-gray-50 rounded-lg px-8 py-20 text-center max-w-2xl">
            <p className="text-baroli-gray-700 mb-4">
              Esta galeria está pronta para receber fotos reais de projetos
              (antes/depois, residenciais, condomínios e empresas).
            </p>
            <p className="text-baroli-gray-500 text-sm mb-8">
              Adicione as fotos em{" "}
              <code className="text-baroli-blue">public/images/projetos</code> e os
              dados em <code className="text-baroli-blue">data/projetos.json</code>{" "}
              (veja o modelo no README) para que apareçam aqui automaticamente.
            </p>
            <Link
              href="/catalogo"
              className="inline-block border border-baroli-gray-300 rounded-md px-6 py-3 text-sm uppercase tracking-widest2 text-baroli-gray-700 hover:border-baroli-blue hover:text-baroli-blue transition-colors"
            >
              Ver catálogo de modelos
            </Link>
          </div>
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetos.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <div className="border border-baroli-gray-200 bg-white rounded-lg overflow-hidden shadow-product hover:shadow-product-hover transition-shadow">
                {p.imagemAntes ? (
                  <div className="grid grid-cols-2 gap-px bg-baroli-gray-200">
                    <div className="relative aspect-square">
                      <Image
                        src={p.imagemAntes}
                        alt={`${p.titulo} - antes`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] uppercase tracking-widest2 px-2 py-1 rounded">
                        Antes
                      </span>
                    </div>
                    <div className="relative aspect-square">
                      <Image
                        src={p.imagemDepois}
                        alt={`${p.titulo} - depois`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />
                      <span className="absolute bottom-2 left-2 bg-baroli-blue text-white text-[10px] uppercase tracking-widest2 px-2 py-1 rounded">
                        Depois
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={p.imagemDepois}
                      alt={p.titulo}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <p className="text-xs uppercase tracking-widest2 text-baroli-blue mb-1">
                    {p.categoria}
                  </p>
                  <p className="text-baroli-gray-900">{p.titulo}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
