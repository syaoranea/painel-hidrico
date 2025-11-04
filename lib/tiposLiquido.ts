export interface TipoLiquido {
  id: number
  nome: string
  categoria: string
}

export interface TipoUrina {
  id: number
  nome: string
}

export const tiposLiquido: TipoLiquido[] = [
  { id: 1, nome: "Água", categoria: "Água" },
  { id: 2, nome: "Água com gás", categoria: "Água" },
  { id: 3, nome: "Água de coco", categoria: "Água" },
  { id: 4, nome: "Café preto", categoria: "Café" },
  { id: 5, nome: "Chá verde", categoria: "Chá" },
  { id: 6, nome: "Chá de camomila", categoria: "Chá" },
  { id: 7, nome: "Suco natural", categoria: "Suco" },
  { id: 8, nome: "Refrigerante", categoria: "Industrializado" },
  { id: 9, nome: "Iogurte", categoria: "Lácteo" },
  { id: 10, nome: "Isotônico", categoria: "Esportivo" },
  { id: 11, nome: "Energético", categoria: "Esportivo" },
  { id: 12, nome: "Leite integral", categoria: "Lácteo" },
  { id: 13, nome: "Cerveja", categoria: "Álcool" },
  { id: 14, nome: "Vinho", categoria: "Álcool" },
]

export const tiposUrina: TipoUrina[] = [
  { id: 1, nome: "Cateterismo" },
  { id: 2, nome: "Voluntário"},
]