"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const routes = [
  { href: "/", label: "Início" },
  { href: "/about", label: "Sobre Nós" },
  { href: "/agenda", label: "Agenda" },
  { href: "/artigos", label: "Artigos" },
  { href: "/tribuna", label: "Tribuna Pública" },
  { href: "/materials", label: "Material e Ações" },
  { href: "/texts", label: "Textos e Traduções" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/logo.png" alt="Logo Coletivo Ruptura" width={40} height={40} />
          <span className="font-heading text-2xl font-bold text-black">COLETIVO RUPTURA</span>
        </Link>

        <nav className="hidden items-center space-x-6 md:flex">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-sm font-medium transition-colors hover:text-red-600"
              onClick={() => window.scrollTo(0, 0)}
            >
              {route.label}
            </Link>
          ))}

          <div className="ml-4 flex items-center space-x-2">
            <Button asChild variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50">
              <Link href="/contact">Contacto</Link>
            </Button>
            <Button asChild size="sm" className="bg-red-600 text-white hover:bg-red-700">
              <Link href="/join">Junta-te</Link>
            </Button>
          </div>
        </nav>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white">
            <div className="flex flex-col space-y-4 py-4">
              <Link
                href="/"
                className="flex items-center space-x-2 font-heading text-2xl font-bold text-red-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <Image src="/images/logo.png" alt="Logo Coletivo Ruptura" width={30} height={30} />
                <span className="text-black">COLETIVO RUPTURA</span>
              </Link>
              <div className="flex flex-col space-y-3">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="text-base font-medium transition-colors hover:text-red-600"
                    onClick={() => {
                      setIsMenuOpen(false)
                      window.scrollTo(0, 0)
                    }}
                  >
                    {route.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col space-y-2 pt-4">
                  <Button asChild variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                      Contacto
                    </Link>
                  </Button>
                  <Button asChild className="w-full bg-red-600 text-white hover:bg-red-700">
                    <Link href="/join" onClick={() => setIsMenuOpen(false)}>
                      Junta-te
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
