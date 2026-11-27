import { useState } from 'react'
import { A1Contador } from './exercises/A1Contador'
import { A2Carrito } from './exercises/A2Carrito'
import { B1Relojes } from './exercises/B1Relojes'
import { B2Persistencia } from './exercises/B2Persistencia'
import { B3Detalle } from './exercises/B3Detalle'
import { B4SinEfecto } from './exercises/B4SinEfecto'
import { C1FormularioAcceso } from './exercises/C1FormularioAcceso'
import { C2Cronometro } from './exercises/C2Cronometro'
import { Cuaderno } from './exercises/Cuaderno'

const ejercicios = [
  { id: 'a1', titulo: 'A1 · Predice y comprueba', tema: 'useState como foto', componente: A1Contador },
  { id: 'a2', titulo: 'A2 · Carrito con useReducer', tema: 'Acciones tipadas + deshacer', componente: A2Carrito },
  { id: 'b1', titulo: 'B1 · Reloj con limpieza', tema: 'useEffect + setInterval', componente: B1Relojes },
  { id: 'b2', titulo: 'B2 · Estado persistente', tema: 'localStorage + unknown', componente: B2Persistencia },
  { id: 'b3', titulo: 'B3 · Detalle sin carreras', tema: 'AbortController', componente: B3Detalle },
  { id: 'b4', titulo: 'B4 · ¿Necesito un efecto?', tema: 'Datos y eventos', componente: B4SinEfecto },
  { id: 'c1', titulo: 'C1 · Foco inteligente', tema: 'useRef + formularios', componente: C1FormularioAcceso },
  { id: 'c2', titulo: 'C2 · Cronómetro con vueltas', tema: 'useRef + intervalos', componente: C2Cronometro },
  { id: 'd', titulo: 'D · Cuaderno del grupo', tema: 'Proyecto integrador', componente: Cuaderno },
] as const

export default function App() {
  const [seleccionado, setSeleccionado] = useState<(typeof ejercicios)[number]['id']>('a1')
  const actual = ejercicios.find((ejercicio) => ejercicio.id === seleccionado) ?? ejercicios[0]
  const Ejercicio = actual.componente

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">UT 02.4 · React + TypeScript</p>
          <h1>Estado, efectos y refs</h1>
          <p className="lede">Nueve ejercicios prácticos en una sola aplicación.</p>
        </div>
        <label className="exercise-picker">
          <span>Ejercicio</span>
          <select value={seleccionado} onChange={(event) => setSeleccionado(event.target.value as typeof seleccionado)}>
            {ejercicios.map((ejercicio) => <option key={ejercicio.id} value={ejercicio.id}>{ejercicio.titulo}</option>)}
          </select>
        </label>
      </header>
      <nav className="exercise-nav" aria-label="Seleccionar ejercicio">
        {ejercicios.map((ejercicio) => (
          <button
            className={seleccionado === ejercicio.id ? 'nav-chip is-active' : 'nav-chip'}
            key={ejercicio.id}
            type="button"
            onClick={() => setSeleccionado(ejercicio.id)}
          >{ejercicio.id.toUpperCase()}</button>
        ))}
      </nav>
      <section className="exercise-panel" key={seleccionado}>
        <div className="exercise-heading">
          <div><p className="eyebrow">{actual.tema}</p><h2>{actual.titulo}</h2></div>
        </div>
        <Ejercicio />
      </section>
      <footer>Proyecto de práctica · Cada ejercicio tiene su propio componente TypeScript.</footer>
    </main>
  )
}
