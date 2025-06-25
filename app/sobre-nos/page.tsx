"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const [currentGroup, setCurrentGroup] = useState(0)

  const pontosDeUnidade = [
    {
      title: "Crítica Impiedosa",
      description:
        "A tudo o que existe com vista à recuperação do Programa Comunista; Face a todos os projetos revolucionários passados, presentes e futuros",
    },
    {
      title: "Ditadura do Proletariado",
      description: "Como forma de transição para a sociedade comunista",
    },
    {
      title: "Internacionalismo",
      description:
        "Defesa do carácter internacional da revolução comunista; Reconhecimento do carácter imperialista do capitalismo português",
    },
    {
      title: "Comunismo como Emancipação Humana",
      description: "Através da auto-abolição do proletariado destruindo a propriedade privada, a família e o estado",
    },
    {
      title: "Abolição Sexual e de Género",
      description: "Centralidade da abolição sexual e de género para o programa comunista",
    },
    {
      title: "Derrotismo Revolucionário",
      description: "Face aos conflitos inter-imperialistas inerentes à fase superior do capitalismo",
    },
    {
      title: "Supressão Revolucionária do Capitalismo como Resolução da Crise Climática",
      description:
        "Reconhecimento da relação entre capitalismo e crise climática, e da necessidade da supressão revolucionária",
    },
    {
      title: "Independência Política Do Proletariado",
      description: "Contra os interesses da aristocracia laboral e classes médias",
    },
    {
      title: "Direito à Crítica e ao Debate",
      description: "Dentro dos princípios estabelecidos, assim como à polémica pública",
    },
  ]

  const itemsPerGroup = 3
  const totalGroups = Math.ceil(pontosDeUnidade.length / itemsPerGroup)

  const getCurrentItems = () => {
    const startIndex = currentGroup * itemsPerGroup
    return pontosDeUnidade.slice(startIndex, startIndex + itemsPerGroup)
  }

  const nextGroup = () => {
    setCurrentGroup((prev) => (prev + 1) % totalGroups)
  }

  const prevGroup = () => {
    setCurrentGroup((prev) => (prev - 1 + totalGroups) % totalGroups)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-red-600 to-red-900 py-20 text-white md:py-28">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl">Conhece a nossa história e pontos de unidade</h1>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/images/revolutionary-background.png')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
      </section>

      {/* About Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="font-heading text-3xl font-bold text-gray-900">Quem Somos</h2>
                <div className="mt-6 text-justify text-gray-600">
                  <p>
                    O Ruptura se apresenta humildemente ao mundo como um grupo comunista que tem como objetivo
                    participar na recuperação do programa comunista através do estudo e da crítica impiedosa a tudo o
                    que existe, formação teórica e prática de militantes comunistas e na participação consciente na luta
                    de classes.
                  </p>
                </div>
              </div>
              <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-lg bg-white p-4 md:h-80">
                <Image
                  src="/images/logo.png"
                  alt="Logo Coletivo Ruptura"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-gray-900 text-center mb-8">Pontos de Unidade</h2>

              {/* Carousel Container */}
              <div className="relative">
                {/* Navigation Arrows */}
                <button
                  onClick={prevGroup}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 text-gray-600 hover:text-red-600 opacity-70 hover:opacity-100"
                  aria-label="Pontos anteriores"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={nextGroup}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 text-gray-600 hover:text-red-600 opacity-70 hover:opacity-100"
                  aria-label="Próximos pontos"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Cards Container */}
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentGroup * 100}%)` }}
                  >
                    {Array.from({ length: totalGroups }).map((_, groupIndex) => (
                      <div key={groupIndex} className="w-full flex-shrink-0">
                        <div className="grid gap-4 md:grid-cols-3 px-2">
                          {pontosDeUnidade
                            .slice(groupIndex * itemsPerGroup, (groupIndex + 1) * itemsPerGroup)
                            .map((ponto, index) => (
                              <div
                                key={`${groupIndex}-${index}`}
                                className="rounded-lg border bg-white p-4 shadow-sm h-full"
                              >
                                <h3 className="font-heading text-lg font-bold text-red-600 mb-2">{ponto.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{ponto.description}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-6 space-x-2">
                  {Array.from({ length: totalGroups }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentGroup(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentGroup ? "bg-red-600 w-6" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Ir para grupo ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-gray-900">História</h2>
              <div className="mt-6 text-justify text-gray-600">
                <p>
                  Surgimos de uma rejeição coletiva com o estado do movimento comunista em Portugal, desde as
                  organizações massificadas e burocratizadas que despolitizam os seus militantes e transformam jovens
                  comunistas em tarefeiros aos pequenos grupelhos que, armados de dogmas enferrujados, pensam ser a
                  semente do próximo partido comunista, quando na verdade são apenas a semente de cisões e desilusões.
                  Entendemos também que este falhanço das nossas estruturas não se deve a problemas apenas do foro
                  organizativo ou de liderança, mas também duma corrupção mais profunda da doutrina marxista, que
                  resulta no abandono das posições históricas dos comunistas, como a defesa da independência política do
                  proletariado e dos comunistas, e resultante degeneração na estratégia, táticas e estruturas
                  organizacionais. Um dos nossos objetivos é entender este processo de corrupção, as suas raízes na
                  história da luta de classes, do desenvolvimento das forças e relações de produção e do próprio
                  movimento comunista e, através deste estudo, fazer parte do esforço para restaurar o programa
                  comunista à sua vitalidade original.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="rounded-lg bg-red-50 p-8 text-center">
              <h2 className="font-heading text-2xl font-bold text-gray-900">Queres fazer parte do Coletivo Ruptura?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Se partilhas os nossos pontos de unidade, convidamos-te a contactar-nos e a conhecer as formas de
                participação.
              </p>
              <div className="mt-6">
                <Button asChild className="bg-red-600 text-white hover:bg-red-700">
                  <Link href="/join">Junta-te a Nós</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
