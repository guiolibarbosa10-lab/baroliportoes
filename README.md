# Baroli Portões — Site

Site institucional/configurador para a Baroli Portões, construído em
Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.

## O que já está pronto

- **295 modelos reais**, extraídos diretamente do PDF `Catálogo de Portões
  Baroli 2026`, organizados nas 3 linhas do catálogo: Especial (11),
  Padrão (264) e Prime (20). Cada imagem foi recortada automaticamente da
  página correspondente do PDF e otimizada para web (`public/images/catalogo`).
- Home, Catálogo com filtros por linha e busca por código, página de
  produto individual (com modelos semelhantes e botão de WhatsApp),
  Calculadora de preço, Projetos, Sobre, Automação e Contato.
- SEO: metadata por página, Open Graph, `sitemap.xml` dinâmico (inclui os
  295 produtos), `robots.txt`, JSON-LD (`HomeAndConstructionBusiness`).
- Botão flutuante de WhatsApp em todas as páginas, com mensagem
  pré-preenchida (inclusive a partir da calculadora e da página de produto).
- Build validado localmente (`npm run build` gera as 295 páginas de
  produto estaticamente, sem erros).

## O que **não** veio do catálogo (e por quê)

O PDF do catálogo só traz, para cada modelo: **foto + código** (ex: `PB_012`)
e a linha (Especial/Padrão/Prime). Ele não tem descrição, material, cor,
medida ou preço por modelo — por isso o site **não inventa** essas
informações modelo a modelo. Em vez disso:

1. `data/products.json` já tem os 295 modelos com esses campos como `null`.
2. Você preenche `data/planilha-modelo.csv` (uma linha por modelo, já com
   `id` e `código` prontos) com material, cor, acabamento, se automatiza,
   preço-base, descrição, ambiente, largura e altura.
3. Rode `npm run importar-planilha` — o script mescla o CSV em
   `data/products.json` sem tocar nas imagens/códigos/linhas.

Enquanto um campo não é preenchido, o site mostra "A confirmar" em vez de
um valor inventado.

Da mesma forma, **avaliações de clientes** (`data/avaliacoes.json`) e
**projetos com fotos reais de antes/depois** (`data/projetos.json`) começam
vazios — o catálogo não trouxe esse conteúdo, e criar depoimentos ou
projetos fictícios atribuídos à empresa não seria correto. As duas páginas
já têm um estado vazio elegante explicando o que fazer; basta adicionar os
itens nesses arquivos JSON (formato de exemplo comentado abaixo) e as fotos
em `public/images/projetos`.

Exemplo de item para `data/avaliacoes.json`:
```json
{ "nome": "Nome do cliente", "nota": 5, "texto": "Depoimento real do cliente.", "local": "Vila Maria, SP" }
```

Exemplo de item para `data/projetos.json`:
```json
{ "id": "projeto-01", "titulo": "Portão residencial - Vila Maria", "categoria": "residencial", "imagemDepois": "/images/projetos/projeto-01.jpg" }
```

## Cor da marca (vermelho)

O PDF do catálogo não contém um arquivo de logo isolado com o vermelho
oficial da marca em alta resolução — só a capa, com a logomarca em tons de
azul/cinza. Usei um vermelho de referência (`#C8102E`, em
`tailwind.config.ts` → `colors.baroli.red`) para a identidade "premium
automotiva" pedida. **Troque esse hex pelo vermelho exato da sua logomarca**
assim que tiver o arquivo original (ex: `.ai`, `.eps` ou um PNG em alta
resolução) — é a única alteração de cor necessária, todo o site referencia
essa variável.

## Vídeo do hero

A home usa uma sequência de fotos reais do catálogo com transição suave
(`components/Hero.tsx`) em vez de um vídeo, pois o catálogo em PDF não
contém vídeo. Para usar um vídeo real de portões abrindo (como pedido no
briefing):

1. Coloque o arquivo em `public/videos/hero.mp4` (formato leve, H.264).
2. Em `components/Hero.tsx`, troque o bloco de `<Image>` dentro do
   `AnimatePresence` por uma tag `<video autoPlay muted loop playsInline>`
   apontando para `/videos/hero.mp4`.

## Como rodar localmente

```bash
npm install
npm run dev
# abra http://localhost:3000
```

## Como gerar a versão de produção

```bash
npm run build
npm run start
```

## Como publicar (hospedagem)

O projeto é um Next.js padrão — funciona em qualquer host que suporte
Node.js/Next.js:

- **Vercel** (mais simples): conecte o repositório e o deploy é automático.
- **Outro host Node**: `npm run build` seguido de `npm run start`
  (ou exporte como site estático com `next export`, se preferir — nesse
  caso a página `/catalogo` com filtros já é 100% client-side e funciona
  igual).

Antes de publicar, ajuste:

1. `siteUrl` em `app/layout.tsx`, `app/sitemap.ts` e `app/robots.ts` para o
   domínio real.
2. Adicione o Google Analytics/Search Console (ver seção abaixo).
3. Preencha `data/planilha-modelo.csv` e rode `npm run importar-planilha`.
4. Ajuste os valores de exemplo em `lib/pricing.ts` para a tabela de preços
   real da Baroli — estão claramente comentados como "valores de
   referência", não preços reais.

## Google Analytics / Search Console

Ainda não incluídos (dependem de contas/IDs próprios da empresa). Para
adicionar o Google Analytics 4:

1. Instale `@next/third-parties` (`npm install @next/third-parties`).
2. Em `app/layout.tsx`, importe `GoogleAnalytics` e adicione
   `<GoogleAnalytics gaId="G-XXXXXXX" />` dentro do `<body>`.

Para o Search Console, basta verificar o domínio (meta tag ou arquivo HTML)
depois de publicado — o `sitemap.xml` já está pronto para ser submetido.

## Estrutura de pastas

```
app/            rotas (App Router) — home, catálogo, produto, calculadora, etc.
components/     componentes de UI reutilizáveis
lib/            tipos, acesso a dados, precificação e link do WhatsApp
data/           produtos, empresa, avaliações, projetos (fontes de conteúdo)
scripts/        importação da planilha de especificações
public/images/  fotos reais extraídas do catálogo (295 modelos)
```

## Performance e Lighthouse

O projeto usa `next/image` (lazy loading e otimização automática),
`next/font` (fontes auto-hospedadas, sem layout shift) e CSS mínimo via
Tailwind. Para conferir a nota do Lighthouse, rode `npm run build && npm run start`
e audite a versão de produção (o modo `dev` é sempre mais lento).
