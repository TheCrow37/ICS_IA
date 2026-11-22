import type { Resultado } from "./tipos";

/** Clasifica una calificación de 0 a 10 en el tramo académico correspondiente. */
export function calcularResultado(calificacion: number): Resultado {
  if (!Number.isFinite(calificacion) || calificacion < 0 || calificacion > 10) {
    throw new RangeError("La calificación debe estar entre 0 y 10.");
  }

  if (calificacion < 5) return { nivel: "suspenso", texto: "Suspenso" };
  if (calificacion < 7) return { nivel: "aprobado", texto: "Aprobado" };
  if (calificacion < 9) return { nivel: "notable", texto: "Notable" };
  return { nivel: "sobresaliente", texto: "Sobresaliente" };
}

