"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const FOTOS_HERO = [
  "/images/catalogo/prime-pb_265.jpg",
  "/images/projetos/basculante-04-finalizado.jpg",
  "/images/catalogo/prime-pb_270.jpg",
  "/images/projetos/basculante-03-finalizado.jpg",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % FOTOS_HERO.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex flex-col lg:flex-row min-h-[100svh] lg:h-[100svh] w-full overflow-hidden bg-baroli-blue-dark">
      {/* PAINEL DE TEXTO — sólido, nunca compete com a foto */}
      <div className="relative z-10 flex flex-col justify-center px-6 py-16 lg:w-[46%] lg:px-16 lg:py-0">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="eyebrow mb-4 text-baroli-blue-light"
        >
          Serralheria & Portões de alto padrão · SP
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-wide text-white"
        >
          Portões que valorizam
          <br />
          seu patrimônio.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 max-w-md text-white/70 text-lg"
        >
          Projetos exclusivos em ferro e alumínio para residências, condomínios
          e empresas — do desenho à automação.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/catalogo"
            className="bg-baroli-blue-light text-baroli-blue-dark px-8 py-4 text-sm uppercase tracking-widest2 font-semibold rounded-md hover:bg-white transition-colors"
          >
            Conheça nossos modelos
          </Link>
          <Link
            href="/calculadora"
            className="border border-white/40 px-8 py-4 text-sm uppercase tracking-widest2 text-white rounded-md hover:border-white transition-colors"
          >
            Solicitar orçamento
          </Link>
        </motion.div>
      </div>

      {/* FOTO — limpa, sem sobreposição de texto, só uma borda fina de assinatura */}
      <div className="relative h-[42vh] sm:h-[48vh] lg:h-auto lg:w-[54%] overflow-hidden border-t-4 lg:border-t-0 lg:border-l-4 border-baroli-blue-light">
        <AnimatePresence mode="sync">
          <motion.div
            key={FOTOS_HERO[index]}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={FOTOS_HERO[index]}
              alt="Portão Baroli"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
