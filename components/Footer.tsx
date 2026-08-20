import Link from "next/link";
import Image from "next/image";
import empresa from "@/data/empresa.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-baroli-gray-50 border-t border-baroli-gray-200">
      <div className="container-baroli py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <div className="mb-4 rounded-md overflow-hidden inline-block">
              <Image
                src="/images/logo.png"
                alt="Baroli Portões"
                width={829}
                height={159}
                className="h-11 w-auto"
              />
            </div>
            <p className="text-sm text-baroli-gray-600 leading-relaxed max-w-xs mb-4">
              {empresa.subtitulo}
            </p>
            <p className="text-xs text-baroli-gray-500 italic">
              Mais de {empresa.anosExperiencia} anos em estruturas metálicas e serralheria.
            </p>
          </div>

          <div>
            <h3 className="eyebrow mb-4 text-baroli-blue">Navegue</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/catalogo" className="text-baroli-gray-600 hover:text-baroli-blue transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/calculadora" className="text-baroli-gray-600 hover:text-baroli-blue transition-colors">
                  Calculadora de preço
                </Link>
              </li>
              <li>
                <Link href="/projetos" className="text-baroli-gray-600 hover:text-baroli-blue transition-colors">
                  Projetos
                </Link>
              </li>
              <li>
                <Link href="/automacao" className="text-baroli-gray-600 hover:text-baroli-blue transition-colors">
                  Automação
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-baroli-gray-600 hover:text-baroli-blue transition-colors">
                  Sobre nós
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-4 text-baroli-blue">Linhas</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/catalogo?linha=especial" className="text-baroli-gray-600 hover:text-baroli-blue transition-colors">
                  Linha Especial
                </Link>
              </li>
              <li>
                <Link href="/catalogo?linha=padrao" className="text-baroli-gray-600 hover:text-baroli-blue transition-colors">
                  Linha Padrão
                </Link>
              </li>
              <li>
                <Link href="/catalogo?linha=prime" className="text-baroli-gray-600 hover:text-baroli-blue transition-colors">
                  Linha Prime
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-4 text-baroli-blue">Contato</h3>
            <ul className="space-y-3 text-sm text-baroli-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-baroli-blue mt-0.5">📞</span>
                <a href={`tel:${empresa.telefonePrincipal.replace(/\D/g, "")}`} className="hover:text-baroli-blue transition-colors">
                  {empresa.telefonePrincipal}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-baroli-blue mt-0.5">💬</span>
                <a
                  href={`https://wa.me/${empresa.whatsappE164}?text=Olá!%20Gostaria%20de%20mais%20informações`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-baroli-blue transition-colors"
                >
                  {empresa.whatsapp} (WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-baroli-blue mt-0.5">📍</span>
                <address className="not-italic hover:text-baroli-blue transition-colors">
                  {empresa.endereco}
                </address>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-baroli-blue mt-0.5">📸</span>
                <a href={empresa.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-baroli-blue transition-colors">
                  {empresa.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-baroli-gray-200 bg-white">
        <div className="container-baroli flex flex-col sm:flex-row justify-between items-center gap-4 py-6">
          <span className="text-xs text-baroli-gray-500">
            © {currentYear} {empresa.nome}. Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
