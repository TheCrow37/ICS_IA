import { useEffect, useState } from 'react'

interface RelojProps { zonaHoraria?: string }

function Reloj({ zonaHoraria = 'Europe/Madrid' }: RelojProps) {
  const [ahora, setAhora] = useState(() => new Date())

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      console.log('tic', zonaHoraria)
      setAhora(new Date())
    }, 1000)
    return () => window.clearInterval(intervalo)
  }, [zonaHoraria])

  return <div className="clock-face"><span>{zonaHoraria}</span><strong>{ahora.toLocaleTimeString('es-ES', { timeZone: zonaHoraria })}</strong></div>
}

export function B1Relojes() {
  const [mostrar, setMostrar] = useState(true)
  return <div className="demo-stack">
    <article className="demo-card">
      <h3>Dos zonas horarias</h3>
      <label className="button-row"><input type="checkbox" checked={mostrar} onChange={(event) => setMostrar(event.target.checked)} /> Mostrar los relojes</label>
      {mostrar ? <div className="clock-grid" style={{ marginTop: 14 }}><Reloj zonaHoraria="Europe/Madrid" /><Reloj zonaHoraria="America/Mexico_City" /></div> : <p className="muted">Relojes ocultos. Comprueba que los «tic» han parado en la consola.</p>}
    </article>
    <p className="muted">En desarrollo, StrictMode monta, limpia y vuelve a montar los efectos para detectar limpiezas ausentes. Cada reloj limpia su propio intervalo.</p>
  </div>
}
