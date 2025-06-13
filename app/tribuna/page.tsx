import { getTribunes } from '@/lib/contentful'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, MessageSquare, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export const revalidate = 3600 // revalidar a cada hora

export default async function TribunaPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const params = await searchParams
  const page = Number(params?.page) || 1
  const limit = 6
  const skip = (page - 1) * limit

  const { articles: tribunes, total } = await getTribunes(limit, skip)
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-red-600 to-red-900 py-16 text-white md:py-24">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl">Tribuna Pública</h1>
            <p className="mt-6 text-xl font-medium">Espaço aberto para debate, crítica e intervenção política</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      </section>

      {/* Search and Filter */}
      <section className="border-b py-8">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Input type="search" placeholder="Pesquisar na tribuna..." className="w-full" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100">
                Todos
              </Button>
              <Button variant="outline" size="sm">
                Política
              </Button>
              <Button variant="outline" size="sm">
                Economia
              </Button>
              <Button variant="outline" size="sm">
                Cultura
              </Button>
              <Button variant="outline" size="sm">
                Internacional
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tribune Posts */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            {tribunes.map((tribune) => (
              <Link
                key={tribune.sys.id}
                href={`/tribuna/${tribune.sys.id}`}
                className="block transition-colors hover:text-red-600"
              >
                <Card className="group overflow-hidden transition-all hover:shadow-md md:h-[200px]">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="relative h-48 w-full md:h-full md:w-1/3">
                      <Image
                        src={`https:${tribune.fields.capa.fields.file.url}`}
                        alt={tribune.fields.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 h-full">
                      <CardHeader className="p-0 pb-3">
                        <CardTitle className="font-heading text-xl group-hover:text-red-600 transition-colors">{tribune.fields.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" /> 
                          {new Date(tribune.fields.date || tribune.sys.createdAt).toLocaleDateString('pt-PT', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" /> {tribune.fields.autoria}
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 group-hover:text-red-600 transition-colors">
                            <MessageSquare className="h-4 w-4" /> 0
                          </div>
                        </div>
                      </CardContent>
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
                    href={`/tribuna?page=${pageNum}`}
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

      {/* Submit Section */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-lg border bg-white p-8 shadow-sm">
            <div className="text-center">
              <h2 className="font-heading text-2xl font-bold text-gray-900">Submete o teu texto</h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                A Tribuna Pública é um espaço aberto a todos os que queiram contribuir para o debate político e social.
                Envia-nos o teu texto para publicação.
              </p>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-heading text-lg font-bold text-gray-900">Critérios para publicação</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Textos originais e inéditos</li>
                  <li>• Máximo de 5000 palavras</li>
                  <li>• Temas relacionados com política, economia, cultura e sociedade</li>
                  <li>• Perspetiva crítica e fundamentada</li>
                  <li>• Respeito pelos princípios do Colectivo Ruptura</li>
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-gray-900">Como submeter</h3>
                <p className="mt-4 text-sm text-gray-600">
                  Envia o teu texto em formato Word ou PDF para o email tribuna@colectivoruptura.org, juntamente com uma
                  breve biografia e uma fotografia (opcional).
                </p>
                <div className="mt-6">
                  <Button asChild className="bg-red-600 text-white hover:bg-red-700">
                    <Link href="/contact">
                      Contactar para Submissão
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 