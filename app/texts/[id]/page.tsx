import { getTexts } from '@/lib/contentful'
import Image from 'next/image'
import { Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document, BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'

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

export default async function TextPage({
  params,
}: {
  params: { id: string }
}) {
  // Buscar texto do Contentful
  const { texts: contentfulTexts } = await getTexts(1000, 0)
  const contentfulText = contentfulTexts.find(text => text.sys.id === params.id)
  
  // Combinar resultados
  const text = contentfulText 
    ? {
        id: contentfulText.sys.id,
        originalOuTraducao: (contentfulText.fields as ContentfulText['fields']).originalOuTraducao,
        title: (contentfulText.fields as ContentfulText['fields']).title,
        capa: {
          url: `https:${(contentfulText.fields as ContentfulText['fields']).capa.fields.file.url}`
        },
        texto: (contentfulText.fields as ContentfulText['fields']).texto,
        autoria: (contentfulText.fields as ContentfulText['fields']).autoria,
        date: (contentfulText.fields as ContentfulText['fields']).date || contentfulText.sys.createdAt
      }
    : null

  if (!text) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Texto não encontrado</h1>
          <p className="mt-4">O texto que você está procurando não existe.</p>
          <Button asChild className="mt-6">
            <Link href="/texts">Voltar para Textos</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Content */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <Button asChild variant="ghost" className="mb-8 text-gray-600 hover:bg-gray-100">
                <Link href="/texts">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Textos
                </Link>
              </Button>
              <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl">{text.title}</h1>
              <div className="mt-6 flex items-center gap-4 text-lg text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" /> {text.autoria}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {new Date(text.date).toLocaleDateString('pt-PT', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <div className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700">
                  {text.originalOuTraducao ? 'Tradução' : 'Texto'}
                </div>
              </div>
            </div>
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={text.capa.url}
                alt={text.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {documentToReactComponents(text.texto as Document, options)}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 