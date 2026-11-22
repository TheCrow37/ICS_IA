import { useState, type FormEvent } from "react";

type NuevaNota = {
  modulo: string;
  calificacion: number;
  observaciones?: string;
};

type FormularioNotaProps = {
  onAgregar: (nota: NuevaNota) => void;
};

export function FormularioNota({ onAgregar }: FormularioNotaProps) {
  const [modulo, setModulo] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [observaciones, setObservaciones] = useState("");

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const nombre = modulo.trim();
    const valor = Number(calificacion);
    if (!nombre || calificacion === "" || !Number.isFinite(valor) || valor < 0 || valor > 10) return;

    const nota: NuevaNota = { modulo: nombre, calificacion: valor };
    if (observaciones.trim()) nota.observaciones = observaciones.trim();
    onAgregar(nota);
    setModulo("");
    setCalificacion("");
    setObservaciones("");
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio}>
      <h2>Añadir nota</h2>
      <div className="campo">
        <label htmlFor="modulo">Módulo</label>
        <input id="modulo" type="text" value={modulo} onChange={(evento) => setModulo(evento.target.value)} required />
      </div>
      <div className="campo">
        <label htmlFor="calificacion">Calificación (0 a 10)</label>
        <input id="calificacion" type="number" min="0" max="10" step="0.1" value={calificacion} onChange={(evento) => setCalificacion(evento.target.value)} required />
      </div>
      <div className="campo">
        <label htmlFor="observaciones">Observaciones (opcional)</label>
        <input id="observaciones" type="text" value={observaciones} onChange={(evento) => setObservaciones(evento.target.value)} />
      </div>
      <button type="submit" disabled={!modulo.trim() || calificacion === ""}>Añadir nota</button>
    </form>
  );
}

