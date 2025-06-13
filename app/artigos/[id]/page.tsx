import { getArticleById } from '@/lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import Image from 'next/image'
import { notFound } from 'next/navigation'

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
  },
}

export default async function ArtigoPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params
  const article = await getArticleById(resolvedParams.id)

  if (!article) {
    notFound()
  }

  console.log('Data do artigo:', {
    dataManual: article.fields.date,
    dataCriacao: article.sys.createdAt
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Imagem de Capa */}
        <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={`https:${article.fields.capa.fields.file.url}`}
            alt={article.fields.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold mb-4">{article.fields.title}</h1>

        {/* Autor e Data */}
        <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-300 mb-8">
          <p>Por {article.fields.autoria}</p>
          <p>{new Date(article.fields.date || article.sys.createdAt).toLocaleDateString('pt-PT', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</p>
        </div>

        {/* Conteúdo */}
        <div className="prose dark:prose-invert max-w-none">
          {documentToReactComponents(article.fields.texto, options)}
        </div>
      </article>
    </main>
  )
} 