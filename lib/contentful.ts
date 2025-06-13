import { createClient } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import { type Entry, type EntryFieldTypes } from 'contentful'

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
      items: response.items.map(item => ({
        id: item.sys.id,
        title: item.fields.title,
        isArticle: item.fields.isArticle
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