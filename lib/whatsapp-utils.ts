import empresa from "@/data/empresa.json";

/**
 * Gera URL para WhatsApp com mensagem pré-configurada
 */
export function yx(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${empresa.whatsappE164}?text=${encodedMessage}`;
}

/**
 * Gera mensagem padrão de interesse em produto
 */
export function dY(codigo: string, linha: string): string {
  return `Olá! Tenho interesse no portão ${codigo} (${linha}) do catálogo da Baroli Portões. Gostaria de um orçamento.`;
}
