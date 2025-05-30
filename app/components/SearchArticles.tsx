'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { FiSearch } from 'react-icons/fi'

export default function SearchArticles() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      startTransition(() => {
        router.push(`/artigos/busca?q=${encodeURIComponent(searchTerm.trim())}`)
      })
    }
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-lg mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar artigos..."
          className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <button
          type="submit"
          disabled={isPending}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {isPending ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
    </form>
  )
} 