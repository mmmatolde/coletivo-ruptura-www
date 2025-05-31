'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

// Componente que usa useSearchParams deve ser separado e cliente
const SearchParamsContent = () => {
  // const { useSearchParams } = require('next/navigation')
  const searchParams = useSearchParams()
  const from = searchParams.get('from')

  return (
    <p className="text-gray-600 dark:text-gray-300 mb-8">
      {from
        ? `A página "${from}" não foi encontrada.`
        : 'A página que você está procurando não existe.'}
    </p>
  )
}

// Componente principal que não depende de useSearchParams
const NotFoundContent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">A Página não foi encontrada</h2>
        <Suspense fallback={
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Carregando...
          </p>
        }>
          <SearchParamsContent />
        </Suspense>
        <Link
          href="/"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}

export default function NotFound() {
  return <NotFoundContent />
} 