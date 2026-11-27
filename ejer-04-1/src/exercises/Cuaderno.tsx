import { useEffect, useReducer, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'

interface Alumno { id: string; nombre: string; nota: number }
type Accion =
  | { tipo: 'anadir'; id: string; nombre: string; nota: number }
  | { tipo: 'cambiarNota'; id: string; nota: number }
  | { tipo: 'eliminar'; id: string }
  | { tipo: 'cargar'; alumnos: Alumno[] }
  | { tipo: 'vaciar' }

function normalizarNota(nota: number) {
  if (!Number.isFinite(nota)) return 0
  return Math.min(10, Math.max(0, nota))
}

function reducer(alumnos: Alumno[], accion: Accion): Alumno[] {
  switch (accion.tipo) {
    case 'anadir': {
      const nombre = accion.nombre.trim()
      if (!nombre) return alumnos
      return [...alumnos, { id: accion.id, nombre, nota: normalizarNota(accion.nota) }]
    }
    case 'cambiarNota':
      return alumnos.map((alumno) => alumno.id === accion.id ? { ...alumno, nota: normalizarNota(accion.nota) } : alumno)
    case 'eliminar':
      return alumnos.filter((alumno) => alumno.id !== accion.id)
    case 'cargar':
      return accion.alumnos.map((alumno) => ({ ...alumno, nombre: alumno.nombre.trim(), nota: normalizarNota(alumno.nota) })).filter((alumno) => alumno.nombre.length > 0)
    case 'vaciar':
      return []
  }
}

function esAlumno(valor: unknown): valor is Alumno {
  if (typeof valor !== 'object' || valor === null) return false
  const dato = valor as Record<string, unknown>
  return typeof dato.id === 'string' && typeof dato.nombre === 'string' && typeof dato.nota === 'number' && Number.isFinite(dato.nota)
}

interface FormularioAlumnoProps {
  alAnadir: (nombre: string, nota: number) => void
  cargando: boolean
}

function FormularioAlumno({ alAnadir, cargando }: FormularioAlumnoProps) {
  const [nombre, setNombre] = useState('')
  const [nota, setNota] = useState('')
  const campoNombre = useRef<HTMLInputElement>(null)

  function vaciar() {
    setNombre('')
    setNota('')
    campoNombre.current?.focus()
  }

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const numero = Number(nota)
    if (!nombre.trim() || nota.trim() === '' || !Number.isFinite(numero)) return
    alAnadir(nombre, numero)
    vaciar()
  }

  function manejarTecla(evento: KeyboardEvent<HTMLFormElement>) {
    if (evento.key === 'Escape') {
      evento.preventDefault()
      vaciar()
    }
  }

  return <form className="demo-card demo-stack" onSubmit={manejarEnvio} onKeyDown={manejarTecla}>
    <h3>Añadir alumno</h3>
    <div className="field-grid">
      <label className="field">Nombre<input ref={campoNombre} value={nombre} onChange={(evento) => setNombre(evento.target.value)} required /></label>
      <label className="field">Nota (0–10)<input type="number" min="0" max="10" step="0.1" value={nota} onChange={(evento) => setNota(evento.target.value)} required /></label>
    </div>
    <div className="button-row">
      <button className="button button-primary" type="submit">Añadir al cuaderno</button>
      <button className="button" type="button" onClick={vaciar}>Vaciar campos</button>
      <span className="muted">Esc también vacía el formulario.</span>
    </div>
    {cargando && <p className="status" aria-live="polite">Cargando…</p>}
  </form>
}

interface ListaAlumnosProps {
  alumnos: Alumno[]
  orden: 'nombre' | 'nota'
  alOrdenar: (orden: 'nombre' | 'nota') => void
  alCambiarNota: (id: string, nota: number) => void
  alEliminar: (id: string) => void
}

