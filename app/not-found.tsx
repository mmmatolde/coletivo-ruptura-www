'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const dynamic = 'force-static'
export const revalidate = false

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-gray-50">
      <div className="container px-4 py-16 text-center">
        <h1 className="font-heading text-6xl font-bold text-red-600">404</h1>
        <h2 className="mt-4 font-heading text-2xl font-bold text-gray-900">Página não encontrada</h2>
        <p className="mt-4 text-gray-600">
          A página que estás à procura não existe ou foi movida.
        </p>
        <div className="mt-8">
          <Button asChild className="bg-red-600 text-white hover:bg-red-700">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar à página inicial
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 