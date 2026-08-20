"use client";

import Image from "next/image";
import { useState } from "react";
import { linkWhatsApp } from "@/lib/whatsapp";

export default function FloatingTechnicalSupport() {
  const [isHovered, setIsHovered] = useState(false);

  const message = "Como podemos te ajudar?";
  const whatsappUrl = linkWhatsApp(message);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed top-24 right-3 sm:right-6 z-40 group cursor-pointer transition-transform duration-300 hover:scale-110"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label="Assistência Técnica via WhatsApp"
    >
      {/* Tamanhos usando apenas valores válidos da escala padrão do Tailwind
          (w-22/h-22 não existem -> no mobile o botão ficava com 0x0 e sumia) */}
      <div className="relative w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32">
        <Image
          src="/images/assistencia-tecnica.png"
          alt="Assistência Técnica"
          fill
          sizes="(max-width: 640px) 64px, (max-width: 1024px) 96px, 128px"
          className="object-contain drop-shadow-lg"
          priority
        />
      </div>

      {isHovered && (
        <div className="hidden sm:block absolute top-full mt-2 right-0 bg-baroli-blue text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg animate-fadeIn">
          {message}
          <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-baroli-blue" />
        </div>
      )}
    </a>
  );
}
