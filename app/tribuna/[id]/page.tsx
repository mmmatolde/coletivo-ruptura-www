import { getTribuneById } from '@/lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Calendar, User } from 'lucide-react'

export const revalidate = 3600 // revalidar a cada hora

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-extrabold text-gray-900 dark:text-white">{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em className="text-gray-800 dark:text-gray-200">{text}</em>,
    [MARKS.UNDERLINE]: (text: React.ReactNode) => <u>{text}</u>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
      <p className="mb-4 text-justify text-gray-700 dark:text-gray-300">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
      <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{children}</h3>
    ),
    [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-red-600 pl-4 my-4 italic text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
      <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
      <li className="mb-2">{children}</li>
    ),
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
      <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline font-medium dark:text-red-400">
        {children}
      </a>
    ),
  },
}

export default async function TribunaPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params
  const tribune = await getTribuneById(resolvedParams.id)

  if (!tribune) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-40 text-white md:py-64">
        <div className="absolute inset-0">
          <Image
            src={`https:${tribune.fields.capa.fields.file.url}`}
            alt={tribune.fields.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-16">
        <div className="container">
          <article className="mx-auto max-w-4xl">
            <div className="flex items-center gap-4 text-lg text-gray-600 dark:text-gray-300 mb-8">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{tribune.fields.autoria}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>
                  {new Date(tribune.fields.date || tribune.sys.createdAt).toLocaleDateString('pt-PT', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
            {/* Conteúdo */}
            <div className="prose dark:prose-invert max-w-none">
              {documentToReactComponents(tribune.fields.texto, options)}
            </div>
          </article>
        </div>
      </section>
    </div>
  )
} 