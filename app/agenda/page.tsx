import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getEvents } from "@/lib/contentful"

export default async function AgendaPage() {
  const { events } = await getEvents(100, 0) // Busca até 100 eventos

  // Filtrar eventos futuros e passados
  const now = new Date()
  const upcomingEvents = events.filter(
    (event) => new Date(event.fields.dataEHora) >= now
  ).sort((a, b) => new Date(a.fields.dataEHora).getTime() - new Date(b.fields.dataEHora).getTime())

  const pastEvents = events.filter(
    (event) => new Date(event.fields.dataEHora) < now
  ).sort((a, b) => new Date(b.fields.dataEHora).getTime() - new Date(a.fields.dataEHora).getTime())

  // Sample events data - REMOVER ESTE BLOCO APÓS A INTEGRAÇÃO COMPLETA
  const sampleEvents = {
    upcoming: [],
    past: [],
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-700 to-red-500 py-16 text-white md:py-24">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl">Agenda de Atividades</h1>
            <p className="mt-6 text-xl font-medium">Calendário de eventos, assembleias e mobilizações</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      </section>

      {/* Events Tabs */}
      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="upcoming" className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <TabsList className="inline-flex">
                <TabsTrigger value="upcoming" className="text-sm">
                  Próximos Eventos
                </TabsTrigger>
                <TabsTrigger value="past" className="text-sm">
                  Eventos Passados
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Upcoming Events Tab */}
            <TabsContent value="upcoming">
              <div className="space-y-6">
                {upcomingEvents.map((event) => {
                  console.log('URL da capa do evento (upcoming):', event.fields.capa?.fields?.file?.url);
                  return (
                  <Card key={event.sys.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {event.fields.capa && event.fields.capa.fields.file && (
                        <div className="relative w-full h-48 md:w-1/3 flex-shrink-0 overflow-hidden">
                          <Image
                            src={`https:${event.fields.capa.fields.file.url}`}
                            alt={event.fields.title}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                      )}
                      <div className="flex flex-col flex-grow md:flex-row">
                        <div className="flex w-full flex-col justify-between border-b p-6 md:w-2/3 md:border-b-0 md:border-r">
                          <div>
                            <div className="mb-2 inline-block rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                              {event.fields.title}
                            </div>
                            <h3 className="font-heading text-xl font-bold">{event.fields.title}</h3>
                            <p className="mt-2 text-gray-600 line-clamp-3">{event.fields.descricao}</p>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-4">
                            <Button asChild variant="outline" size="sm" className="text-red-600">
                              <Link href={`/agenda/${event.sys.id}`}>Ver detalhes</Link>
                            </Button>
                            <Button asChild size="sm" className="bg-red-600 text-white hover:bg-red-700">
                              <Link href={`/agenda/${event.sys.id}#register`}>Inscrever-se</Link>
                            </Button>
                          </div>
                        </div>
                        <div className="flex w-full flex-col justify-center space-y-4 bg-gray-50 p-6 md:w-1/3">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-5 w-5 text-red-600" />
                            <span>{new Date(event.fields.dataEHora).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-5 w-5 text-red-600" />
                            <span>{new Date(event.fields.dataEHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-5 w-5 text-red-600" />
                            <span className="text-sm">
                              {event.fields.morada || 'Localização não disponível'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )})}
              </div>
            </TabsContent>

            {/* Past Events Tab */}
            <TabsContent value="past">
              <div className="space-y-6">
                {pastEvents.map((event) => {
                  console.log('URL da capa do evento (past):', event.fields.capa?.fields?.file?.url);
                  return (
                  <Card key={event.sys.id} className="overflow-hidden opacity-80">
                    <div className="flex flex-col md:flex-row">
                      {event.fields.capa && event.fields.capa.fields.file && (
                        <div className="relative w-full h-48 md:w-1/3 flex-shrink-0 overflow-hidden">
                          <Image
                            src={`https:${event.fields.capa.fields.file.url}`}
                            alt={event.fields.title}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                      )}
                      <div className="flex flex-col flex-grow md:flex-row">
                        <div className="flex w-full flex-col justify-between border-b p-6 md:w-2/3 md:border-b-0 md:border-r">
                          <div>
                            <div className="mb-2 inline-block rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                              {event.fields.title}
                            </div>
                            <h3 className="font-heading text-xl font-bold">{event.fields.title}</h3>
                            <p className="mt-2 text-gray-600 line-clamp-3">{event.fields.descricao}</p>
                          </div>
                          <div className="mt-4">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/agenda/${event.sys.id}`}>Ver detalhes</Link>
                            </Button>
                          </div>
                        </div>
                        <div className="flex w-full flex-col justify-center space-y-4 bg-gray-50 p-6 md:w-1/3">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-5 w-5 text-gray-600" />
                            <span>{new Date(event.fields.dataEHora).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-5 w-5 text-gray-600" />
                            <span>{new Date(event.fields.dataEHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-5 w-5 text-gray-600" />
                            <span className="text-sm">
                              {event.fields.morada || 'Localização não disponível'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )})}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Calendar View */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center font-heading text-3xl font-bold text-gray-900">Vista de Calendário</h2>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="text-center">
                <p className="text-lg font-medium">Maio 2025</p>
                <div className="mt-4 grid grid-cols-7 gap-1 text-center text-sm">
                  <div className="font-medium">Seg</div>
                  <div className="font-medium">Ter</div>
                  <div className="font-medium">Qua</div>
                  <div className="font-medium">Qui</div>
                  <div className="font-medium">Sex</div>
                  <div className="font-medium">Sáb</div>
                  <div className="font-medium">Dom</div>

                  {/* Calendar days - first row */}
                  <div className="py-2 text-gray-400">29</div>
                  <div className="py-2 text-gray-400">30</div>
                  <div className="py-2">1</div>
                  <div className="py-2">2</div>
                  <div className="py-2">3</div>
                  <div className="py-2">4</div>
                  <div className="py-2">5</div>

                  {/* Calendar days - second row */}
                  <div className="py-2">6</div>
                  <div className="py-2">7</div>
                  <div className="py-2">8</div>
                  <div className="py-2">9</div>
                  <div className="py-2">10</div>
                  <div className="py-2">11</div>
                  <div className="py-2">12</div>

                  {/* Calendar days - third row */}
                  <div className="py-2">13</div>
                  <div className="py-2">14</div>
                  <div className="py-2">15</div>
                  <div className="py-2">16</div>
                  <div className="py-2">17</div>
                  <div className="py-2">18</div>
                  <div className="py-2">19</div>

                  {/* Calendar days - fourth row */}
                  <div className="rounded-full bg-red-600 py-2 text-white">20</div>
                  <div className="py-2">21</div>
                  <div className="py-2">22</div>
                  <div className="py-2">23</div>
                  <div className="py-2">24</div>
                  <div className="rounded-full bg-red-100 py-2 text-red-600">25</div>
                  <div className="py-2">26</div>

                  {/* Calendar days - fifth row */}
                  <div className="py-2">27</div>
                  <div className="py-2">28</div>
                  <div className="py-2">29</div>
                  <div className="py-2">30</div>
                  <div className="py-2">31</div>
                  <div className="py-2 text-gray-400">1</div>
                  <div className="py-2 text-gray-400">2</div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-red-600"></div>
                  <span className="text-sm">Assembleia Geral (20 Maio)</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-red-100"></div>
                  <span className="text-sm">Workshop de Formação Política (25 Maio)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-lg border bg-white p-8 text-center shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-gray-900">Queres propor uma atividade?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Se tens uma proposta de atividade ou evento para o colectivo, podes enviá-la através do formulário de
              contacto.
            </p>
            <div className="mt-6">
              <Button asChild className="bg-red-600 text-white hover:bg-red-700">
                <Link href="/contact">Propor Atividade</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
