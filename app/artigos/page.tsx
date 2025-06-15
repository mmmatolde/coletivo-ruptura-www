'use client'

import { getArticles } from '@/lib/contentful'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const CATEGORIAS = [
  'Internacional',
  'Movimento Estudantil',
  'LGBTQIA+',
  'Feminismo'
] as const

export default function ArtigosPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [allArticles, setAllArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const limit = 6

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const { articles } = await getArticles(1000, 0)
      setAllArticles(articles)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const filteredArticles = allArticles.filter((article) => {
    const matchesSearch = searchTerm
      ? article.fields.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true

    const matchesCategory = selectedCategory === 'all' || 
      (article.fields.categoria && article.fields.categoria.includes(selectedCategory))

    return matchesSearch && matchesCategory
  })

  const startIndex = (page - 1) * limit
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + limit)
  const totalPages = Math.ceil(filteredArticles.length / limit)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    router.push(`/artigos?${params.toString()}`)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    const params = new URLSearchParams(searchParams.toString())
    if (value !== 'all') {
      params.set('category', value)
    } else {
      params.delete('category')
    }
    params.set('page', '1')
    router.push(`/artigos?${params.toString()}`)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-red-600 to-red-900 py-16 text-white md:py-24">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl">Artigos</h1>
            <p className="mt-6 text-xl font-medium">Análises, reflexões e debates sobre temas da atualidade</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/images/revolutionary-background.png')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
      </section>

      {/* Search and Filter */}
      <section className="border-b py-8">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Input 
                  type="search" 
                  placeholder="Pesquisar por título..." 
                  className="w-full"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-1/5">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {CATEGORIAS.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-8">Carregando artigos...</div>
        ) : (
          <>
            {/* Grid de Artigos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedArticles.map((article) => (
                <Link
                  href={`/artigos/${article.sys.id}`}
                  key={article.sys.id}
                  className="group"
                >
                  <article className="bg-white dark:bg-zinc-800 rounded-lg overflow-hidden shadow-lg transition-transform group-hover:scale-105 h-[350px] flex flex-col">
                    <div className="relative h-48 w-full flex-shrink-0">
                      <Image
                        src={`https:${article.fields.capa.fields.file.url}`}
                        alt={article.fields.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-red-600 line-clamp-2">
                        {article.fields.title}
                      </h2>
                      <div className="flex flex-col gap-1 text-gray-600 dark:text-gray-300 mt-auto">
                        <p>Por {article.fields.autoria}</p>
                        <p>{new Date(article.fields.date || article.sys.createdAt).toLocaleDateString('pt-PT', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}</p>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/artigos?page=${pageNum}${searchTerm ? `&search=${searchTerm}` : ''}${selectedCategory !== 'all' ? `&category=${selectedCategory}` : ''}`}
                    className={`px-4 py-2 rounded ${
                      pageNum === page
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 dark:bg-zinc-700 hover:bg-red-100 dark:hover:bg-red-900'
                    }`}
                  >
                    {pageNum}
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
} 