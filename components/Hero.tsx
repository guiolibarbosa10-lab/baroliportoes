"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const FOTOS_HERO = [
  "/images/catalogo/prime-pb_265.jpg",
  "/images/catalogo/especial-pb_003.jpg",
  "/images/catalogo/prime-pb_270.jpg",
  "/images/catalogo/especial-pb_007.jpg",
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
    <section className="relative h-[100svh] w-full overflow-hidden bg-black">
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
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />

      <div className="relative z-10 h-full flex flex-col justify-end">
        <div className="container-baroli pb-20 lg:pb-28">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="eyebrow mb-4"
          >
            Serralheria & Portões de alto padrão · SP
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-wide max-w-4xl text-white"
          >
            <span className="text-baroli-blue-light">Portões que valorizam</span>
            <br />
            seu patrimônio.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 max-w-xl text-white/70 text-lg"
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
              className="bg-baroli-blue px-8 py-4 text-sm uppercase tracking-widest2 text-white hover:bg-baroli-blue-dark transition-colors"
            >
              Conheça nossos modelos
            </Link>
            <Link
              href="/calculadora"
              className="border border-white/30 px-8 py-4 text-sm uppercase tracking-widest2 text-white hover:border-white transition-colors"
            >
              Solicitar orçamento
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}