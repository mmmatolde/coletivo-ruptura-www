import { createClient, type Entry } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import { type EntryFieldTypes } from 'contentful'

// Definindo o tipo para os campos do Blog
export interface BlogFields {
  fields: {
    isArticle: boolean
    title: string
    capa: {
      fields: {
        file: {
          url: string
        }
      }
    }
    texto: Document
    autoria: string
    date: string
    description?: string
    excerpt?: string
  }
  sys: {
    id: string
    createdAt: string
    updatedAt: string
  }
}

// Definindo o tipo para os campos dos Eventos
export interface EventFields {
  fields: {
    title: string
    dataEHora: string // Será uma string ISO 8601 do Contentful
    localizacao: {
      lat: number
      lon: number
    }
    morada: string // Tornando morada obrigatória
    capa: {
      fields: {
        file: {
          url: string
        }
      }
    }
    descricao: Document
    ttuloDoFilmeexposicao?: string // Campo corrigido para título de filme/exposição
    legendas?: string // Campo corrigido para legendas
  }
  sys: {
    id: string
    createdAt: string
    updatedAt: string
  }
}

export interface TextFields {
  fields: {
    title: string
    capa: {
      fields: {
        file: {
          url: string
        }
      }
    }
    texto: Document
    autoria: string
    date: string
    originalOuTraducao: boolean
  }
  sys: {
    id: string
    createdAt: string
    updatedAt: string
  }
}

// Configuração do cliente Contentful
export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

interface QueryResponse {
  articles: BlogFields[]
  total: number
  skip: number
  limit: number
}

interface EventQueryResponse {
  events: EventFields[]
  total: number
  skip: number
  limit: number
}

// Função para buscar todos os artigos
export async function getArticles(limit = 6, skip = 0): Promise<QueryResponse> {
  try {
    const response = await client.getEntries({
      content_type: 'blog',
      'fields.isArticle': true,
      order: ['-sys.createdAt'],
      limit,
      skip,
    })

    return {
      articles: response.items as unknown as BlogFields[],
      total: response.total,
      skip: response.skip,
      limit: response.limit,
    }
  } catch (error) {
    console.error('Erro ao buscar artigos:', error)
    return {
      articles: [],
      total: 0,
      skip: 0,
      limit,
    }
  }
}

// Função para buscar um artigo específico pelo ID
export async function getArticleById(id: string): Promise<BlogFields | null> {
  try {
    const article = await client.getEntry(id)
    
    // Verifica se é um artigo
    if (!article.fields.isArticle) {
      return null
    }

    console.log('Resposta do Contentful:', JSON.stringify(article, null, 2))

    return article as unknown as BlogFields
  } catch (error) {
    console.error('Erro ao buscar artigo:', error)
    return null
  }
}

// Função para buscar artigos com texto de busca
export async function searchArticles(
  searchTerm: string,
  limit = 6,
  skip = 0
): Promise<QueryResponse> {
  try {
    const response = await client.getEntries({
      content_type: 'blog',
      'fields.isArticle': true,
      query: searchTerm,
      order: ['-sys.createdAt'],
      limit,
      skip,
    })

    return {
      articles: response.items as unknown as BlogFields[],
      total: response.total,
      skip: response.skip,
      limit: response.limit,
    }
  } catch (error) {
    console.error('Erro ao buscar artigos:', error)
    return {
      articles: [],
      total: 0,
      skip: 0,
      limit,
    }
  }
}

// Função para buscar um artigo específico pelo slug
export async function getArticleBySlug(slug: string) {
  try {
    const response = await client.getEntries({
      content_type: 'blog',
      'fields.slug': slug,
      limit: 1,
    })

    return response.items[0] as unknown as BlogFields
  } catch (error) {
    console.error('Erro ao buscar artigo:', error)
    return null
  }
}

// Função para buscar artigos por categoria
export async function getArticlesByCategory(
  category: string,
  limit = 6,
  skip = 0
): Promise<QueryResponse> {
  try {
    const response = await client.getEntries({
      content_type: 'blog',
      'fields.category': category,
      order: ['-sys.createdAt'],
      limit,
      skip,
    })

    return {
      articles: response.items as unknown as BlogFields[],
      total: response.total,
      skip: response.skip,
      limit: response.limit,
    }
  } catch (error) {
    console.error('Erro ao buscar artigos por categoria:', error)
    return {
      articles: [],
      total: 0,
      skip: 0,
      limit,
    }
  }
}

// Função para buscar categorias únicas
export async function getCategories(): Promise<string[]> {
  try {
    const response = await client.getEntries({
      content_type: 'blog',
      select: ['fields.category'],
    })

    const categories = response.items
      .map((item: any) => item.fields.category)
      .filter((category: string, index: number, self: string[]) => 
        self.indexOf(category) === index
      )

    return categories
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return []
  }
}

// Função para buscar todas as tribunas
export async function getTribunes(limit = 6, skip = 0): Promise<QueryResponse> {
  try {
    console.log('Buscando tribunas com params:', { limit, skip })
    const response = await client.getEntries({
      content_type: 'blog',
      'fields.isArticle': false,
      order: ['-sys.createdAt'],
      limit,
      skip,
    })

    console.log('Resposta do Contentful para tribunas:', {
      total: response.total,
      items: response.items.map((item) => ({
        id: item.sys.id,
        title: (item.fields as BlogFields['fields']).title,
        isArticle: (item.fields as BlogFields['fields']).isArticle
      }))
    })

    return {
      articles: response.items as unknown as BlogFields[],
      total: response.total,
      skip: response.skip,
      limit: response.limit,
    }
  } catch (error) {
    console.error('Erro ao buscar tribunas:', error)
    return {
      articles: [],
      total: 0,
      skip: 0,
      limit,
    }
  }
}

