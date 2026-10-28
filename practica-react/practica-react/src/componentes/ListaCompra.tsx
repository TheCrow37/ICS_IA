import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface Producto {
  id: number;
  nombre: string;
  comprado: boolean;
}

export default function ListaCompra() {
  const [lista, setLista] = useState<Producto[]>([]);
  const [texto, setTexto] = useState<string>("");

  const alCambiarTexto = (evento: ChangeEvent<HTMLInputElement>): void =>
    setTexto(evento.target.value);

  const añadir = (evento: FormEvent<HTMLFormElement>): void => {
    evento.preventDefault();
    const nombre = texto.trim();
    if (nombre === "") return;
    const nuevo: Producto = { id: Date.now(), nombre, comprado: false };
    setLista([...lista, nuevo]);
    setTexto("");
  };

  const alternarComprado = (id: number): void =>
    setLista(
      lista.map((producto) =>
        producto.id === id ? { ...producto, comprado: !producto.comprado } : producto
      )
    );

  const quitar = (id: number): void =>
    setLista(lista.filter((producto) => producto.id !== id));

  // Dato derivado
  const pendientes = lista.filter((producto) => !producto.comprado).length;

  return (
    <section>
      <h2>Ejercicio 3. Lista de la compra</h2>
      <form onSubmit={añadir} style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={texto}
          onChange={alCambiarTexto}
          placeholder="Producto"
        />
        <button type="submit">Añadir</button>
      </form>
      <p>Pendientes: {pendientes}</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {lista.map((producto) => (
          <li key={producto.id} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={producto.comprado}
              onChange={() => alternarComprado(producto.id)}
              aria-label={`Marcar ${producto.nombre} como comprado`}
            />
            <span style={{ textDecoration: producto.comprado ? "line-through" : "none" }}>
              {producto.nombre}
            </span>
            <button onClick={() => quitar(producto.id)}>Quitar</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
