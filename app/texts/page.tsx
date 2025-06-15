import { getTexts } from '@/lib/contentful'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Document, BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
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

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text: React.ReactNode) => <u>{text}</u>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
      <p className="mb-4 text-justify">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
      <h1 className="text-4xl font-bold mb-6">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
      <h2 className="text-3xl font-bold mb-4">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
      <h3 className="text-2xl font-bold mb-3">{children}</h3>
    ),
    [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-red-600 pl-4 my-4 italic">
        {children}
      </blockquote>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
      <ol className="list-decimal pl-5 mb-4">{children}</ol>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
      <ul className="list-disc pl-5 mb-4">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
      <li className="mb-2">{children}</li>
    ),
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
      <a href={node.data.uri} className="text-red-600 hover:underline">{children}</a>
    ),
  },
}

export default async function TextsPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    search?: string;
    filter?: 'all' | 'textos' | 'translation';
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
  ]

  // Aplicar filtros
  const filteredTexts = allTexts.filter(text => {
    const matchesSearch = search === '' || 
      text.title.toLowerCase().includes(search.toLowerCase())
    
    const matchesFilter = filter === 'all' || 
      (filter === 'textos' && !text.originalOuTraducao) ||
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
          <div className="grid gap-8 md:grid-cols-2">
            {filteredTexts.map((text) => (
              <Link
                key={text.id}
                href={`/texts/${text.id}`}
                className="block transition-colors hover:text-red-600"
              >
                <Card className="group overflow-hidden transition-all hover:shadow-md h-[180px]">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="relative h-[180px] w-full md:h-full md:w-[180px]">
                      <Image
                        src={text.capa.url}
                        alt={text.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 180px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <CardHeader className="p-0 pb-2">
                        <CardTitle className="font-heading text-lg group-hover:text-red-600 transition-colors line-clamp-2">{text.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3 w-3" /> 
                          {new Date(text.date).toLocaleDateString('pt-PT', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="p-0 pt-2 mt-auto">
                        <div className="flex items-center justify-between w-full text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" /> {text.autoria}
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 group-hover:text-red-600 transition-colors">
                            {text.originalOuTraducao ? 'Tradução' : 'Texto'}
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
