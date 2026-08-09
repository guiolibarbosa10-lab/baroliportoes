import type { MetadataRoute } from "next";
import { produtos } from "../lib/products";

const siteUrl = "https://www.baroliportoes.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginasEstaticas: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/catalogo`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/calculadora`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/projetos`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/automacao`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/sobre`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/contato`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const paginasProdutos: MetadataRoute.Sitemap = produtos.map((p) => ({
    url: `${siteUrl}/catalogo/${p.id}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...paginasEstaticas, ...paginasProdutos];
}
