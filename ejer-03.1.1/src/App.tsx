import { useState } from "react";
import { Filtros } from "./components/Filtros";
import { ListaTareas } from "./components/ListaTareas";
import { ResumenTareas } from "./components/ResumenTareas";
import { tareasIniciales } from "./data/tareas";
import type { FiltroPrioridad } from "./types";

function App() {
  const [tareas, setTareas] = useState(tareasIniciales);
  const [filtro, setFiltro] = useState<FiltroPrioridad>("todas");

  const tareasVisibles = tareas.filter(
    (tarea) => filtro === "todas" || tarea.prioridad === filtro,
  );

  function cambiarCompletada(id: number) {
    setTareas((tareasActuales) =>
      tareasActuales.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea,
      ),
    );
  }

  return (
    <main className="page-shell">
      <section aria-labelledby="page-title" className="dashboard">
        <header className="dashboard-header">
          <p className="eyebrow">ORGANIZA TU DÍA</p>
          <h1 id="page-title">Mis tareas</h1>
          <p className="subtitle">Un paso a la vez. Marca lo que ya has terminado.</p>
        </header>

        <Filtros filtroActual={filtro} onCambiarFiltro={setFiltro} />
        <ResumenTareas tareasVisibles={tareasVisibles} totalTareas={tareas.length} />
        <ListaTareas tareas={tareasVisibles} onCambiarCompletada={cambiarCompletada} />
      </section>
    </main>
  );
}

export default App;
