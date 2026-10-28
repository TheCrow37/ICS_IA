import { useState } from "react";

export default function InterruptorLuz() {
  const [encendida, setEncendida] = useState<boolean>(false);

  const alternar = (): void => setEncendida(!encendida);

  return (
    <section>
      <h2>Ejercicio 1. Interruptor de luz</h2>
      <div
        style={{
          padding: "2rem",
          borderRadius: "8px",
          marginBottom: "1rem",
          textAlign: "center",
          backgroundColor: encendida ? "#facc15" : "#374151",
          color: encendida ? "#1f2937" : "#f9fafb",
        }}
      >
        La luz está {encendida ? "encendida" : "apagada"}
      </div>
      <button onClick={alternar}>{encendida ? "Apagar" : "Encender"}</button>
    </section>
  );
}
