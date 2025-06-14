export interface StaticText {
  id: string;
  originalOuTraducao: boolean;
  title: string;
  capa: {
    url: string;
  };
  texto: string;
  autoria: string;
  date: string;
}

export const staticTexts: StaticText[] = [
  {
    id: "static-1",
    originalOuTraducao: false,
    title: "O Capital - Volume I",
    capa: {
      url: "/images/capital-1.jpg"
    },
    texto: "O Capital é uma obra-prima de Karl Marx que analisa o modo de produção capitalista...",
    autoria: "Karl Marx",
    date: "1867-09-14"
  },
  // Adicione aqui os outros textos estáticos
]; 