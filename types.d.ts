declare module 'contentful' {
  export interface Entry<T> {
    sys: {
      id: string;
      createdAt: string;
      updatedAt: string;
    };
    fields: T;
  }

  export interface EntryFieldTypes {
    RichText: any;
    Object: any;
    Symbol: string;
    Text: string;
    Integer: number;
    Number: number;
    Date: string;
    Boolean: boolean;
    Location: {
      lat: number;
      lon: number;
    };
    Link: {
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    };
  }

  export function createClient(params: {
    space: string;
    accessToken: string;
  }): {
    getEntries: (params: any) => Promise<{
      items: Entry<any>[];
      total: number;
      skip: number;
      limit: number;
    }>;
    getEntry: (id: string) => Promise<Entry<any>>;
  };
}

declare module '@contentful/rich-text-types' {
  export interface Document {
    nodeType: string;
    data: any;
    content: any[];
  }
} 