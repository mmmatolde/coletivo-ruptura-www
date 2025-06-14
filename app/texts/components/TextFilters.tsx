'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from 'next/navigation'

export function TextFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const filter = searchParams.get('filter') || 'all'

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('search', value)
    params.set('page', '1')
    router.push(`/texts?${params.toString()}`)
  }

  const handleFilter = (value: 'all' | 'textos' | 'translation') => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('filter', value)
    params.set('page', '1')
    router.push(`/texts?${params.toString()}`)
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="w-full md:w-1/3">
        <div className="relative">
          <Input 
            type="search" 
            placeholder="Pesquisar textos..." 
            className="w-full"
            defaultValue={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className={`${filter === 'all' ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100' : ''}`}
          onClick={() => handleFilter('all')}
        >
          Todos
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className={`${filter === 'textos' ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100' : ''}`}
          onClick={() => handleFilter('textos')}
        >
          Textos
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className={`${filter === 'translation' ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100' : ''}`}
          onClick={() => handleFilter('translation')}
        >
          Traduções
        </Button>
      </div>
    </div>
  )
} 