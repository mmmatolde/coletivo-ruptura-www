import { getTribuneById } from '@/lib/contentful'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Calendar, User } from 'lucide-react'
import { ShareButton } from '@/components/ShareButton'
import type { Metadata } from 'next'
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer'
import type { Document as ContentfulDocument } from '@contentful/rich-text-types'

const CATEGORIAS = [
  'Internacional',
  'Movimento Estudantil',
  'LGBTQIA+',
  'Feminismo'
] as const

export const revalidate = 3600

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const tribune = await getTribuneById(params.id)
  if (!tribune) {
    return { title: 'Tribuna não encontrada' }
  }
  const imageUrl = `https:${tribune.fields.capa.fields.file.url}`
  return {
    title: tribune.fields.title,
    openGraph: {
      title: tribune.fields.title,
      type: 'article',
      url: `/tribuna-publica/${tribune.sys.id}`,
      images: [
        { url: imageUrl, width: 1200, height: 630, alt: tribune.fields.title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: tribune.fields.title,
      images: [imageUrl],
    },
  }
}

const options: Options = {
  renderMark: {
    bold: (text) => <strong>{text}</strong>,
    italic: (text) => <em>{text}</em>,
    underline: (text) => <u>{text}</u>,
  },
  renderNode: {
    paragraph: (node, children) => <p className="mb-4 text-justify">{children}</p>,
    'heading-1': (node, children) => <h1 className="text-4xl font-bold mb-6">{children}</h1>,
    'heading-2': (node, children) => <h2 className="text-3xl font-bold mb-4">{children}</h2>,
    'heading-3': (node, children) => <h3 className="text-2xl font-bold mb-3">{children}</h3>,
    'unordered-list': (node, children) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
    'ordered-list': (node, children) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
    'list-item': (node, children) => <li className="mb-2">{children}</li>,
    hyperlink: (node, children) => <a href={node.data.uri} className="text-red-600 hover:underline">{children}</a>,
    blockquote: (node, children) => <blockquote className="border-l-4 border-red-600 pl-4 my-4 italic">{children}</blockquote>,
    'embedded-asset-block': (node: any) => {
      if (node.data.target?.fields?.file?.url) {
        return (
          <div className="my-8">
            <Image
              src={`https:${node.data.target.fields.file.url}`}
              alt={node.data.target.fields.title || 'Imagem incorporada'}
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
        )
      }
      return null
    },
  },
}

export default async function TribunaPage({ params }: { params: { id: string } }) {
  const tribune = await getTribuneById(params.id)
  if (!tribune) notFound()

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={`https:${tribune.fields.capa.fields.file.url}`}
            alt={tribune.fields.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1 className="text-4xl font-bold mb-4">{tribune.fields.title}</h1>
        <ShareButton
          url={`${typeof window !== 'undefined' ? window.location.origin : ''}/tribuna-publica/${tribune.sys.id}`}
          title={tribune.fields.title}
          type="tribuna"
        />

        <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-300 mb-8">
          <p>Por {tribune.fields.autoria}</p>
          <p>{new Date(tribune.fields.date || tribune.sys.createdAt).toLocaleDateString('pt-PT', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}</p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          {documentToReactComponents(tribune.fields.texto as ContentfulDocument, options)}
        </div>
      </article>
    </main>
  )
} 