// Função para buscar uma tribuna específica pelo ID
export async function getTribuneById(id: string): Promise<BlogFields | null> {
  try {
    const tribune = await client.getEntry(id)
    
    // Verifica se é uma tribuna (isArticle deve ser false)
    if (tribune.fields.isArticle === true) {
      return null
    }

    return tribune as unknown as BlogFields
  } catch (error) {
    console.error('Erro ao buscar tribuna:', error)
    return null
  }
}

// Função para buscar publicações recentes (artigos e tribunas)
export async function getRecentPublications(limit = 3, skip = 0): Promise<QueryResponse> {
  try {
    // Buscar artigos e tribunas separadamente
    const [articlesResponse, tribunesResponse] = await Promise.all([
      client.getEntries({
        content_type: 'blog',
        'fields.isArticle': true,
        order: ['-sys.createdAt'],
        limit: limit,
        skip: 0,
      }),
      client.getEntries({
        content_type: 'blog',
        'fields.isArticle': false,
        order: ['-sys.createdAt'],
        limit: limit,
        skip: 0,
      })
    ])

    console.log('Artigos encontrados:', articlesResponse.items.length)
    console.log('Tribunas encontradas:', tribunesResponse.items.length)

    // Combinar e ordenar por data
    const allItems = [
      ...articlesResponse.items,
      ...tribunesResponse.items
    ].sort((a, b) => {
      const dateA = new Date(a.sys.createdAt).getTime()
      const dateB = new Date(b.sys.createdAt).getTime()
      return dateB - dateA
    })

    // Garantir pelo menos 1 de cada tipo
    const selectedItems = []
    
    // Adicionar o artigo mais recente se existir
    const latestArticle = articlesResponse.items[0]
    if (latestArticle) {
      selectedItems.push(latestArticle)
      console.log('Artigo selecionado:', latestArticle.fields.title)
    }
    
    // Adicionar a tribuna mais recente se existir
    const latestTribune = tribunesResponse.items[0]
    if (latestTribune) {
      selectedItems.push(latestTribune)
      console.log('Tribuna selecionada:', latestTribune.fields.title)
    }

    // Preencher o resto com os itens mais recentes, independente do tipo
    const remainingItems = allItems
      .filter(item => !selectedItems.includes(item))
      .slice(0, limit - selectedItems.length)

    console.log('Itens restantes selecionados:', remainingItems.length)

    // Combinar e ordenar por data
    const finalItems = [...selectedItems, ...remainingItems].sort((a, b) => {
      const dateA = new Date(a.sys.createdAt).getTime()
      const dateB = new Date(b.sys.createdAt).getTime()
      return dateB - dateA
    })

    console.log('Itens finais:', finalItems.map(item => ({
      title: item.fields.title,
      type: (item.fields as BlogFields['fields']).isArticle ? 'Artigo' : 'Tribuna',
      date: item.sys.createdAt
    })))

    return {
      articles: finalItems as unknown as BlogFields[],
      total: finalItems.length,
      skip: 0,
      limit,
    }
  } catch (error) {
    console.error('Erro ao buscar publicações recentes:', error)
    return {
      articles: [],
      total: 0,
      skip: 0,
      limit,
    }
  }
}

export async function getTexts(limit: number = 10, skip: number = 0) {
  try {
    const response = await client.getEntries({
      content_type: 'textosETraducoes',
      limit,
      skip,
      order: ['-sys.createdAt'],
    });

    const texts = response.items;
    const total = response.total;

    return { texts, total };
  } catch (error) {
    console.error('Error fetching texts:', error);
    return { texts: [], total: 0 };
  }
}

// Função para buscar todos os eventos
export async function getEvents(limit = 6, skip = 0): Promise<EventQueryResponse> {
  try {
    const response = await client.getEntries({
      content_type: 'eventos',
      limit,
      skip,
    })

    return {
      events: response.items as unknown as EventFields[],
      total: response.total,
      skip: response.skip,
      limit: response.limit,
    }
  } catch (error) {
    console.error('Erro ao buscar eventos:', error)
    return {
      events: [],
      total: 0,
      skip: 0,
      limit,
    }
  }
}

export async function getEventById(id: string): Promise<EventFields | null> {
  try {
    const response = await client.getEntry(id)
    return response as unknown as EventFields
  } catch (error) {
    console.error('Erro ao buscar evento:', error)
    return null
  }
}

// Função para buscar categorias das tribunas
export async function getTribuneCategories(): Promise<string[]> {
  try {
    const response = await client.getEntries({
      content_type: 'blog',
      'fields.isArticle': false,
      select: 'fields.categoria',
    })

    // Extrair categorias únicas do array de categorias
    const categories = new Set<string>()
    response.items.forEach((item: any) => {
      if (item.fields.categoria && Array.isArray(item.fields.categoria)) {
        item.fields.categoria.forEach((cat: string) => categories.add(cat))
      }
    })

    return Array.from(categories).sort()
  } catch (error) {
    console.error('Erro ao buscar categorias das tribunas:', error)
    return []
  }
}

// Função para buscar um texto específico pelo ID
export async function getTextById(id: string): Promise<TextFields | null> {
  try {
    const text = await client.getEntry(id);
    // Validação para garantir que a entrada é do tipo esperado, se necessário
    if (text.sys.contentType.sys.id !== 'textosETraducoes') {
      console.warn(`Entrada com ID ${id} não é do tipo 'textosETraducoes'.`);
      return null;
    }
    return text as unknown as TextFields;
  } catch (error) {
    console.error(`Erro ao buscar texto com ID ${id}:`, error);
    return null;
  }
} 