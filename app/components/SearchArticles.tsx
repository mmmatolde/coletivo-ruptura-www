'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { FiSearch } from 'react-icons/fi'

export default function SearchArticles() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmedTerm = searchTerm.trim()
    
    if (!trimmedTerm) {
      setError('Por favor, insira um termo de busca')
      return
    }

    if (trimmedTerm.length < 3) {
      setError('O termo de busca deve ter pelo menos 3 caracteres')
      return
    }

    startTransition(() => {
      router.push(`/artigos/busca?q=${encodeURIComponent(trimmedTerm)}`)
    })
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-lg mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setError('')
          }}
          placeholder="Buscar artigos..."
          className={`w-full px-4 py-2 pl-10 rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-zinc-700'
          } bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-600`}
          aria-invalid={!!error}
          aria-describedby={error ? 'search-error' : undefined}
        />
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <button
          type="submit"
          disabled={isPending}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
      {error && (
        <p id="search-error" className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </form>
  )
} 