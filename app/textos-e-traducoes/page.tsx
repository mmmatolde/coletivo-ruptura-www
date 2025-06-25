import { getTexts } from '@/lib/contentful'
import TextosClient from './TextosClient'

interface ContentfulText {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    originalOuTraducao: boolean;
    title: string;
    capa: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    texto: any; // O tipo exato pode depender da sua configuração do Contentful
    autoria: string;
    date?: string;
  };
}

export const revalidate = 3600

export default async function TextsPage() {
  // Fetch all texts from Contentful
  const { texts: contentfulTexts } = await getTexts(1000, 0) // Fetch a large number to get all

  const allTexts = contentfulTexts.map((text: ContentfulText) => ({
    id: text.sys.id,
    originalOuTraducao: text.fields.originalOuTraducao,
    title: text.fields.title,
    capa: {
      url: `https:${text.fields.capa.fields.file.url}`
    },
    texto: text.fields.texto,
    autoria: text.fields.autoria,
    date: text.fields.date || text.sys.createdAt
  }));

  return <TextosClient allTexts={allTexts} />
}
