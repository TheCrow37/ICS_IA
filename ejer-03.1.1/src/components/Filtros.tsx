import type { FiltroPrioridad } from "../types";

interface OpcionFiltro {
  valor: FiltroPrioridad;
  etiqueta: string;
}

interface PropsFiltros {
  filtroActual: FiltroPrioridad;
  onCambiarFiltro: (filtro: FiltroPrioridad) => void;
}

const opcionesFiltro: OpcionFiltro[] = [
  { valor: "todas", etiqueta: "Todas" },
  { valor: "alta", etiqueta: "Alta" },
  { valor: "media", etiqueta: "Media" },
  { valor: "baja", etiqueta: "Baja" },
];

export function Filtros({ filtroActual, onCambiarFiltro }: PropsFiltros) {
  return (
    <nav className="filters" aria-label="Filtrar tareas por prioridad">
      {opcionesFiltro.map((opcion) => (
        <button
          aria-pressed={filtroActual === opcion.valor}
          className={`filter-button${filtroActual === opcion.valor ? " filter-button--active" : ""}`}
          key={opcion.valor}
          onClick={() => onCambiarFiltro(opcion.valor)}
          type="button"
        >
          {opcion.etiqueta}
        </button>
      ))}
    </nav>
  );
}
