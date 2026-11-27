import { useEffect, useState } from 'react'

interface Alumno { id: string; nombre: string; nota: number }
const IDS = ['a1', 'a2', 'a3', 'a4']

function esAlumno(valor: unknown): valor is Alumno {
  if (typeof valor !== 'object' || valor === null) return false
  const dato = valor as Record<string, unknown>
  return typeof dato.id === 'string' && typeof dato.nombre === 'string' && typeof dato.nota === 'number'
}

function DetalleAlumno({ id }: { id: string }) {
  const [alumno, setAlumno] = useState<Alumno | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const controlador = new AbortController()
    async function cargar() {
      try {
        const respuesta = await fetch('/alumnos.json', { signal: controlador.signal })
        if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`)
        const datos: unknown = await respuesta.json()
        if (!Array.isArray(datos) || !datos.every(esAlumno)) throw new Error('El archivo tiene un formato incorrecto.')
        const encontrado = datos.find((entrada) => entrada.id === id)
        if (!encontrado) throw new Error('No se encontró ese alumno.')
        setAlumno(encontrado)
      } catch (causa) {
        if (causa instanceof DOMException && causa.name === 'AbortError') return
        setError(causa instanceof Error ? causa.message : 'Error desconocido')
      }
    }
    void cargar()
    return () => controlador.abort()
  }, [id])

  if (error) return <p className="status error" role="alert">{error}</p>
  if (!alumno) return <p className="status" aria-live="polite">Cargando detalle…</p>
  return <div className="stat-box"><span className="stat-label">Detalle del alumno</span><span className="stat-value">{alumno.nombre}</span><p>Nota: {alumno.nota.toFixed(1)}</p></div>
}

export function B3Detalle() {
  const [id, setId] = useState(IDS[0])
  return <div className="demo-stack"><article className="demo-card">
    <h3>Cambiar de alumno cancela la petición anterior</h3>
    <label className="field">Alumno<select value={id} onChange={(event) => setId(event.target.value)}>{IDS.map((alumnoId) => <option key={alumnoId} value={alumnoId}>{alumnoId}</option>)}</select></label>
    <div style={{ marginTop: 14 }}><DetalleAlumno key={id} id={id} /></div>
  </article><p className="muted">El efecto crea un AbortController por petición y lo aborta al cambiar el id o desmontar el detalle.</p></div>
}
