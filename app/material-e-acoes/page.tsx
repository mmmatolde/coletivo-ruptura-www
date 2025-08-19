import Link from "next/link"
import Image from "next/image"
import { ArrowDown, BookOpen, FileText, Printer, Share2, Download, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { PaginationWithEllipsis } from "@/components/ui/pagination"
import { getMateriaisEAcoes } from '@/lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default async function MaterialsPage() {
  const materiais = await getMateriaisEAcoes()

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

      {/* Materiais Dinâmicos */}
      <section className="py-16">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {materiais.map((item: any) => {
            const { title, capa, autoria, date } = item.fields
            const imageUrl = capa?.fields?.file?.url
            return (
              <Link
                key={item.sys.id}
                href={`/material-e-acoes/${item.sys.id}`}
                className="group bg-white rounded-lg shadow p-0 flex flex-col cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none"
              >
                {imageUrl && (
                  <div className="relative h-48 w-full mb-0">
                    <Image
                      src={`https:${imageUrl}`}
                      alt={title}
                      fill
                      className="object-cover rounded-t"
                    />
                  </div>
                )}
                <h2 className="font-heading text-xl font-bold p-4 group-hover:text-red-700 transition-colors duration-200">{title}</h2>
                <CardFooter className="p-4 pt-0 mt-auto">
                  <div className="flex items-center justify-between w-full text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" /> {autoria}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {date && new Date(date).toLocaleDateString('pt-PT', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </CardFooter>
              </Link>
            )
          })}
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
