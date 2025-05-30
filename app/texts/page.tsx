import Link from "next/link"
import { ArrowRight, BookOpen, Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TextsPage() {
  // Sample texts data
  const texts = {
    original: [
      {
        id: 1,
        title: "Estratégias para a Organização Política",
        author: "Colectivo Ruptura",
        date: "Maio 2025",
        description: "Análise sobre as estratégias de organização política no contexto atual.",
        category: "Teoria Política",
        pages: 24,
      },
      {
        id: 2,
        title: "Crise Ecológica e Alternativas",
        author: "Colectivo Ruptura",
        date: "Abril 2025",
        description: "Reflexões sobre a crise ecológica e as alternativas a partir de uma perspetiva anticapitalista.",
        category: "Ecologia",
        pages: 32,
      },
      {
        id: 3,
        title: "Feminismo e Luta de Classes",
        author: "Colectivo Ruptura",
        date: "Março 2025",
        description: "Análise das interseções entre a luta feminista e a luta de classes.",
        category: "Feminismo",
        pages: 28,
      },
      {
        id: 4,
        title: "Memória Histórica e Lutas Atuais",
        author: "Colectivo Ruptura",
        date: "Fevereiro 2025",
        description: "A importância da memória histórica na construção das lutas sociais atuais.",
        category: "História",
        pages: 36,
      },
    ],
    translations: [
      {
        id: 1,
        title: "A Revolução do Comum",
        originalTitle: "The Revolution of the Common",
        originalAuthor: "Jane Smith",
        translator: "Colectivo Ruptura",
        date: "Maio 2025",
        description: "Ensaio sobre a importância dos bens comuns e as formas de organização coletiva.",
        category: "Teoria Política",
        pages: 42,
      },
      {
        id: 2,
        title: "Ecologia e Anticapitalismo",
        originalTitle: "Ecology and Anticapitalism",
        originalAuthor: "John Green",
        translator: "Colectivo Ruptura",
        date: "Abril 2025",
        description: "Análise da relação entre a crise ecológica e o sistema capitalista.",
        category: "Ecologia",
        pages: 38,
      },
      {
        id: 3,
        title: "Feminismo para os 99%",
        originalTitle: "Feminism for the 99%",
        originalAuthor: "Collective Authors",
        translator: "Colectivo Ruptura",
        date: "Março 2025",
        description: "Manifesto feminista que propõe um feminismo anticapitalista, antirracista e anti-imperialista.",
        category: "Feminismo",
        pages: 30,
      },
    ],
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-700 to-red-500 py-16 text-white md:py-24">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl">Textos e Traduções</h1>
            <p className="mt-6 text-xl font-medium">Biblioteca de textos políticos e traduções</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      </section>

      {/* Search and Filter */}
      <section className="border-b py-8">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input type="search" placeholder="Pesquisar textos..." className="pl-10" />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100">
                Todos
              </Button>
              <Button variant="outline" size="sm">
                Teoria Política
              </Button>
              <Button variant="outline" size="sm">
                Feminismo
              </Button>
              <Button variant="outline" size="sm">
                Ecologia
              </Button>
              <Button variant="outline" size="sm">
                História
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Texts Tabs */}
      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="original" className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <TabsList className="inline-flex">
                <TabsTrigger value="original" className="text-sm">
                  Textos Originais
                </TabsTrigger>
                <TabsTrigger value="translations" className="text-sm">
                  Traduções
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Original Texts Tab */}
            <TabsContent value="original">
              <div className="grid gap-6 md:grid-cols-2">
                {texts.original.map((text) => (
                  <Card key={text.id}>
                    <CardHeader>
                      <div className="mb-2 inline-block rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                        {text.category}
                      </div>
                      <CardTitle className="font-heading text-xl">{text.title}</CardTitle>
                      <CardDescription>
                        {text.author} • {text.date} • {text.pages} páginas
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{text.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button asChild variant="outline" size="sm" className="text-red-600">
                        <Link href={`/texts/${text.id}`}>
                          <BookOpen className="mr-2 h-4 w-4" /> Ler
                        </Link>
                      </Button>
                      <Button asChild size="sm" className="bg-red-600 text-white hover:bg-red-700">
                        <Link href={`/texts/${text.id}/download`}>
                          <Download className="mr-2 h-4 w-4" /> Descarregar PDF
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Translations Tab */}
            <TabsContent value="translations">
              <div className="grid gap-6 md:grid-cols-2">
                {texts.translations.map((text) => (
                  <Card key={text.id}>
                    <CardHeader>
                      <div className="mb-2 inline-block rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                        {text.category}
                      </div>
                      <CardTitle className="font-heading text-xl">{text.title}</CardTitle>
                      <CardDescription>
                        Tradução de "{text.originalTitle}" de {text.originalAuthor} • {text.date} • {text.pages} páginas
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{text.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button asChild variant="outline" size="sm" className="text-red-600">
                        <Link href={`/texts/translations/${text.id}`}>
                          <BookOpen className="mr-2 h-4 w-4" /> Ler
                        </Link>
                      </Button>
                      <Button asChild size="sm" className="bg-red-600 text-white hover:bg-red-700">
                        <Link href={`/texts/translations/${text.id}/download`}>
                          <Download className="mr-2 h-4 w-4" /> Descarregar PDF
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Reading Lists */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center font-heading text-3xl font-bold text-gray-900">
              Listas de Leitura Recomendadas
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-xl">Introdução ao Pensamento Crítico</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Uma seleção de textos básicos para introdução ao pensamento crítico e à teoria política.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/texts/lists/1"
                    className="flex items-center text-sm font-medium text-red-600 hover:underline"
                  >
                    Ver lista <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-xl">Feminismo e Anticapitalismo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Textos que exploram as conexões entre a luta feminista e a crítica ao capitalismo.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/texts/lists/2"
                    className="flex items-center text-sm font-medium text-red-600 hover:underline"
                  >
                    Ver lista <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-xl">Ecologia e Crise Climática</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Uma seleção de textos sobre a crise ecológica e as alternativas a partir de uma perspetiva crítica.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/texts/lists/3"
                    className="flex items-center text-sm font-medium text-red-600 hover:underline"
                  >
                    Ver lista <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-lg border bg-white p-8 text-center shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-gray-900">
              Queres contribuir com textos ou traduções?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Se escreveste textos ou realizaste traduções que possam ser de interesse para o colectivo, podes
              partilhá-los connosco.
            </p>
            <div className="mt-6">
              <Button asChild className="bg-red-600 text-white hover:bg-red-700">
                <Link href="/contact">Enviar Contribuição</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
