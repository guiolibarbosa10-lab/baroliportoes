import avaliacoesData from "../data/avaliacoes.json";
import Reveal from "../components/Reveal";

interface Avaliacao {
  nome: string;
  nota: number;
  texto: string;
  local?: string;
}

const avaliacoes = avaliacoesData as Avaliacao[];

export default function Avaliacoes() {
  if (avaliacoes.length === 0) {
    return (
      <div className="text-center py-16 border border-baroli-gray-200 bg-baroli-gray-50 rounded-lg">
        <p className="text-baroli-gray-600">
          As avaliações reais de clientes aparecerão aqui assim que forem
          adicionadas em <code className="text-baroli-blue">data/avaliacoes.json</code>.
        </p>
      </div>
    );
  }

  const media =
    avaliacoes.reduce((acc, a) => acc + a.nota, 0) / avaliacoes.length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-10">
        <span className="text-baroli-blue text-2xl">{"★".repeat(Math.round(media))}</span>
        <span className="text-baroli-gray-600 text-sm">
          {media.toFixed(1)} de 5 · {avaliacoes.length} avaliações
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {avaliacoes.map((a, i) => (
          <Reveal key={a.nome + i} delay={i * 0.08}>
            <div className="bg-white border border-baroli-gray-200 p-6 h-full rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-baroli-blue mb-3">{"★".repeat(a.nota)}</div>
              <p className="text-baroli-gray-700 text-sm leading-relaxed mb-4">
                {a.texto}
              </p>
              <p className="text-xs text-baroli-gray-500 uppercase tracking-widest2">
                {a.nome}
                {a.local ? ` · ${a.local}` : ""}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}