import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, FileText, MessageSquare, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getArticles, getRecentPublications } from "@/lib/contentful"

export default async function HomePage() {
  // Buscar os 3 artigos mais recentes
  const { articles } = await getArticles(3, 0)
  const { articles: publications } = await getRecentPublications(3, 0)

  return (
    <div className="flex flex-col">
      {/* Hero Section - Com a imagem da manifestação e texto sobreposto */}
      <section className="relative w-full bg-gray-100">
        <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
          <Image
            src="/images/protest-banner.png"
            alt="Manifestação do Coletivo Ruptura com faixas 'Construir a Revolução, Conquistar a Habitação'"
            fill
            priority
            className="object-cover object-[center_80%]"
          />
          {/* Texto sobreposto - posicionado absolutamente na parte inferior */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent">
            <div className="container">
              <div className="flex justify-end pb-4 md:pb-6">
                <p className="text-white text-base md:text-xl max-w-md text-right font-medium leading-relaxed drop-shadow-md">
                  Pela recuperação do Programa Comunista e a Auto-emancipação do Proletariado
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16">
        <div className="container">
          <h3 className="text-center text-2xl font-bold text-gray-900">
            Queres envolver-te? Aqui está como podes fazê-lo
          </h3>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              <Link href="/join">
                Junta-te ao Ruptura
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              <Link href="/about">
                Conhece o Ruptura
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              <Link href="/materials">
                Material e Ações
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              <Link href="/agenda">
                Agenda de Eventos
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-gray-900">Junta-te à luta pela reconstrução do Partido Comunista!</h2>
              <div className="mt-8">
                <Button asChild className="bg-red-600 text-white hover:bg-red-700">
                  <Link href="/join">
                    Quero juntar-me
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-80 overflow-hidden rounded-lg md:h-96">
              <Image
                src="/images/logo.png"
                alt="Logo do Coletivo Ruptura"
                fill
                className="object-contain p-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-gray-900">Destaques</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Últimas publicações do Ruptura
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {publications.map((publication) => (
              <Link
                key={publication.sys.id}
                href={publication.fields.isArticle ? `/artigos/${publication.sys.id}` : `/tribuna-publica/${publication.sys.id}`}
                className="block h-full"
              >
                <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`https:${publication.fields.capa.fields.file.url}`}
                      alt={publication.fields.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute top-2 right-2 rounded-md bg-zinc-900/60 px-2 py-1 text-xs font-medium text-white z-10">
                      {publication.fields.isArticle ? 'Artigo' : 'Tribuna Pública'}
                    </span>
                  </div>
                  <CardContent className="flex-grow p-4">
                    <h3 className="font-heading text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {publication.fields.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                      {publication.fields.description || publication.fields.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="flex items-center justify-between w-full text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" /> {publication.fields.autoria}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(publication.fields.date || publication.sys.createdAt).toLocaleDateString('pt-PT', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button asChild className="bg-red-600 text-white hover:bg-red-700">
            <Link href="/tribuna-publica">Ver Todas as Publicações</Link>
          </Button>
        </div>
      </section>

      {/* Donation Section */}
      <section className="relative bg-gray-800 py-16 text-white">
        <div className="absolute inset-0 bg-[url('/images/bannerLGBT.jpg')] bg-cover bg-[center_80%] opacity-90 mix-blend-overlay"></div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold">
              Ajuda a construir o fundo de campanha do Coletivo Ruptura
            </h2>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-red-600 text-white hover:bg-red-700">
                <Link href="/donate">
                  Quero contribuir
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold">Textos e Traduções</h3>
              <p className="mt-2 text-gray-600">Acede à nossa biblioteca de textos políticos e traduções</p>
              <Link
                href="/textos-e-traducoes"
                className="mt-4 text-sm font-medium text-red-600 hover:underline"
              >
                Explorar textos
              </Link>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold">Tribuna Pública</h3>
              <p className="mt-2 text-gray-600">Participa em debates e discussões sobre temas da atualidade</p>
              <Link
                href="/tribuna"
                className="mt-4 text-sm font-medium text-red-600 hover:underline"
              >
                Ir para a tribuna
              </Link>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold">Agenda de Atividades</h3>
              <p className="mt-2 text-gray-600">Consulta o nosso calendário de eventos e atividades</p>
              <Link
                href="/agenda"
                className="mt-4 text-sm font-medium text-red-600 hover:underline"
              >
                Ver agenda
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
