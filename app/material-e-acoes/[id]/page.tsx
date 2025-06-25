import { getMateriaisEAcoes } from '@/lib/contentful'
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer'
import type { Document as ContentfulDocument } from '@contentful/rich-text-types'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface MaterialPageProps {
  params: { id: string }
}

export default async function MaterialDetailPage({ params }: MaterialPageProps) {
  const materiais = await getMateriaisEAcoes()
  const material = materiais.find((item: any) => item.sys.id === params.id)

  if (!material) return notFound()

  const { title, capa, texto, autoria, date, pdf } = material.fields
  const imageUrl = capa?.fields?.file?.url
  const pdfs = Array.isArray(pdf) ? pdf : []

  const options: Options = {
    renderMark: {
      bold: (text) => <strong>{text}</strong>,
      italic: (text) => <em>{text}</em>,
      underline: (text) => <u>{text}</u>,
    },
    renderNode: {
      paragraph: (node, children) => <p className="mb-4 text-justify">{children}</p>,
      'heading-1': (node, children) => <h1 className="text-4xl font-bold mb-6">{children}</h1>,
      'heading-2': (node, children) => <h2 className="text-3xl font-bold mb-4">{children}</h2>,
      'heading-3': (node, children) => <h3 className="text-2xl font-bold mb-3">{children}</h3>,
      'unordered-list': (node, children) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
      'ordered-list': (node, children) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
      'list-item': (node, children) => <li className="mb-2">{children}</li>,
      hyperlink: (node, children) => <a href={node.data.uri} className="text-red-600 hover:underline">{children}</a>,
      blockquote: (node, children) => <blockquote className="border-l-4 border-red-600 pl-4 my-4 italic">{children}</blockquote>,
      'embedded-asset-block': (node: any) => {
        if (node.data.target?.fields?.file?.url) {
          return (
            <div className="my-8">
              <Image
                src={`https:${node.data.target.fields.file.url}`}
                alt={node.data.target.fields.title || 'Imagem incorporada'}
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>
          )
        }
        return null
      },
    },
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      {imageUrl && (
        <div className="relative h-64 w-full mb-6">
          <Image
            src={`https:${imageUrl}`}
            alt={title}
            fill
            className="object-cover rounded"
          />
        </div>
      )}
      <h1 className="font-heading text-3xl font-bold mb-4">{title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        {autoria} • {date && new Date(date).toLocaleDateString('pt-PT')}
      </div>
      <div className="prose dark:prose-invert max-w-none mb-8">
        {texto && documentToReactComponents(texto as ContentfulDocument, options)}
      </div>
      {pdfs.length > 0 && (
        <div className="flex flex-col gap-2">
          {pdfs.map((pdfAsset: any, idx: number) => {
            const pdfUrl = pdfAsset?.fields?.file?.url
            const pdfName = pdfAsset?.fields?.title || `PDF ${idx + 1}`
            return pdfUrl ? (
              <Button asChild key={pdfUrl} className="bg-red-600 text-white hover:bg-red-700">
                <a href={`https:${pdfUrl}`} target="_blank" rel="noopener noreferrer" download>
                  <Download className="mr-2 h-4 w-4" /> Descarregar {pdfName}
                </a>
              </Button>
            ) : null
          })}
        </div>
      )}
    </div>
  )
} 