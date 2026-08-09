/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Headers de segurança aplicados a todas as rotas.
  // Site estático, sem login/backend próprio — este é o conjunto
  // recomendado para reduzir riscos comuns (clickjacking, MIME sniffing,
  // vazamento de referrer) sem quebrar WhatsApp, Google Maps (iframe na
  // página de Contato) e imagens do Next/Image.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            // Impede que o site seja carregado dentro de um <iframe> em
            // outro domínio (proteção contra clickjacking).
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            // Impede que o navegador tente "adivinhar" o tipo de um
            // arquivo (proteção contra MIME sniffing).
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Controla quanta informação de origem é enviada ao navegar
            // para outro site (ex: ao clicar no link do WhatsApp).
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            // Desativa APIs de navegador sensíveis que o site não usa.
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            // Força HTTPS em navegadores modernos por 2 anos.
            // Só tem efeito se o site já estiver servindo em HTTPS
            // (Vercel faz isso automaticamente).
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
