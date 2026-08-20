import empresa from "../data/empresa.json";

export function linkWhatsApp(mensagem: string): string {
  const texto = encodeURIComponent(mensagem);
  return `https://wa.me/${empresa.whatsappE164}?text=${texto}`;
}

export function mensagemProduto(codigo: string, linhaNome: string): string {
  return (
    `Olá! Tenho interesse no portão ${codigo} (${linhaNome}) ` +
    `do catálogo da Baroli Portões. Gostaria de um orçamento.`
  );
}

export interface DadosOrcamento {
  tipo: string;
  linha: string;
  largura: string;
  altura: string;
  material: string;
  cor: string;
  automatico: string;
  motor: string;
  instalacao: string;
  cidade: string;
  cep: string;
  valorEstimado: string;
}

export function mensagemOrcamento(d: DadosOrcamento): string {
  return [
    "Olá! Simulei um orçamento no site da Baroli Portões e gostaria de confirmar os valores.",
    "",
    `Tipo de portão: ${d.tipo}`,
    `Linha: ${d.linha}`,
    `Medidas: ${d.largura}m (largura) x ${d.altura}m (altura)`,
    `Material: ${d.material}`,
    `Cor: ${d.cor}`,
    `Automação: ${d.automatico}`,
    d.motor ? `Motor: ${d.motor}` : null,
    `Instalação: ${d.instalacao}`,
    `Cidade/CEP: ${d.cidade} - ${d.cep}`,
    "",
    `Valor estimado no site: ${d.valorEstimado}`,
  ]
    .filter(Boolean)
    .join("\n");
}
