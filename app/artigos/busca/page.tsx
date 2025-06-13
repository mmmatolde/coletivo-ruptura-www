import { searchArticles } from '@/lib/contentful'
import Link from 'next/link'
import Image from 'next/image'
import SearchArticles from '@/app/components/SearchArticles'

export const revalidate = 0 // não fazer cache dos resultados da busca

export default async function BuscaPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string }
}) {
  const params = await searchParams
  const query = params?.q || ''
  const page = Number(params?.page) || 1
  const limit = 6
  const skip = (page - 1) * limit

  const { articles, total } = await searchArticles(query, limit, skip)
  const totalPages = Math.ceil(total / limit)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Resultados da Busca</h1>

      {/* Componente de Busca */}
      <SearchArticles />

      {/* Resultados */}
      {query ? (
        <>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            {total} resultado(s) encontrado(s) para "{query}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                href={`/artigos/${article.sys.id}`}
                key={article.sys.id}
                className="group"
              >
                <article className="bg-white dark:bg-zinc-800 rounded-lg overflow-hidden shadow-lg transition-transform group-hover:scale-105">
                  <div className="relative h-48 w-full">
                    <Image
                      src={`https:${article.fields.capa.fields.file.url}`}
                      alt={article.fields.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-red-600">
                      {article.fields.title}
                    </h2>
                    <div className="flex flex-col gap-1 text-gray-600 dark:text-gray-300">
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/artigos/busca?q=${query}&page=${pageNum}`}
                    className={`px-4 py-2 rounded ${
                      pageNum === page
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 dark:bg-zinc-700 hover:bg-red-100 dark:hover:bg-red-900'
                    }`}
                  >
                    {pageNum}
                  </Link>
                )
              )}
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Digite algo para buscar nos artigos
        </p>
      )}
    </main>
  )
} 