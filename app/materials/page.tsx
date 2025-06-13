import Link from "next/link"
import Image from "next/image"
import { ArrowDown, BookOpen, FileText, Printer, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export default function MaterialsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const materials = {
    documents: [
      {
        id: 1,
        title: "Manual de Organização Comunitária",
        description: "Guia prático para a organização de assembleias e grupos de trabalho comunitários.",
        type: "PDF",
        size: "2.4 MB",
        date: "10 Maio 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 2,
        title: "Introdução ao Pensamento Crítico",
        description: "Material formativo sobre as bases do pensamento crítico e a sua aplicação prática.",
        type: "PDF",
        size: "1.8 MB",
        date: "2 Maio 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 3,
        title: "Guia de Comunicação Popular",
        description: "Ferramentas e conselhos para a comunicação eficaz em contextos de mobilização social.",
        type: "PDF",
        size: "3.1 MB",
        date: "25 Abril 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
    graphics: [
      {
        id: 1,
        title: "Cartazes para Manifestações",
        description: "Conjunto de designs de cartazes prontos para imprimir em formato A3.",
        type: "ZIP",
        size: "15 MB",
        date: "8 Maio 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 2,
        title: "Infografias sobre Crise Climática",
        description: "Série de infografias explicativas sobre as causas e consequências da crise climática.",
        type: "ZIP",
        size: "8.5 MB",
        date: "1 Maio 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 3,
        title: "Modelos para Redes Sociais",
        description: "Conjunto de modelos editáveis para publicações em redes sociais.",
        type: "ZIP",
        size: "12 MB",
        date: "20 Abril 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
    audiovisual: [
      {
        id: 1,
        title: "Entrevistas a Ativistas",
        description: "Série de entrevistas em áudio com ativistas de diferentes movimentos sociais.",
        type: "MP3",
        size: "45 MB",
        date: "5 Maio 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 2,
        title: "Documentário: Lutas Urbanas",
        description: "Documentário sobre as lutas pelo direito à cidade e contra a gentrificação.",
        type: "MP4",
        size: "250 MB",
        date: "15 Abril 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 3,
        title: "Podcast: Debates Atuais",
        description: "Série de podcasts com debates sobre temas da atualidade política e social.",
        type: "MP3",
        size: "60 MB",
        date: "10 Abril 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  }

  const allMaterials = [
    ...materials.documents,
    ...materials.graphics,
    ...materials.audiovisual,
  ]

  const totalPages = Math.ceil(allMaterials.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMaterials = allMaterials.slice(startIndex, endIndex)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-700 to-red-500 py-16 text-white md:py-24">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl">Materiais de Ação</h1>
            <p className="mt-6 text-xl font-medium">Recursos e ferramentas para a ação política e social</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      </section>

      {/* Materials Tabs */}
      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="documents" className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <TabsList className="inline-flex">
                <TabsTrigger value="documents" className="text-sm">
                  Documentos
                </TabsTrigger>
                <TabsTrigger value="graphics" className="text-sm">
                  Gráficos
                </TabsTrigger>
                <TabsTrigger value="audiovisual" className="text-sm">
                  Audiovisual
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {currentMaterials.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative h-40 overflow-hidden bg-gray-100">
                      <Image 
                        src={item.image || "/placeholder.svg"} 
                        alt={item.title} 
                        fill 
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                      <div className="absolute right-2 top-2 rounded bg-white px-2 py-1 text-xs font-medium text-gray-600">
                        {item.type}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="font-heading text-xl">{item.title}</CardTitle>
                      <CardDescription>
                        {item.date} • {item.size}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button asChild variant="outline" size="sm" className="text-red-600">
                        <Link href="#">
                          <FileText className="mr-2 h-4 w-4" /> Ver
                        </Link>
                      </Button>
                      <Button asChild size="sm" className="bg-red-600 text-white hover:bg-red-700">
                        <Link href="#">
                          <ArrowDown className="mr-2 h-4 w-4" /> Descarregar
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Anterior
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Button
                        key={pageNum}
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={pageNum === currentPage ? "bg-red-50 text-red-600" : ""}
                      >
                        {pageNum}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Seguinte
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Graphics Tab */}
            <TabsContent value="graphics">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {currentMaterials.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative h-40 overflow-hidden bg-gray-100">
                      <Image 
                        src={item.image || "/placeholder.svg"} 
                        alt={item.title} 
                        fill 
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                      <div className="absolute right-2 top-2 rounded bg-white px-2 py-1 text-xs font-medium text-gray-600">
                        {item.type}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="font-heading text-xl">{item.title}</CardTitle>
                      <CardDescription>
                        {item.date} • {item.size}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button asChild variant="outline" size="sm" className="text-red-600">
                        <Link href="#">
                          <Printer className="mr-2 h-4 w-4" /> Imprimir
                        </Link>
                      </Button>
                      <Button asChild size="sm" className="bg-red-600 text-white hover:bg-red-700">
                        <Link href="#">
                          <ArrowDown className="mr-2 h-4 w-4" /> Descarregar
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Anterior
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Button
                        key={pageNum}
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={pageNum === currentPage ? "bg-red-50 text-red-600" : ""}
                      >
                        {pageNum}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Seguinte
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Audiovisual Tab */}
            <TabsContent value="audiovisual">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {currentMaterials.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative h-40 overflow-hidden bg-gray-100">
                      <Image 
                        src={item.image || "/placeholder.svg"} 
                        alt={item.title} 
                        fill 
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                      <div className="absolute right-2 top-2 rounded bg-white px-2 py-1 text-xs font-medium text-gray-600">
                        {item.type}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="font-heading text-xl">{item.title}</CardTitle>
                      <CardDescription>
                        {item.date} • {item.size}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button asChild variant="outline" size="sm" className="text-red-600">
                        <Link href="#">
                          <BookOpen className="mr-2 h-4 w-4" /> Reproduzir
                        </Link>
                      </Button>
                      <Button asChild size="sm" className="bg-red-600 text-white hover:bg-red-700">
                        <Link href="#">
                          <ArrowDown className="mr-2 h-4 w-4" /> Descarregar
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Anterior
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Button
                        key={pageNum}
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={pageNum === currentPage ? "bg-red-50 text-red-600" : ""}
                      >
                        {pageNum}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Seguinte
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How to Use */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center font-heading text-3xl font-bold text-gray-900">Como Utilizar Estes Materiais</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <ArrowDown className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold">Descarregar</h3>
                <p className="mt-2 text-gray-600">Descarrega os materiais que precisas para a tua atividade ou ação.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Share2 className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold">Partilhar</h3>
                <p className="mt-2 text-gray-600">Difunde os materiais nas tuas redes e espaços de ativismo.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Printer className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold">Utilizar</h3>
                <p className="mt-2 text-gray-600">
                  Imprime, adapta e utiliza os materiais para as tuas necessidades específicas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-lg border bg-white p-8 text-center shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-gray-900">Queres contribuir com novos materiais?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Se criaste materiais que possam ser úteis para a ação política e social, podes partilhá-los connosco para
              que estejam disponíveis para toda a comunidade.
            </p>
            <div className="mt-6">
              <Button asChild className="bg-red-600 text-white hover:bg-red-700">
                <Link href="/contact">Enviar Material</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
