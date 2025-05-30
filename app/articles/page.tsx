"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, MessageSquare, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function ArticlesPage() {
  // Sample blog posts data
  const posts = [
    {
      id: 1,
      title: "Análise da Conjuntura Política",
      excerpt: "Uma análise profunda sobre a situação política atual e as suas implicações para os movimentos sociais.",
      date: "12 Maio 2025",
      author: "Maria Gonçalves",
      comments: 8,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      title: "Estratégias de Organização Comunitária",
      excerpt:
        "Reflexões sobre as formas de organização comunitária e o seu potencial transformador em contextos urbanos.",
      date: "5 Maio 2025",
      author: "Carlos Martins",
      comments: 12,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      title: "Feminismo e Luta de Classes",
      excerpt: "Análise das interseções entre a luta feminista e a luta de classes no contexto atual.",
      date: "28 Abril 2025",
      author: "Laura Santos",
      comments: 15,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 4,
      title: "Crise Ecológica e Alternativas",
      excerpt: "Reflexões sobre a crise ecológica e as alternativas a partir de uma perspetiva anticapitalista.",
      date: "20 Abril 2025",
      author: "Paulo Rodrigues",
      comments: 6,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 5,
      title: "Educação Popular e Transformação Social",
      excerpt: "Experiências e reflexões sobre a educação popular como ferramenta de transformação social.",
      date: "15 Abril 2025",
      author: "Ana Lopes",
      comments: 9,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 6,
      title: "Memória Histórica e Lutas Atuais",
      excerpt: "A importância da memória histórica na construção das lutas sociais atuais.",
      date: "8 Abril 2025",
      author: "João Pereira",
      comments: 4,
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

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
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      </section>

      {/* Search and Filter */}
      <section className="border-b py-8">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Input type="search" placeholder="Pesquisar artigos..." className="w-full" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100">
                Todos
              </Button>
              <Button variant="outline" size="sm">
                Análise
              </Button>
              <Button variant="outline" size="sm">
                Debates
              </Button>
              <Button variant="outline" size="sm">
                Teoria
              </Button>
              <Button variant="outline" size="sm">
                Experiências
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="group overflow-hidden transition-all hover:shadow-md">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-heading text-xl">{post.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> {post.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                <CardFooter>
                  <Link
                    href={`/articles/${post.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="flex items-center text-sm font-medium text-red-600 hover:underline"
                  >
                    Ler mais <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
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
                3
              </Button>
              <Button variant="outline" size="sm">
                Seguinte
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-gray-900">Participa no Debate</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Tens algo a contribuir? Envia o teu texto para publicação nos nossos artigos
            </p>
            <div className="mt-8">
              <Button asChild className="bg-red-600 text-white hover:bg-red-700">
                <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
                  Enviar Contribuição
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
