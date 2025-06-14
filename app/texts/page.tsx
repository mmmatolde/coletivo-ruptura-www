import { getTexts } from '@/lib/contentful'
import { staticTexts } from './static-content'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Document } from '@contentful/rich-text-types'
import { TextFilters } from './components/TextFilters'

interface ContentfulText {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    originalOuTraducao: boolean;
    title: string;
    capa: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    texto: Document;
    autoria: string;
    date?: string;
  };
}

export const revalidate = 3600 // revalidar a cada hora

export default async function TextsPage({
  searchParams,
}: {
  searchParams: { 
    page?: string;
    search?: string;
    filter?: 'all' | 'original' | 'translation';
  }
}) {
  const params = await searchParams
  const page = Number(params?.page) || 1
  const search = params?.search || ''
  const filter = params?.filter || 'all'
  const limit = 6
  const skip = (page - 1) * limit

  const { texts: contentfulTexts, total } = await getTexts(limit, skip)
  const totalPages = Math.ceil(total / limit)

  // Combinar textos estáticos e do Contentful, com os estáticos sempre depois
  const allTexts = [
    ...contentfulTexts.map(text => {
      const fields = text.fields as ContentfulText['fields']
      return {
        id: text.sys.id,
        originalOuTraducao: fields.originalOuTraducao,
        title: fields.title,
        capa: {
          url: `https:${fields.capa.fields.file.url}`
        },
        texto: fields.texto,
        autoria: fields.autoria,
        date: fields.date || text.sys.createdAt
      }
    }),
    ...staticTexts
  ]

  // Aplicar filtros
  const filteredTexts = allTexts.filter(text => {
    const matchesSearch = search === '' || 
      text.title.toLowerCase().includes(search.toLowerCase()) ||
      text.autoria.toLowerCase().includes(search.toLowerCase())
    
    const matchesFilter = filter === 'all' || 
      (filter === 'original' && !text.originalOuTraducao) ||
      (filter === 'translation' && text.originalOuTraducao)

    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-red-600 to-red-900 py-16 text-white md:py-24">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl">Textos e Traduções</h1>
            <p className="mt-6 text-xl font-medium">Biblioteca de textos originais e traduções</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
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
          <div className="grid gap-8 md:grid-cols-2">
            {filteredTexts.map((text) => (
              <Link
                key={text.id}
                href={`/texts/${text.id}`}
                className="block transition-colors hover:text-red-600"
              >
                <Card className="group overflow-hidden transition-all hover:shadow-md h-[300px]">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="relative h-48 w-full md:h-full md:w-1/3">
                      <Image
                        src={text.capa.url}
                        alt={text.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <CardHeader className="p-0 pb-3">
                        <CardTitle className="font-heading text-xl group-hover:text-red-600 transition-colors line-clamp-2">{text.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" /> 
                          {new Date(text.date).toLocaleDateString('pt-PT', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0 flex-grow">
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {typeof text.texto === 'string' ? text.texto : 'Texto disponível'}
                        </p>
                      </CardContent>
                      <CardFooter className="p-0 pt-4 mt-auto">
                        <div className="flex items-center justify-between w-full text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" /> {text.autoria}
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 group-hover:text-red-600 transition-colors">
                            {text.originalOuTraducao ? 'Tradução' : 'Original'}
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
            <div className="mt-12 flex justify-center">
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/texts?page=${pageNum}&search=${search}&filter=${filter}`}
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
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
