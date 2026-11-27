import { useEffect, useRef, useState } from 'react'

const formatoDos = new Intl.NumberFormat('es-ES', { minimumIntegerDigits: 2, useGrouping: false })
function formatoTiempo(decimas: number) {
  const segundosTotales = Math.floor(decimas / 10)
  const minutos = Math.floor(segundosTotales / 60)
  const segundos = segundosTotales % 60
  const decima = decimas % 10
  return `${formatoDos.format(minutos)}:${formatoDos.format(segundos)}.${decima}`
}

export function C2Cronometro() {
  const [decimas, setDecimas] = useState(0)
  const [vueltas, setVueltas] = useState<number[]>([])
  const [enMarcha, setEnMarcha] = useState(false)
  const intervaloRef = useRef<number | null>(null)
  const inicioRef = useRef<number | null>(null)
  const tiempoAcumuladoRef = useRef(0)

  function pararTemporizador() {
    if (intervaloRef.current !== null) {
      window.clearInterval(intervaloRef.current)
      intervaloRef.current = null
    }
  }

  function iniciar() {
    if (intervaloRef.current !== null) return
    inicioRef.current = Date.now()
    setEnMarcha(true)
    intervaloRef.current = window.setInterval(() => {
      if (inicioRef.current !== null) {
        setDecimas(Math.floor((tiempoAcumuladoRef.current + Date.now() - inicioRef.current) / 100))
      }
    }, 50)
  }

  function parar() {
    if (inicioRef.current !== null) {
      tiempoAcumuladoRef.current += Date.now() - inicioRef.current
      inicioRef.current = null
    }
    pararTemporizador()
    setDecimas(Math.floor(tiempoAcumuladoRef.current / 100))
    setEnMarcha(false)
  }

  function reiniciar() {
    pararTemporizador()
    inicioRef.current = null
    tiempoAcumuladoRef.current = 0
    setDecimas(0)
    setVueltas([])
    setEnMarcha(false)
  }

  function guardarVuelta() {
    setVueltas((anteriores) => [...anteriores, decimas])
  }

  useEffect(() => () => {
    if (intervaloRef.current !== null) window.clearInterval(intervaloRef.current)
  }, [])

  return <div className="demo-stack">
    <article className="demo-card">
      <h3>Cronómetro</h3>
      <p className="big-number" aria-live="off" style={{ fontVariantNumeric: 'tabular-nums' }}>{formatoTiempo(decimas)}</p>
      <div className="button-row">
        <button className="button button-primary" onClick={iniciar} disabled={enMarcha}>Iniciar</button>
        <button className="button" onClick={parar} disabled={!enMarcha}>Parar</button>
        <button className="button button-soft" onClick={guardarVuelta} disabled={!enMarcha}>Vuelta</button>
        <button className="button button-danger" onClick={reiniciar}>Reiniciar</button>
      </div>
    </article>
    <article className="demo-card"><h3>Vueltas ({vueltas.length})</h3>
      {vueltas.length === 0 ? <p className="muted">Inicia el cronómetro y registra una vuelta.</p> : <ol className="row-list">{vueltas.map((vuelta, indice) => <li className="row-item" key={`${indice}-${vuelta}`}><span>Vuelta {indice + 1}</span><strong>{formatoTiempo(vuelta)}</strong></li>)}</ol>}
    </article>
    <p className="muted">El id del intervalo y la hora de inicio viven en refs: cambian sin provocar renders. El tiempo se calcula con Date.now() para evitar acumular el retraso de cada tick.</p>
  </div>
}
