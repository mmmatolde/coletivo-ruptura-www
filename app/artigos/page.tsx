import { getArticles } from '@/lib/contentful'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 3600 // revalidar a cada hora

export default async function ArtigosPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const params = await searchParams
  const page = Number(params?.page) || 1
  const limit = 6
  const skip = (page - 1) * limit

  const { articles, total } = await getArticles(limit, skip)
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-red-600 to-red-900 py-16 text-white md:py-24">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl">Artigos</h1>
            <p className="mt-6 text-xl font-medium">Análises, reflexões e debates sobre temas da atualidade</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/images/revolutionary-background.png')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {/* Grid de Artigos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              href={`/artigos/${article.sys.id}`}
              key={article.sys.id}
              className="group"
            >
              <article className="bg-white dark:bg-zinc-800 rounded-lg overflow-hidden shadow-lg transition-transform group-hover:scale-105 h-[400px] flex flex-col">
                <div className="relative h-48 w-full flex-shrink-0">
                  <Image
                    src={`https:${article.fields.capa.fields.file.url}`}
                    alt={article.fields.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-red-600 line-clamp-2">
                    {article.fields.title}
                  </h2>
                  <div className="flex flex-col gap-1 text-gray-600 dark:text-gray-300 mt-auto">
                    <p>Por {article.fields.autoria}</p>
                    <p>{new Date(article.fields.date || article.sys.createdAt).toLocaleDateString('pt-PT', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}</p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Link
                key={pageNum}
                href={`/artigos?page=${pageNum}`}
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
        )}
      </main>
    </div>
  )
} 