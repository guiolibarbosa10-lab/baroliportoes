import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta oficial Baroli — tema claro para loja virtual profissional
        baroli: {
          // Primárias (Azul da logo)
          blue: "#12409A",
          "blue-dark": "#0B2C6E",
          "blue-light": "#0296DE",
          "blue-50": "#F0F5FB",
          "blue-100": "#D6E4F5",
          
          // Neutros (para tema claro)
          black: "#111111",
          white: "#FFFFFF",
          
          // Cinzas (escalas para texto e bordas)
          "gray-50": "#F9FAFB",
          "gray-100": "#F3F4F6",
          "gray-200": "#E5E7EB",
          "gray-300": "#D1D5DB",
          "gray-400": "#9CA3AF",
          "gray-500": "#6B7280",
          "gray-600": "#4B5563",
          "gray-700": "#374151",
          "gray-800": "#1F2937",
          "gray-900": "#111827",
          
          // Semânticas
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
          info: "#3B82F6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      backgroundImage: {
        // Gradientes para transições sutis
        "gradient-fade-black": 
          "linear-gradient(180deg, rgba(17,17,17,0) 0%, rgba(17,17,17,0.9) 100%)",
        "gradient-fade-white":
          "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 100%)",
        "gradient-blue-accent":
          "linear-gradient(135deg, var(--color-baroli-blue) 0%, var(--color-baroli-blue-light) 100%)",
      },
      boxShadow: {
        // Sombras para profundidade em tema claro
        "sm": "0 1px 2px 0 rgba(17, 17, 17, 0.05)",
        "md": "0 4px 6px -1px rgba(17, 17, 17, 0.1)",
        "lg": "0 10px 15px -3px rgba(17, 17, 17, 0.1)",
        "xl": "0 20px 25px -5px rgba(17, 17, 17, 0.1)",
        "product": "0 4px 12px rgba(18, 64, 154, 0.08)",
        "product-hover": "0 12px 24px rgba(18, 64, 154, 0.15)",
      },
      borderRadius: {
        "xs": "4px",
        "sm": "6px",
        "md": "8px",
        "lg": "12px",
      },
      spacing: {
        // Escala de espaçamento customizada
        "4.5": "1.125rem",
        "13": "3.25rem",
        "15": "3.75rem",
        "17": "4.25rem",
      },
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
      },
    },
  },
  plugins: [],
};

export default config;
