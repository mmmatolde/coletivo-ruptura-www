'use client'

import { getTribunes } from '@/lib/contentful'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, MessageSquare, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PaginationWithEllipsis } from "@/components/ui/pagination"

const CATEGORIAS = [
  'Internacional',
  'Movimento Estudantil',
  'LGBTQIA+',
  'Feminismo'
] as const

export default function TribunaPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [allTribunes, setAllTribunes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const limit = 6

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const { articles } = await getTribunes(1000, 0)
      setAllTribunes(articles)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const filteredTribunes = allTribunes.filter((tribune) => {
    const matchesSearch = searchTerm
      ? tribune.fields.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tribune.fields.autoria.toLowerCase().includes(searchTerm.toLowerCase())
      : true

    const matchesCategory = selectedCategory === 'all' || 
      (tribune.fields.categoria && tribune.fields.categoria.includes(selectedCategory))

    return matchesSearch && matchesCategory
  })

  const startIndex = (page - 1) * limit
  const paginatedTribunes = filteredTribunes.slice(startIndex, startIndex + limit)
  const totalPages = Math.ceil(filteredTribunes.length / limit)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    router.push(`/tribuna?${params.toString()}`)
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
    router.push(`/tribuna?${params.toString()}`)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-red-600 to-red-900 py-16 text-white md:py-24">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl">Tribuna Pública</h1>
            <p className="mt-6 text-xl font-medium">Espaço aberto para debate, crítica e intervenção política</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/images/Iskra_12-1900.jpg')] bg-cover bg-top opacity-10 mix-blend-overlay"></div>
      </section>

      {/* Search and Filter */}
      <section className="border-b py-8">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Input 
                  type="search" 
                  placeholder="Pesquisar por título ou autor..." 
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

      {/* Tribune Posts */}
      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-8">Carregando artigos...</div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2">
                {paginatedTribunes.map((tribune) => (
                  <Link
                    key={tribune.sys.id}
                    href={`/tribuna/${tribune.sys.id}`}
                    className="block transition-colors hover:text-red-600"
                  >
                    <Card className="group h-full overflow-hidden transition-all hover:shadow-md">
                      <div className="flex flex-col md:flex-row h-full">
                        <div className="relative h-48 w-full md:h-[200px] md:w-1/3">
                          <Image
                            src={`https:${tribune.fields.capa.fields.file.url}`}
                            alt={tribune.fields.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-6">
                          <div>
                            <CardHeader className="p-0 pb-2">
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" /> 
                                {new Date(tribune.fields.date || tribune.sys.createdAt).toLocaleDateString('pt-PT', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </div>
                            </CardHeader>
                            <CardTitle className="font-heading text-xl group-hover:text-red-600 transition-colors line-clamp-2 mt-2">
                              {tribune.fields.title}
                            </CardTitle>
                          </div>
                          <CardFooter className="p-0 pt-4">
                            <div className="flex items-center justify-between w-full text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" /> {tribune.fields.autoria}
                              </div>
                              <div className="flex items-center gap-1 text-gray-500 group-hover:text-red-600 transition-colors">
                                <MessageSquare className="h-4 w-4" /> 0
                              </div>
                            </div>
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <PaginationWithEllipsis
                  currentPage={page}
                  totalPages={totalPages}
                  baseUrl="/tribuna"
                  searchParams={{
                    ...(searchTerm && { search: searchTerm }),
                    ...(selectedCategory !== 'all' && { category: selectedCategory })
                  }}
                />
              )}
            </>
          )}
        </div>
      </section>

      {/* Submit Section */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-lg border bg-white p-8 shadow-sm">
            <div className="text-center">
              <h2 className="font-heading text-2xl font-bold text-gray-900">Submete o teu texto</h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                A Tribuna Pública é um espaço aberto a todos os que queiram contribuir para o debate político e social.
                Envia-nos o teu texto para publicação.
              </p>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-heading text-lg font-bold text-gray-900">Critérios para publicação</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Textos originais e inéditos</li>
                  <li>• Máximo de 5000 palavras</li>
                  <li>• Temas relacionados com política, economia, cultura e sociedade</li>
                  <li>• Perspetiva crítica e fundamentada</li>
                  <li>• Respeito pelos princípios do Colectivo Ruptura</li>
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-gray-900">Como submeter</h3>
                <p className="mt-4 text-sm text-gray-600">
                  Envia o teu texto em formato Word ou PDF para o email tribuna@colectivoruptura.org, juntamente com uma
                  breve biografia e uma fotografia (opcional).
                </p>
                <div className="mt-6">
                  <Button asChild className="bg-red-600 text-white hover:bg-red-700">
                    <Link href="/contact">
                      Contactar para Submissão
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 