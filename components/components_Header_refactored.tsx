"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/calculadora", label: "Calculadora" },
  { href: "/projetos", label: "Projetos" },
  { href: "/automacao", label: "Automação" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

/**
 * Header Component - REFACTORED
 * 
 * MUDANÇAS REALIZADAS:
 * ✅ Tema claro (fundo branco em vez de preto)
 * ✅ Melhor sombra em scroll (mais sutil)
 * ✅ Cores adaptadas para fundo branco
 * ✅ Melhor contraste de texto
 * ✅ Transições suavizadas
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md border-b border-baroli-gray-200 backdrop-blur"
          : "bg-white border-b border-baroli-gray-100"
      }`}
    >
      <div className="container-baroli flex items-center justify-between h-20">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center rounded-md overflow-hidden shrink-0 hover:opacity-80 transition-opacity"
          aria-label="Baroli Portões — início"
        >
          <Image
            src="/images/logo.png"
            alt="Baroli Portões"
            width={829}
            height={159}
            priority
            className="h-10 lg:h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm uppercase tracking-widest2 font-semibold transition-colors duration-250 ${
                pathname === item.href
                  ? "text-baroli-blue"
                  : "text-baroli-gray-600 hover:text-baroli-blue"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden flex flex-col gap-1.5 p-2 hover:bg-baroli-gray-100 rounded-md transition-colors"
        >
          <span
            className={`block h-[2px] w-6 bg-baroli-gray-900 transition-transform duration-300 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-baroli-gray-900 transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-baroli-gray-900 transition-transform duration-300 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <nav className="lg:hidden bg-white border-t border-baroli-gray-200 shadow-sm animate-in slide-in-from-top-2">
          <div className="container-baroli flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-3 px-2 text-sm uppercase tracking-widest2 font-semibold rounded transition-colors duration-250 ${
                  pathname === item.href
                    ? "text-baroli-blue bg-baroli-blue-50"
                    : "text-baroli-gray-600 hover:text-baroli-blue hover:bg-baroli-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
