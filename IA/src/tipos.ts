export type Nota = {
  id: number;
  modulo: string;
  calificacion: number;
  observaciones?: string;
};

export type Resultado = {
  nivel: "suspenso" | "aprobado" | "notable" | "sobresaliente";
  texto: string;
};

