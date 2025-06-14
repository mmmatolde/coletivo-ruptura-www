import { getTexts } from '@/lib/contentful'
import { staticTexts } from './static-content'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Document } from '@contentful/rich-text-types'

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
  searchParams: { page?: string }
}) {
  const params = await searchParams
  const page = Number(params?.page) || 1
  const limit = 6
  const skip = (page - 1) * limit

  const { texts: contentfulTexts, total } = await getTexts(limit, skip)
  const totalPages = Math.ceil(total / limit)

  // Combinar textos estáticos e do Contentful
  const allTexts = [
    ...staticTexts,
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
    })
  ]

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
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Input type="search" placeholder="Pesquisar textos..." className="w-full" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100">
                Todos
              </Button>
              <Button variant="outline" size="sm">
                Originais
              </Button>
              <Button variant="outline" size="sm">
                Traduções
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Texts Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            {allTexts.map((text) => (
              <Link
                key={text.id}
                href={`/texts/${text.id}`}
                className="block transition-colors hover:text-red-600"
              >
                <Card className="group overflow-hidden transition-all hover:shadow-md">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="relative h-48 w-full md:h-[200px] md:w-1/3">
                      <Image
                        src={text.capa.url}
                        alt={text.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <CardHeader className="p-0 pb-3">
                        <CardTitle className="font-heading text-xl group-hover:text-red-600 transition-colors">{text.title}</CardTitle>
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
                    href={`/texts?page=${pageNum}`}
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
