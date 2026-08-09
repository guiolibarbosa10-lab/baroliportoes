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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur border-b border-baroli-gray-200" : "bg-white"
      }`}
    >
      <div className="container-baroli flex items-center justify-between h-20">
        <Link href="/" className="flex items-center rounded-md overflow-hidden shrink-0" aria-label="Baroli Portões — início">
          <Image
            src="/images/logo.png"
            alt="Baroli Portões"
            width={829}
            height={159}
            priority
            className="h-10 lg:h-12 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm uppercase tracking-widest2 transition-colors ${
                pathname === item.href 
                  ? "text-baroli-blue font-semibold" 
                  : "text-baroli-gray-600 hover:text-baroli-blue"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
        >
          <span
            className={`block h-[2px] w-6 bg-baroli-gray-700 transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span className={`block h-[2px] w-6 bg-baroli-gray-700 transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`block h-[2px] w-6 bg-baroli-gray-700 transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <nav className="lg:hidden bg-white border-t border-baroli-gray-200">
          <div className="container-baroli flex flex-col py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-3 text-sm uppercase tracking-widest2 border-b border-baroli-gray-100 ${
                  pathname === item.href 
                    ? "text-baroli-blue font-semibold" 
                    : "text-baroli-gray-600 hover:text-baroli-blue"
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