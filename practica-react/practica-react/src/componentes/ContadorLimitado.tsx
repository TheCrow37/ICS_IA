import { useState } from "react";

const MINIMO = 0;
const MAXIMO = 10;

export default function ContadorLimitado() {
  const [cuenta, setCuenta] = useState<number>(MINIMO);

  const sumar = (): void => setCuenta((anterior) => anterior + 1);
  const restar = (): void => setCuenta((anterior) => anterior - 1);
  const reiniciar = (): void => setCuenta(MINIMO);

  // Datos derivados: no se guardan en estado
  const enMaximo = cuenta >= MAXIMO;
  const enMinimo = cuenta <= MINIMO;

  return (
    <section>
      <h2>Ejercicio 2. Contador con límites</h2>
      <p style={{ fontSize: "2rem", margin: "0.5rem 0" }}>{cuenta}</p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={restar} disabled={enMinimo}>Restar</button>
        <button onClick={sumar} disabled={enMaximo}>Sumar</button>
        <button onClick={reiniciar}>Reiniciar</button>
      </div>
      {enMaximo && <p role="status">Máximo alcanzado</p>}
    </section>
  );
}
