import { useState } from 'react'

export function A1Contador() {
  const [cuenta, setCuenta] = useState(0)

  function manejarSumarTresOriginal() {
    setCuenta(cuenta + 1)
    setCuenta(cuenta + 1)
    setCuenta(cuenta + 1)
    console.log('Consola:', cuenta)
  }

  function manejarDuplicar() {
    setCuenta(cuenta + 1)
    setCuenta((anterior) => anterior * 2)
  }

  function manejarSumarTresCorrecto() {
    setCuenta((anterior) => anterior + 1)
    setCuenta((anterior) => anterior + 1)
    setCuenta((anterior) => anterior + 1)
  }

  return (
    <div className="demo-stack">
      <article className="demo-card">
        <h3>Prueba el manejador original</h3>
        <p className="muted">Abre la consola y observa el número del render anterior.</p>
        <p className="big-number">{cuenta}</p>
        <div className="button-row">
          <button className="button button-primary" onClick={manejarSumarTresOriginal}>Sumar 3 (original)</button>
          <button className="button" onClick={manejarDuplicar}>Duplicar</button>
          <button className="button button-soft" onClick={manejarSumarTresCorrecto}>Sumar 3 (corregido)</button>
          <button className="button button-danger" onClick={() => setCuenta(0)}>Volver a 0</button>
        </div>
      </article>
    </div>
  )
}