function ListaAlumnos({ alumnos, orden, alOrdenar, alCambiarNota, alEliminar }: ListaAlumnosProps) {
  const ordenados = [...alumnos].sort((a, b) => orden === 'nombre' ? a.nombre.localeCompare(b.nombre, 'es') : b.nota - a.nota)
  return <section className="demo-card">
    <div className="button-row" style={{ justifyContent: 'space-between' }}>
      <h3>Alumnos ({alumnos.length})</h3>
      <label className="button-row muted">Ordenar por
        <select value={orden} onChange={(evento) => alOrdenar(evento.target.value as 'nombre' | 'nota')}><option value="nombre">Nombre</option><option value="nota">Nota</option></select>
      </label>
    </div>
    {ordenados.length === 0 ? <p className="muted">Aún no hay alumnos.</p> : <ul className="row-list">
      {ordenados.map((alumno) => <li className="row-item" key={alumno.id}>
        <span><strong>{alumno.nombre}</strong><br /><small>Nota actual: {alumno.nota.toFixed(1)}</small></span>
        <span className="row-actions">
          <label className="sr-only" htmlFor={`nota-${alumno.id}`}>Cambiar nota de {alumno.nombre}</label>
          <input id={`nota-${alumno.id}`} aria-label={`Nueva nota de ${alumno.nombre}`} type="number" min="0" max="10" step="0.1" value={alumno.nota} onChange={(evento) => {
            if (evento.target.value !== '') alCambiarNota(alumno.id, Number(evento.target.value))
          }} />
          <button className="small-button" onClick={() => alEliminar(alumno.id)}>Eliminar</button>
        </span>
      </li>)}
    </ul>}
  </section>
}

function Resumen({ alumnos }: { alumnos: Alumno[] }) {
  const media = alumnos.length ? alumnos.reduce((total, alumno) => total + alumno.nota, 0) / alumnos.length : 0
  const aprobados = alumnos.filter((alumno) => alumno.nota >= 5).length
  const mejor = alumnos.reduce<Alumno | null>((actual, alumno) => !actual || alumno.nota > actual.nota ? alumno : actual, null)
  const unDecimal = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
  return <section className="demo-card"><h3>Resumen</h3><div className="number-grid">
    <div className="stat-box"><span className="stat-label">Nota media</span><span className="stat-value">{unDecimal.format(media)}</span></div>
    <div className="stat-box"><span className="stat-label">Aprobados</span><span className="stat-value">{aprobados}</span></div>
    <div className="stat-box"><span className="stat-label">Mejor nota</span><span className="stat-value">{mejor ? `${mejor.nombre} · ${unDecimal.format(mejor.nota)}` : '—'}</span></div>
  </div></section>
}

export function Cuaderno() {
  const [alumnos, dispatch] = useReducer(reducer, [])
  const [orden, setOrden] = useState<'nombre' | 'nota'>('nombre')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const tituloAnterior = document.title
    document.title = `Cuaderno (${alumnos.length} alumnos)`
    return () => { document.title = tituloAnterior }
  }, [alumnos.length])

  function anadir(nombre: string, nota: number) {
    dispatch({ tipo: 'anadir', id: crypto.randomUUID(), nombre, nota })
  }

  async function cargarEjemplo() {
    setCargando(true)
    setError('')
    try {
      const respuesta = await fetch('/alumnos.json')
      if (!respuesta.ok) throw new Error(`No se pudo cargar el ejemplo (HTTP ${respuesta.status}).`)
      const valor: unknown = await respuesta.json()
      if (!Array.isArray(valor) || !valor.every(esAlumno)) throw new Error('El JSON de ejemplo no tiene el formato esperado.')
      dispatch({ tipo: 'cargar', alumnos: valor })
    } catch (causa) {
      setError(causa instanceof Error ? causa.message : 'Error desconocido al cargar el ejemplo.')
    } finally {
      setCargando(false)
    }
  }

  return <div className="demo-stack">
    <FormularioAlumno alAnadir={anadir} cargando={cargando} />
    <div className="button-row"><button className="button button-soft" type="button" onClick={() => void cargarEjemplo()} disabled={cargando}>Cargar ejemplo</button><button className="button button-danger" type="button" onClick={() => dispatch({ tipo: 'vaciar' })} disabled={alumnos.length === 0}>Vaciar cuaderno</button></div>
    {error && <p className="status error" role="alert">{error}</p>}
    <Resumen alumnos={alumnos} />
    <ListaAlumnos alumnos={alumnos} orden={orden} alOrdenar={setOrden} alCambiarNota={(id, nota) => dispatch({ tipo: 'cambiarNota', id, nota })} alEliminar={(id) => dispatch({ tipo: 'eliminar', id })} />
  </div>
}
