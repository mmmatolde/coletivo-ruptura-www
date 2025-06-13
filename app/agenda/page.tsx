import Link from "next/link"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AgendaPage() {
  // Sample events data
  const events = {
    upcoming: [
      {
        id: 1,
        title: "Assembleia Geral",
        date: "2024-01-20T18:00:00",
        description:
          "Assembleia geral para discutir as linhas de ação e estratégias do coletivo.",
        type: "Assembleia",
      },
      {
        id: 2,
        title: "Workshop de Formação Política",
        date: "25 Maio 2025",
        time: "11:00 - 14:00",
        location: "Livraria A Malatesta, Lisboa",
        description:
          "Workshop de formação sobre teoria política e análise de conjuntura, dirigido a novos membros do colectivo.",
        type: "Formação",
      },
      {
        id: 3,
        title: "Apresentação do Livro 'Crise e Alternativas'",
        date: "1 Junho 2025",
        time: "19:00 - 21:00",
        location: "Livraria Traficantes de Sonhos, Lisboa",
        description:
          "Apresentação do livro colectivo 'Crise e Alternativas', com a participação de vários autores e debate posterior.",
        type: "Apresentação",
      },
      {
        id: 4,
        title: "Manifestação pelo Direito à Habitação",
        date: "5 Junho 2025",
        time: "18:00 - 20:00",
        location: "Praça do Rossio, Lisboa",
        description: "Manifestação em defesa do direito à habitação e contra a especulação imobiliária.",
        type: "Mobilização",
      },
    ],
    past: [
      {
        id: 1,
        title: "Debate: Feminismo e Política",
        date: "10 Maio 2025",
        time: "18:00 - 20:00",
        location: "Centro Social A Ingovernável, Lisboa",
        description: "Debate sobre as relações entre feminismo e política no contexto atual.",
        type: "Debate",
      },
      {
        id: 2,
        title: "Jornada de Formação Antirracista",
        date: "5 Maio 2025",
        time: "11:00 - 18:00",
        location: "Espaço Comunitário Montamarta, Lisboa",
        description: "Jornada de formação sobre antirracismo e lutas migrantes, com workshops e palestras.",
        type: "Formação",
      },
      {
        id: 3,
        title: "Assembleia de Coordenação",
        date: "1 Maio 2025",
        time: "17:00 - 19:00",
        location: "Centro Social A Ingovernável, Lisboa",
        description: "Assembleia de coordenação entre diferentes colectivos e organizações sociais.",
        type: "Assembleia",
      },
    ],
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
                {events.upcoming.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex w-full flex-col justify-between border-b p-6 md:w-2/3 md:border-b-0 md:border-r">
                        <div>
                          <div className="mb-2 inline-block rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                            {event.type}
                          </div>
                          <h3 className="font-heading text-xl font-bold">{event.title}</h3>
                          <p className="mt-2 text-gray-600">{event.description}</p>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-4">
                          <Button asChild variant="outline" size="sm" className="text-red-600">
                            <Link href={`/agenda/${event.id}`}>Ver detalhes</Link>
                          </Button>
                          <Button asChild size="sm" className="bg-red-600 text-white hover:bg-red-700">
                            <Link href={`/agenda/${event.id}#register`}>Inscrever-se</Link>
                          </Button>
                        </div>
                      </div>
                      <div className="flex w-full flex-col justify-center space-y-4 bg-gray-50 p-6 md:w-1/3">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-5 w-5 text-red-600" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-5 w-5 text-red-600" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-5 w-5 text-red-600" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Past Events Tab */}
            <TabsContent value="past">
              <div className="space-y-6">
                {events.past.map((event) => (
                  <Card key={event.id} className="overflow-hidden opacity-80">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex w-full flex-col justify-between border-b p-6 md:w-2/3 md:border-b-0 md:border-r">
                        <div>
                          <div className="mb-2 inline-block rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                            {event.type}
                          </div>
                          <h3 className="font-heading text-xl font-bold">{event.title}</h3>
                          <p className="mt-2 text-gray-600">{event.description}</p>
                        </div>
                        <div className="mt-4">
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/agenda/${event.id}`}>Ver resumo</Link>
                          </Button>
                        </div>
                      </div>
                      <div className="flex w-full flex-col justify-center space-y-4 bg-gray-50 p-6 md:w-1/3">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-5 w-5 text-gray-600" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-5 w-5 text-gray-600" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-5 w-5 text-gray-600" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
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
