import produtosData from "../data/products.json";

export type Linha = "especial" | "padrao" | "prime";

export interface Produto {
  id: string;
  codigo: string;
  linha: Linha;
  linhaNome: string;
  imagem: string;
  largura: number | null;
  altura: number | null;
  tipo: string | null;
  material: string | null;
  cor: string | null;
  acabamento: string | null;
  automatizavel: boolean | null;
  precoBase: number | null;
  descricao: string | null;
  ambiente: string | null;
}

export const produtos = produtosData as Produto[];

export function getProdutoPorId(id: string): Produto | undefined {
  return produtos.find((p) => p.id === id);
}

export function getProdutosPorLinha(linha: Linha): Produto[] {
  return produtos.filter((p) => p.linha === linha);
}

export const linhas: { valor: Linha; nome: string; descricao: string }[] = [
  {
    valor: "especial",
    nome: "Linha Especial",
    descricao:
      "Modelos de destaque do catálogo, com desenhos exclusivos para projetos que pedem um acabamento diferenciado.",
  },
  {
    valor: "padrao",
    nome: "Linha Padrão",
    descricao:
      "O maior catálogo de modelos da Baroli — a base sólida para residências, condomínios e empresas.",
  },
  {
    valor: "prime",
    nome: "Linha Prime",
    descricao:
      "O topo de linha: desenhos mais elaborados para quem busca um portão como assinatura da fachada.",
  },
];

/**
 * Alguns campos (tipo, material, cor, preço, descrição) ainda não existem
 * no catálogo de origem — o catálogo só traz foto + código por modelo.
 * Esses campos ficam `null` até você preencher data/planilha-modelo.csv
 * e rodar `npm run importar-planilha`. Use este helper para mostrar um
 * texto de fallback no lugar de inventar uma especificação.
 */
export function campoOuIndefinido(valor: string | number | null): string | number {
  if (valor === null || valor === undefined || valor === "") {
    return "A confirmar";
  }
  return valor;
}
