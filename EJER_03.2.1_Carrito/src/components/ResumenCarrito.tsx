import type { ItemCarrito, Producto } from '../types'
import { formatoEuro } from '../money'

interface ResumenCarritoProps {
  carrito: ItemCarrito[]
  productos: Producto[]
}

const UMBRAL_ENVIO_GRATIS = 50
const COSTE_ENVIO = 4.95

export function ResumenCarrito({ carrito, productos }: ResumenCarritoProps) {
  const unidades = carrito.reduce((total, item) => total + item.cantidad, 0)
  const subtotal = carrito.reduce((total, item) => {
    const producto = productos.find((entry) => entry.id === item.idProducto)
    return total + (producto ? producto.precio * item.cantidad : 0)
  }, 0)
  const envio = subtotal >= UMBRAL_ENVIO_GRATIS ? 0 : COSTE_ENVIO
  const total = subtotal + envio
  const progreso = Math.min((subtotal / UMBRAL_ENVIO_GRATIS) * 100, 100)
  const restante = Math.max(UMBRAL_ENVIO_GRATIS - subtotal, 0)

  return (
    <section className="summary-card" aria-labelledby="summary-title">
      <h2 id="summary-title">Resumen</h2>
      {restante > 0 ? (
        <>
          <p className="shipping-message">Te faltan {formatoEuro.format(restante)} para el envío gratis</p>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Progreso para conseguir el envío gratis"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progreso)}
          >
            <div className="progress-fill" style={{ width: `${progreso}%` }} />
          </div>
        </>
      ) : (
        <p className="shipping-message shipping-free">¡Envío gratis!</p>
      )}
      <dl className="summary-lines">
        <div><dt>Unidades</dt><dd>{unidades}</dd></div>
        <div><dt>Subtotal</dt><dd>{formatoEuro.format(subtotal)}</dd></div>
        <div><dt>Envío</dt><dd>{envio === 0 ? 'Gratis' : formatoEuro.format(envio)}</dd></div>
        <div className="summary-total"><dt>Total</dt><dd>{formatoEuro.format(total)}</dd></div>
      </dl>
    </section>
  )
}
