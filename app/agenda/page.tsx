"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getEvents } from "@/lib/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import type { Document } from "@contentful/rich-text-types"
import { useState, useEffect } from "react"

interface EventFields {
  title: string
  dataEHora: string
  descricao: Document
  morada?: string
  capa?: {
    fields: {
      file: {
        url: string
      }
    }
  }
  ttuloDoFilmeexposicao?: string
  legendas?: string
}

interface Event {
  sys: {
    id: string
  }
  fields: EventFields
}

const options = {
  renderNode: {
    paragraph: (node: any, children: any) => (
      <p className="mb-4 text-justify">{children}</p>
    ),
  },
}

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const loadEvents = async () => {
      const { events: loadedEvents } = await getEvents(100, 0)
      setEvents(loadedEvents)
    }
    loadEvents()
  }, [])

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]

  // Função para gerar os dias do mês
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay() || 7 // Ajusta para Segunda = 1, Domingo = 7

    const days = []
    const today = new Date()
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year

    // Adiciona dias do mês anterior
    for (let i = 1; i < startingDay; i++) {
      const prevMonthLastDay = new Date(year, month, 0).getDate()
      const day = prevMonthLastDay - startingDay + i + 1
      days.push(
        <div key={`prev-${day}`} className="py-2 text-gray-400">
          {day}
        </div>
      )
    }

    // Adiciona dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(year, month, day)
      const isToday = isCurrentMonth && day === today.getDate()
      const eventOnDay = events.find(event => {
        const eventDate = new Date(event.fields.dataEHora)
        return eventDate.getDate() === day && 
               eventDate.getMonth() === month && 
               eventDate.getFullYear() === year
      })
      const isPastEvent = eventOnDay && currentDay < today
      const isFutureEvent = eventOnDay && currentDay >= today

      let dayClassName = "py-2"
      if (isToday) {
        dayClassName += " rounded-full bg-amber-200 text-amber-900 font-medium"
      } else if (isFutureEvent) {
        dayClassName += " rounded-full bg-red-600 text-white"
      } else if (isPastEvent) {
        dayClassName += " rounded-full bg-red-100 text-red-600"
      }

      days.push(
        <div key={day} className={dayClassName}>
          {eventOnDay ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    href={`/agenda/${eventOnDay.sys.id}`}
                    className="block w-full h-full hover:opacity-80 transition-opacity"
                  >
                    {day}
                  </Link>
                </TooltipTrigger>
                <TooltipContent 
                  className="bg-white border border-red-100 shadow-lg p-3 max-w-[250px]"
                  sideOffset={5}
                >
                  <div className="space-y-2">
                    <h4 className="font-medium text-red-900 leading-tight">
                      {eventOnDay.fields.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span className="leading-none">
                        {new Date(eventOnDay.fields.dataEHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-start text-xs text-gray-600">
                      <MapPin className="h-4 w-4 shrink-0 mt-[2px]" />
                      <span className="leading-relaxed -ml-[3.25px]">
                        {eventOnDay.fields.morada || 'Localização não disponível'}
                      </span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            day
          )}
        </div>
      )
    }

    // Adiciona dias do próximo mês
    const remainingDays = 42 - days.length // 6 semanas * 7 dias
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <div key={`next-${day}`} className="py-2 text-gray-400">
          {day}
        </div>
      )
    }

    return days
  }

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
                {upcomingEvents.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 text-lg">
                      Não há eventos futuros agendados no momento.
                    </p>
                  </div>
                ) : (
                  upcomingEvents.map((event) => {
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
                                <div className="mt-2 text-gray-600 line-clamp-3">
                                  {documentToReactComponents(event.fields.descricao, options)}
                                </div>
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
                                <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-600">{new Date(event.fields.dataEHora).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-600">{new Date(event.fields.dataEHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="mr-2 h-4 w-4 text-gray-500 shrink-0" />
                                <span className="text-sm text-gray-600">
                                  {event.fields.morada || 'Localização não disponível'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )
                  })
                )}
              </div>
            </TabsContent>

            {/* Past Events Tab */}
            <TabsContent value="past">
              <div className="space-y-6">
                {pastEvents.map((event) => {
                  console.log('URL da capa do evento (past):', event.fields.capa?.fields?.file?.url);
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
                            <div className="mb-2 inline-block rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                              {event.fields.title}
                            </div>
                            <h3 className="font-heading text-xl font-bold">{event.fields.title}</h3>
                            <div className="mt-2 text-gray-600 line-clamp-3">
                              {documentToReactComponents(event.fields.descricao, options)}
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/agenda/${event.sys.id}`}>Ver detalhes</Link>
                            </Button>
                          </div>
                        </div>
                        <div className="flex w-full flex-col justify-center space-y-4 bg-gray-50 p-6 md:w-1/3">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{new Date(event.fields.dataEHora).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{new Date(event.fields.dataEHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-gray-500 shrink-0" />
                            <span className="text-sm text-gray-600">
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
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={handlePreviousMonth}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <p className="text-lg font-medium">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </p>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={handleNextMonth}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4 grid grid-cols-7 gap-1 text-center text-sm">
                  <div className="font-medium">Seg</div>
                  <div className="font-medium">Ter</div>
                  <div className="font-medium">Qua</div>
                  <div className="font-medium">Qui</div>
                  <div className="font-medium">Sex</div>
                  <div className="font-medium">Sáb</div>
                  <div className="font-medium">Dom</div>
                  {generateCalendarDays()}
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-red-100"></div>
                  <span className="text-sm">Eventos Passados</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-amber-200"></div>
                  <span className="text-sm text-amber-900">Hoje</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-red-600"></div>
                  <span className="text-sm">Eventos Futuros</span>
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
