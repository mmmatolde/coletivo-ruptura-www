'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, User } from "lucide-react"
import { TextFilters } from './components/TextFilters'
import { PaginationWithEllipsis } from '@/components/ui/pagination'
import { slugify } from '@/lib/utils'

export type Text = {
  id: string;
  originalOuTraducao: boolean;
  title: string;
  capa: {
    url: string;
  };
  texto: any;
  autoria: string;
  date: string;
}

export default function TextosClient({ allTexts }: { allTexts: Text[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page')) || 1
  const search = searchParams.get('search') || ''
  const filter = searchParams.get('filter') || 'all'
  const limit = 6

  const filteredTexts = allTexts.filter(text => {
    const matchesSearch = search === '' || text.title.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' ||
      (filter === 'textos' && !text.originalOuTraducao) ||
      (filter === 'translation' && text.originalOuTraducao)
    return matchesSearch && matchesFilter
  })

  const totalPages = Math.ceil(filteredTexts.length / limit)
  const paginatedTexts = filteredTexts.slice((page - 1) * limit, page * limit)

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/textos-e-traducoes?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-red-600 to-red-900 py-16 text-white md:py-24">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl">Textos e Traduções</h1>
            <p className="mt-6 text-xl font-medium">Biblioteca de textos e traduções</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/iishmarx.jpg?height=800&width=1600')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      </section>

      {/* Search and Filter */}
      <section className="border-b py-8">
        <div className="container">
          <TextFilters />
        </div>
      </section>

      {/* Texts Grid */}
      <section className="py-16">
        <div className="container">
          {filteredTexts.length === 0 ? (
            <div className="text-center text-gray-500">Nenhum texto encontrado.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedTexts.map((text) => (
                <Link
                  key={text.id}
                  href={`/textos-e-traducoes/${text.id}/${slugify(text.title)}`}
                  className="block group transition-transform"
                >
                  <Card className="h-full flex flex-col transition-all duration-200 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-red-600">
                    <CardHeader>
                      <div className="relative h-40 w-full mb-4">
                        <Image
                          src={text.capa.url}
                          alt={text.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <CardTitle className="line-clamp-2">{text.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-gray-500 line-clamp-3">
                        {/* Se houver um resumo, pode ser colocado aqui */}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center text-xs text-gray-500">
                      <span>Por {text.autoria}</span>
                      <span>{new Date(text.date).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                      <span className="ml-2 rounded bg-zinc-900/60 px-2 py-1 text-xs font-medium text-white">
                        {!text.originalOuTraducao ? 'Texto' : 'Tradução'}
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <PaginationWithEllipsis
              currentPage={page}
              totalPages={totalPages}
              baseUrl="/textos-e-traducoes"
            />
          )}
        </div>
      </section>
    </div>
  )
} 