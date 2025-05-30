"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, MessageSquare, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function TribunePage() {
  // Sample tribune posts data
  const posts = [
    {
      id: 1,
      title: "A Luta Continua: Reflexões sobre o Movimento Operário",
      excerpt: "Uma análise histórica e contemporânea do movimento operário e suas perspectivas futuras.",
      date: "15 Maio 2025",
      author: "António Silva",
      comments: 12,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      title: "Contra o Imperialismo: Solidariedade Internacional",
      excerpt: "Reflexões sobre a importância da solidariedade internacional na luta contra o imperialismo.",
      date: "8 Maio 2025",
      author: "Joana Martins",
      comments: 9,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      title: "Crítica da Economia Política Contemporânea",
      excerpt: "Uma análise crítica das contradições do capitalismo contemporâneo e suas crises cíclicas.",
      date: "1 Maio 2025",
      author: "Manuel Costa",
      comments: 15,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 4,
      title: "Habitação: Um Direito, Não Uma Mercadoria",
      excerpt: "Análise da crise habitacional e propostas para uma política de habitação justa e acessível.",
      date: "25 Abril 2025",
      author: "Sofia Almeida",
      comments: 18,
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

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
            {posts.map((post) => (
              <Card key={post.id} className="group overflow-hidden transition-all hover:shadow-md">
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-48 w-full md:h-auto md:w-1/3">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <CardHeader className="p-0 pb-3">
                      <CardTitle className="font-heading text-xl">{post.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> {post.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 py-3">
                      <p className="text-gray-600">{post.excerpt}</p>
                      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" /> {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" /> {post.comments} comentários
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-0 pt-3">
                      <Link
                        href={`/tribune/${post.id}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className="flex items-center text-sm font-medium text-red-600 hover:underline"
                      >
                        Ler mais <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" className="bg-red-50 text-red-600">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                Seguinte
              </Button>
            </div>
          </div>
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
                    <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
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
