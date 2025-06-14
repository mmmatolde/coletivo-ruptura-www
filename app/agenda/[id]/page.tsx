import Image from "next/image"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getEventById } from "@/lib/contentful"

export default async function EventDetailsPage({ params }: { params: { id: string } }) {
  console.log('ID do evento:', params.id)
  const event = await getEventById(params.id)
  console.log('Evento encontrado:', event)

  if (!event) {
    return (
      <div className="container py-16">
        <h1 className="text-2xl font-bold text-red-600">Evento não encontrado</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Event Details */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Main Content */}
              <div className="md:col-span-2">
                {event.fields.capa && event.fields.capa.fields.file && (
                  <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-lg">
                    <Image
                      src={`https:${event.fields.capa.fields.file.url}`}
                      alt={event.fields.title}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                )}
                <h1 className="mb-6 font-heading text-3xl font-bold text-gray-900">{event.fields.title}</h1>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600">{event.fields.descricao}</p>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                  <h2 className="mb-4 font-heading text-xl font-bold text-gray-900">Informações</h2>
                  <div className="space-y-4">
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
                      <span>{event.fields.morada || 'Localização não disponível'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 