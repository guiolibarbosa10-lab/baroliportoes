/**
 * Modelo de precificação da calculadora de orçamento.
 *
 * IMPORTANTE: os valores abaixo são exemplos de referência para a
 * calculadora funcionar de ponta a ponta — eles NÃO são a tabela de preços
 * real da Baroli. Ajuste `PRECO_POR_M2`, `ADICIONAIS` e `MOTORES` com os
 * valores reais da empresa antes de publicar o site. O texto "Este valor é
 * uma estimativa. Um consultor confirmará todas as medidas." já deixa isso
 * claro para o visitante.
 */

export type TipoPortao = "basculante" | "deslizante" | "pivotante";
export type MaterialPortao = "ferro" | "aco";
export type LinhaPortao = "padrao" | "especial" | "prime";

export const PRECO_POR_M2: Record<LinhaPortao, Record<MaterialPortao, number>> = {
  padrao: { ferro: 500, aco: 500 },
  especial: { ferro: 600,aco: 600 },
  prime: { ferro: 650, aco: 650 },
};

export const MULTIPLICADOR_TIPO: Record<TipoPortao, number> = {
  basculante: 1.0,
  deslizante: 1.0,
  pivotante: 1.0,
};

export const MOTORES = [
  { id: "nenhum", nome: "Sem motor", preco: 0 },
  { id: "basculante-1-4hp", nome: "Motor de 1/4", preco: 1200 },
  { id: "deslizante-1-4hp", nome: "Motor de 1/3", preco: 1600 },
  { id: "pivotante-braco", nome: "Motor de 1/2 HP (4 segundos)", preco: 2100},
];

export const ADICIONAIS = {
  instalacao: 350,
};

export interface EntradaCalculo {
  tipo: TipoPortao;
  linha: LinhaPortao;
  material: MaterialPortao;
  largura: number; // metros
  altura: number; // metros
  automatico: boolean;
  motorId: string;
  instalacao: boolean;
}

export interface ResultadoCalculo {
  materiais: number;
  fabricacao: number;
  instalacao: number;
  garantiaInclusa: true;
  total: number;
}

export function calcularOrcamento(e: EntradaCalculo): ResultadoCalculo {
  const area = Math.max(e.largura, 0) * Math.max(e.altura, 0);
  const precoM2 = PRECO_POR_M2[e.linha][e.material];
  const base = area * precoM2 * MULTIPLICADOR_TIPO[e.tipo];

  const fabricacao = base * 0.35;
  const materiais = base * 0.65;

  const motor = MOTORES.find((m) => m.id === e.motorId);
  const motorPreco = e.automatico ? motor?.preco ?? 0 : 0;

 
  const instalacao = e.instalacao ? ADICIONAIS.instalacao : 0;

  const total = materiais + fabricacao + motorPreco + instalacao;

  return {
    materiais: Math.round(materiais + motorPreco),
    fabricacao: Math.round(fabricacao),
    instalacao: Math.round(instalacao),
    garantiaInclusa: true,
    total: Math.round(total),
  };
}

export function formatarReais(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}
