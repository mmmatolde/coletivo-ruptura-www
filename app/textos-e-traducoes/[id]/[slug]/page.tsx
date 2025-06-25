import { getTextById } from '@/lib/contentful'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ShareButton } from '@/components/ShareButton'
import type { Metadata } from 'next'
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer'
import type { Document as ContentfulDocument } from '@contentful/rich-text-types'
import { slugify } from '@/lib/utils'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: { id: string; slug: string } }): Promise<Metadata> {
  const text = await getTextById(params.id)
  if (!text) {
    return { title: 'Texto não encontrado' }
  }
  const imageUrl = `https:${text.fields.capa.fields.file.url}`
  const slug = slugify(text.fields.title)
  return {
    title: text.fields.title,
    openGraph: {
      title: text.fields.title,
      type: 'article',
      url: `/textos-e-traducoes/${text.sys.id}/${slug}`,
      images: [
        { url: imageUrl, width: 1200, height: 630, alt: text.fields.title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: text.fields.title,
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

export default async function TextPage({ params }: { params: { id: string; slug: string } }) {
  const text = await getTextById(params.id)
  if (!text) notFound()
  const slug = slugify(text.fields.title)

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={`https:${text.fields.capa.fields.file.url}`}
            alt={text.fields.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1 className="text-4xl font-bold mb-4">{text.fields.title}</h1>
        <ShareButton
          url={`${typeof window !== 'undefined' ? window.location.origin : ''}/textos-e-traducoes/${text.sys.id}/${slug}`}
          title={text.fields.title}
          type="texto"
        />

        <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-300 mb-8">
          <p>Por {text.fields.autoria}</p>
          <p>{new Date(text.fields.date || text.sys.createdAt).toLocaleDateString('pt-PT', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}</p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          {documentToReactComponents(text.fields.texto as ContentfulDocument, options)}
        </div>
      </article>
    </main>
  )
} 