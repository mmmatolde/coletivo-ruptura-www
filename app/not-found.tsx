import Link from 'next/link'
import { Suspense } from 'react'

// Main NotFound component (Server Component by default)
export default function NotFound() {
  return <NotFoundClientBoundary />
}

// Client Boundary Component
// All client-side logic and components that use client hooks go here.
// --- Start of Client Boundary ---
function ClientBoundaryContent() {
  'use client' // This directive applies only to components defined *below* it in this closure,
                // or if this were a separate file, to the whole file.

  const { useSearchParams } = require('next/navigation') // Keep require here for now or ensure top-level import if moving to its own file
  const dynamic = require('next/dynamic') // Same for dynamic

  // Fallback component for loading states
  const LoadingFallback = () => (
    <p className="text-gray-600 dark:text-gray-300 mb-8">
      Carregando...
    </p>
  )

  // Original component that uses useSearchParams
  const RawSearchParamsContent = () => {
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

  // Dynamically import the component that uses useSearchParams, disabling SSR
  const SearchParamsContent = dynamic(() => Promise.resolve(RawSearchParamsContent), {
    ssr: false,
    loading: () => <LoadingFallback />,
  })

  // Main content rendering for the client boundary
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">A Página não foi encontrada</h2>
        <Suspense fallback={<LoadingFallback />}>
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

// The actual client boundary component that Next.js will recognize
// For clarity and best practice, this would ideally be in its own file e.g., not-found-client.tsx
const NotFoundClientBoundary = ClientBoundaryContent
// --- End of Client Boundary ---
