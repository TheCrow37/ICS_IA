import { useReducer } from 'react'

interface Producto { id: number; nombre: string; precio: number }
interface LineaCarrito { producto: Producto; cantidad: number }
type Accion =
  | { tipo: 'anadir'; producto: Producto }
  | { tipo: 'quitar'; idProducto: number }
  | { tipo: 'cambiarCantidad'; idProducto: number; cantidad: number }
  | { tipo: 'vaciar' }
  | { tipo: 'deshacer' }
interface EstadoCarrito { lineas: LineaCarrito[]; historial: LineaCarrito[][] }

const catalogo: Producto[] = [
  { id: 1, nombre: 'Cuaderno A5', precio: 3.5 },
  { id: 2, nombre: 'Bolígrafo azul', precio: 1.25 },
  { id: 3, nombre: 'Rotuladores (pack)', precio: 6.9 },
  { id: 4, nombre: 'Carpeta', precio: 4.2 },
]
const euro = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })
const inicial: EstadoCarrito = { lineas: [], historial: [] }

function reducer(estado: EstadoCarrito, accion: Accion): EstadoCarrito {
  if (accion.tipo === 'deshacer') {
    const anterior = estado.historial.at(-1)
    if (!anterior) return estado
    return { lineas: anterior, historial: estado.historial.slice(0, -1) }
  }

  let lineas: LineaCarrito[]
  switch (accion.tipo) {
    case 'anadir': {
      const existe = estado.lineas.some((linea) => linea.producto.id === accion.producto.id)
      lineas = existe
        ? estado.lineas.map((linea) => linea.producto.id === accion.producto.id ? { ...linea, cantidad: linea.cantidad + 1 } : linea)
        : [...estado.lineas, { producto: accion.producto, cantidad: 1 }]
      break
    }
    case 'quitar':
      lineas = estado.lineas.filter((linea) => linea.producto.id !== accion.idProducto)
      break
    case 'cambiarCantidad':
      lineas = accion.cantidad <= 0
        ? estado.lineas.filter((linea) => linea.producto.id !== accion.idProducto)
        : estado.lineas.map((linea) => linea.producto.id === accion.idProducto ? { ...linea, cantidad: accion.cantidad } : linea)
      break
    case 'vaciar':
      lineas = []
      break
  }

  return { lineas, historial: [...estado.historial, estado.lineas] }
}

export function A2Carrito() {
  const [estado, dispatch] = useReducer(reducer, inicial)
  const articulos = estado.lineas.reduce((total, linea) => total + linea.cantidad, 0)
  const total = estado.lineas.reduce((suma, linea) => suma + linea.producto.precio * linea.cantidad, 0)

  return (
    <div className="demo-stack">
      <div className="number-grid">
        <div className="stat-box"><span className="stat-label">Artículos</span><span className="stat-value">{articulos}</span></div>
        <div className="stat-box"><span className="stat-label">Total</span><span className="stat-value">{euro.format(total)}</span></div>
        <div className="stat-box"><span className="stat-label">Acciones para deshacer</span><span className="stat-value">{estado.historial.length}</span></div>
      </div>
      <article className="demo-card">
        <h3>Catálogo</h3>
        <ul className="row-list">
          {catalogo.map((producto) => <li className="row-item" key={producto.id}>
            <span>{producto.nombre} · {euro.format(producto.precio)}</span>
            <button className="small-button" onClick={() => dispatch({ tipo: 'anadir', producto })}>Añadir</button>
          </li>)}
        </ul>
      </article>
      <article className="demo-card">
        <div className="button-row" style={{ justifyContent: 'space-between' }}><h3>Tu carrito</h3><button className="button" disabled={!estado.historial.length} onClick={() => dispatch({ tipo: 'deshacer' })}>Deshacer</button></div>
        {estado.lineas.length === 0 ? <p className="muted">El carrito está vacío.</p> : <ul className="row-list">
          {estado.lineas.map(({ producto, cantidad }) => <li className="row-item" key={producto.id}>
            <span>{producto.nombre} × {cantidad} · {euro.format(producto.precio * cantidad)}</span>
            <span className="row-actions">
              <button className="small-button" aria-label={`Restar ${producto.nombre}`} onClick={() => dispatch({ tipo: 'cambiarCantidad', idProducto: producto.id, cantidad: cantidad - 1 })}>−</button>
              <button className="small-button" aria-label={`Sumar ${producto.nombre}`} onClick={() => dispatch({ tipo: 'cambiarCantidad', idProducto: producto.id, cantidad: cantidad + 1 })}>+</button>
              <button className="small-button" onClick={() => dispatch({ tipo: 'quitar', idProducto: producto.id })}>Quitar</button>
            </span>
          </li>)}
        </ul>}
        <div className="button-row" style={{ marginTop: 12 }}><button className="button button-danger" onClick={() => dispatch({ tipo: 'vaciar' })}>Vaciar</button></div>
      </article>
      <p className="muted">El reductor es puro: no genera ids, no modifica arrays y deriva los totales durante el render.</p>
    </div>
  )
}
