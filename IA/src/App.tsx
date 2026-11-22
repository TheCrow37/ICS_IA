import { useState } from "react";
import { FormularioNota } from "./components/FormularioNota";
import { ResumenNotas } from "./components/ResumenNotas";
import { notasIniciales } from "./datos";
import type { Nota } from "./tipos";
import { calcularResultado } from "./utilidades";

function App() {
  const [notas, setNotas] = useState<Nota[]>(notasIniciales);
  const aprobados = notas.filter((nota) => nota.calificacion >= 5).length;
  const media = notas.length === 0
    ? 0
    : notas.reduce((suma, nota) => suma + nota.calificacion, 0) / notas.length;

  function agregarNota(nueva: Omit<Nota, "id">) {
    setNotas((actuales) => [
      ...actuales,
      { ...nueva, id: actuales.reduce((maximo, nota) => Math.max(maximo, nota.id), 0) + 1 },
    ]);
  }

  return (
    <main className="contenedor">
      <h1>Registro de notas</h1>
      <p className="subtitulo">2.º DAW · Evaluación final</p>

      <ResumenNotas media={media} aprobados={aprobados} total={notas.length} />

      <section aria-labelledby="titulo-lista">
        <h2 id="titulo-lista">Notas</h2>
        {notas.length === 0 ? (
          <p className="vacio">Todavía no hay notas. Añade la primera con el formulario.</p>
        ) : (
          <ul className="lista-notas">
            {notas.map((nota) => {
              const resultado = calcularResultado(nota.calificacion);
              return (
                <li className={`nota nota--${resultado.nivel}`} key={nota.id}>
                  <span className="nota__modulo">{nota.modulo}</span>
                  <span className="nota__calificacion">
                    {nota.calificacion.toFixed(1)} · {resultado.texto}
                  </span>
                  {nota.observaciones && <span className="observaciones">{nota.observaciones}</span>}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <FormularioNota onAgregar={agregarNota} />
    </main>
  );
}

export default App;

