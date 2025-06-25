import { getEventById } from '@/lib/contentful'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ShareButton } from '@/components/ShareButton'
import type { Metadata } from 'next'
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer'
import type { Document as ContentfulDocument } from '@contentful/rich-text-types'
import { slugify } from '@/lib/utils'

export const revalidate = 3600

// Função para gerar metadados dinâmicos para partilha
export async function generateMetadata({ params }: { params: { id: string; slug: string } }): Promise<Metadata> {
  const event = await getEventById(params.id)
  if (!event) {
    return { title: 'Evento não encontrado' }
  }
  const imageUrl = event.fields.capa ? `https:${event.fields.capa.fields.file.url}` : '/images/logo.png'
  const slug = slugify(event.fields.title)
  return {
    title: event.fields.title,
    openGraph: {
      title: event.fields.title,
      type: 'article',
      url: `/agenda/${event.sys.id}/${slug}`,
      images: [
        { url: imageUrl, width: 1200, height: 630, alt: event.fields.title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: event.fields.title,
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

export default async function EventDetailsPage({ params }: { params: { id: string; slug: string } }) {
  const event = await getEventById(params.id)
  if (!event) notFound()
  const slug = slugify(event.fields.title)

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={`https:${event.fields.capa.fields.file.url}`}
            alt={event.fields.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1 className="text-4xl font-bold mb-4">{event.fields.title}</h1>
        <ShareButton
          url={`${typeof window !== 'undefined' ? window.location.origin : ''}/agenda/${event.sys.id}/${slug}`}
          title={event.fields.title}
          type="evento"
        />

        <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-300 mb-8">
          <p>{new Date(event.fields.dataEHora).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })} às {new Date(event.fields.dataEHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p>{event.fields.morada || 'Localização não disponível'}</p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          {documentToReactComponents(event.fields.descricao as ContentfulDocument, options)}
        </div>
      </article>
    </main>
  )
} 