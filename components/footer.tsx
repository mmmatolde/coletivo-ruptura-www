import Link from "next/link"
import Image from "next/image"
import { SiX, SiFacebook, SiInstagram } from "react-icons/si"

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/logo.png" alt="Logo Coletivo Ruptura" width={40} height={40} />
              <span className="font-heading text-2xl font-bold text-black">COLETIVO RUPTURA</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 text-justify mr-[10rem]">
              Grupo Comunista pela abolição da Família, da Propriedade Privada e a extinção do Estado; pela recuperação
              do Programa Comunista e a auto-emancipação do proletariado.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="https://www.facebook.com/rupturacoletivo/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600">
                <SiFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://x.com/coletivoruptura" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600">
                <SiX className="h-5 w-5" />
                <span className="sr-only">X (antigo Twitter)</span>
              </Link>
              <Link href="https://www.instagram.com/coletivo_ruptura/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600">
                <SiInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Navegação</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-red-600">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-red-600">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-sm text-gray-600 hover:text-red-600">
                  Artigos
                </Link>
              </li>
              <li>
                <Link href="/tribuna" className="text-sm text-gray-600 hover:text-red-600">
                  Tribuna Pública
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Recursos</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/materials" className="text-sm text-gray-600 hover:text-red-600">
                  Material e Ações
                </Link>
              </li>
              <li>
                <Link href="/agenda" className="text-sm text-gray-600 hover:text-red-600">
                  Agenda
                </Link>
              </li>
              <li>
                <Link href="/texts" className="text-sm text-gray-600 hover:text-red-600">
                  Textos e Traduções
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Contacto</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-red-600">
                  Contacto
                </Link>
              </li>
              <li className="text-sm text-gray-600">info@coletivoruptura.org</li>
              <li className="text-sm text-gray-600">+351 912 345 678</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6">
          <p className="text-center text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Coletivo Ruptura. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
