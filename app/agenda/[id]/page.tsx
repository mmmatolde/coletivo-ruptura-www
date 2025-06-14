import Image from "next/image"
import { Calendar, Clock, MapPin } from "lucide-react"
import { getEventById } from "@/lib/contentful"

export default async function EventDetailsPage({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id)

  if (!event) {
    return (
      <div className="container py-16">
        <h1 className="text-2xl font-bold text-red-600">Evento não encontrado</h1>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2">
          {/* Title */}
          <h1 className="mb-6 text-4xl font-bold text-gray-900 leading-tight">{event.fields.title}</h1>

          {/* Event Cover Image */}
          {event.fields.capa && event.fields.capa.fields.file && (
            <div className="relative mb-8 aspect-[21/9] w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src={`https:${event.fields.capa.fields.file.url}`}
                alt={event.fields.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}

          {/* Date, Time, Location Bar */}
          <div className="mb-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-base text-gray-700">
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 shrink-0 text-gray-500" />
              <span>{new Date(event.fields.dataEHora).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 shrink-0 text-gray-500" />
              <span>{new Date(event.fields.dataEHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 shrink-0 text-gray-500" />
              <span>{event.fields.morada || 'Localização não disponível'}</span>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-lg max-w-none">
            <p className="text-justify text-gray-700 leading-relaxed">{event.fields.descricao}</p>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-gray-50 p-6 shadow-sm sticky top-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Informações do Evento</h2>
            <div className="space-y-4 text-sm">
              {event.fields.ttuloDoFilmeexposicao && (
                <div>
                  <p className="font-semibold text-gray-800">Título Original:</p>
                  <p className="text-gray-700">{event.fields.ttuloDoFilmeexposicao}</p>
                </div>
              )}
              {event.fields.legendas && (
                <div>
                  <p className="font-semibold text-gray-800">Legendas:</p>
                  <p className="text-gray-700">{event.fields.legendas}</p>
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-800">Data e Hora:</p>
                <p className="text-gray-700">{new Date(event.fields.dataEHora).toLocaleDateString()} às {new Date(event.fields.dataEHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Localização:</p>
                <p className="text-gray-700">{event.fields.morada || 'Não disponível'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Entrada:</p>
                <p className="text-gray-700">✊ Entrada livre.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 