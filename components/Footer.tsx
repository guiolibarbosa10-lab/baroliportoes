import Link from "next/link";
import Image from "next/image";
import empresa from "../data/empresa.json";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container-baroli py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
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
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            {empresa.subtitulo}
          </p>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Navegue</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/catalogo" className="hover:text-white">Catálogo</Link></li>
            <li><Link href="/calculadora" className="hover:text-white">Calculadora de preço</Link></li>
            <li><Link href="/projetos" className="hover:text-white">Projetos</Link></li>
            <li><Link href="/automacao" className="hover:text-white">Automação</Link></li>
            <li><Link href="/sobre" className="hover:text-white">Sobre nós</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Linhas</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/catalogo?linha=especial" className="hover:text-white">Linha Especial</Link></li>
            <li><Link href="/catalogo?linha=padrao" className="hover:text-white">Linha Padrão</Link></li>
            <li><Link href="/catalogo?linha=prime" className="hover:text-white">Linha Prime</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Contato</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>{empresa.telefonePrincipal}</li>
            <li>{empresa.whatsapp} (WhatsApp)</li>
            <li>{empresa.endereco}</li>
            <li>
              <a
                href={empresa.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                {empresa.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-baroli flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/40">
          <span>
            © {new Date().getFullYear()} {empresa.nome}. Todos os direitos reservados.
          </span>
          <span>Mais de {empresa.anosExperiencia} anos em estruturas metálicas e serralheria.</span>
        </div>
      </div>
    </footer>
  );
}
