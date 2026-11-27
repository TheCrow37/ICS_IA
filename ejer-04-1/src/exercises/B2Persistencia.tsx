import { useEffect, useState } from 'react'

const CLAVE = 'ejer-04-1-preferencias-v1'
interface Preferencias { nombre: string; tema: 'claro' | 'oscuro' }

function esPreferencias(valor: unknown): valor is Preferencias {
  if (typeof valor !== 'object' || valor === null) return false
  const registro = valor as Record<string, unknown>
  return typeof registro.nombre === 'string' && (registro.tema === 'claro' || registro.tema === 'oscuro')
}

function leerPreferencias(): Preferencias {
  try {
    const texto = localStorage.getItem(CLAVE)
    if (texto === null) return { nombre: '', tema: 'claro' }
    const valor: unknown = JSON.parse(texto)
    return esPreferencias(valor) ? valor : { nombre: '', tema: 'claro' }
  } catch {
    return { nombre: '', tema: 'claro' }
  }
}

export function B2Persistencia() {
  const [preferencias, setPreferencias] = useState<Preferencias>(leerPreferencias)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(preferencias))
    } catch (error) {
      console.warn('No se pudo guardar en localStorage.', error)
    }
  }, [preferencias])

  function limpiar() {
    localStorage.removeItem(CLAVE)
    setPreferencias({ nombre: '', tema: 'claro' })
  }

  return <article className="demo-card">
    <h3>Preferencias guardadas automáticamente</h3>
    <div className="field-grid">
      <label className="field">Tu nombre<input value={preferencias.nombre} onChange={(event) => setPreferencias((p) => ({ ...p, nombre: event.target.value }))} placeholder="Escribe un nombre" /></label>
      <label className="field">Tema<select value={preferencias.tema} onChange={(event) => setPreferencias((p) => ({ ...p, tema: event.target.value as Preferencias['tema'] }))}><option value="claro">Claro</option><option value="oscuro">Oscuro</option></select></label>
    </div>
    <p className="status">Hola{preferencias.nombre ? `, ${preferencias.nombre}` : ''}. Tema {preferencias.tema}. Se guarda automáticamente en este navegador.</p>
    <button className="button button-danger" onClick={limpiar}>Borrar preferencias</button>
    <p className="muted">Los datos leídos de JSON empiezan como <code>unknown</code> y se validan antes de usarlos.</p>
  </article>
}
