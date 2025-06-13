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
      <section className="relative min-h-[450px] text-white">
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
        <div className="container absolute bottom-0 left-1/2 -translate-x-1/2 text-center z-10">
          <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl mb-8">{tribune.fields.title}</h1>
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

      {/* Seção de Comentários */}
      <section className="bg-gray-100 py-16 dark:bg-zinc-800">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Comentários</h2>

          {/* Formulário de Comentários */}
          <div className="bg-white dark:bg-zinc-700 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Deixe o seu comentário</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Comentário</label>
                <textarea
                  id="comment"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                ></textarea>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Submeter Comentário
              </button>
            </form>
          </div>

          {/* Lista de Comentários (Exemplo Estático) */}
          <div className="space-y-6">
          </div>
        </div>
      </section>
    </div>
  )
} 