import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";

interface Pelicula {
  titulo: string;
  anio: number;
  genero: string;
}

const PELICULAS: Pelicula[] = [
  { titulo: "El padrino", anio: 1972, genero: "Drama" },
  { titulo: "Blade Runner", anio: 1982, genero: "Ciencia ficción" },
  { titulo: "Alien", anio: 1979, genero: "Terror" },
  { titulo: "Amélie", anio: 2001, genero: "Comedia" },
  { titulo: "Matrix", anio: 1999, genero: "Ciencia ficción" },
  { titulo: "El resplandor", anio: 1980, genero: "Terror" },
  { titulo: "Pulp Fiction", anio: 1994, genero: "Drama" },
  { titulo: "Cobardes", anio: 2008, genero: "Comedia" },
  { titulo: "Origen", anio: 2010, genero: "Ciencia ficción" },
];

const GENEROS: string[] = ["Todos", ...new Set(PELICULAS.map((p) => p.genero))];

export default function BuscadorPeliculas() {
  const [busqueda, setBusqueda] = useState<string>("");
  const [genero, setGenero] = useState<string>("Todos");

  const alCambiarBusqueda = (e: ChangeEvent<HTMLInputElement>): void =>
    setBusqueda(e.target.value);

  const alCambiarGenero = (e: ChangeEvent<HTMLSelectElement>): void =>
    setGenero(e.target.value);

  const alPulsarTecla = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Escape") setBusqueda("");
  };

  const limpiarFiltros = (): void => {
    setBusqueda("");
    setGenero("Todos");
  };

  // Datos derivados
  const filtradas: Pelicula[] = PELICULAS.filter(
    (p) =>
      p.titulo.toLowerCase().includes(busqueda.trim().toLowerCase()) &&
      (genero === "Todos" || p.genero === genero)
  );

  return (
    <section>
      <h2>Ejercicio 4. Buscador de películas</h2>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <input
          type="text"
          value={busqueda}
          onChange={alCambiarBusqueda}
          onKeyDown={alPulsarTecla}
          placeholder="Buscar título (Esc para borrar)"
        />
        <select value={genero} onChange={alCambiarGenero}>
          {GENEROS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <button onClick={limpiarFiltros}>Limpiar filtros</button>
      </div>
      <p>{filtradas.length} resultados</p>
      {filtradas.length === 0 ? (
        <p>Sin resultados</p>
      ) : (
        <ul>
          {filtradas.map((p) => (
            <li key={p.titulo}>
              {p.titulo} ({p.anio}) · {p.genero}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
