import { useState, type FormEvent } from 'react'

function ResumenNombre({ nombre, apellidos }: { nombre: string; apellidos: string }) {
  const nombreCompleto = `${nombre} ${apellidos}`.trim()
  return <p>{nombreCompleto || 'Escribe un nombre y apellidos.'}</p>
}

function FormularioEnvio() {
  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    // La acción ocurre por el evento del usuario, así no se repite al renderizar.
    setMensaje(`Enviado: ${nombre || '(sin nombre)'}`)
  }

  return <form className="inline-form" onSubmit={manejarEnvio}>
    <input aria-label="Nombre para enviar" value={nombre} onChange={(evento) => setNombre(evento.target.value)} placeholder="Nombre" />
    <button className="button button-primary">Enviar</button>
    {mensaje && <span className="status">{mensaje}</span>}
  </form>
}

function CampoComentario({ idAlumno }: { idAlumno: string }) {
  const [comentario, setComentario] = useState('')
  return <label className="field">Comentario para {idAlumno}<textarea value={comentario} onChange={(evento) => setComentario(evento.target.value)} /></label>
}

export function B4SinEfecto() {
  const [idAlumno, setIdAlumno] = useState('a1')
  return <div className="demo-stack">
    <article className="demo-card"><h3>1 · Valor derivado durante el render</h3><ResumenNombre nombre="Ada" apellidos="Lovelace" /><p className="muted">No hace falta estado sincronizado por un efecto.</p></article>
    <article className="demo-card"><h3>2 · Guardar al enviar</h3><FormularioEnvio /><p className="muted">La petición o acción se invoca desde el manejador de submit.</p></article>
    <article className="demo-card"><h3>3 · Reiniciar el campo al cambiar alumno</h3>
      <label className="field">Alumno<select value={idAlumno} onChange={(evento) => setIdAlumno(evento.target.value)}><option value="a1">Ada</option><option value="a2">Grace</option></select></label>
      <div style={{ marginTop: 12 }}><CampoComentario key={idAlumno} idAlumno={idAlumno} /></div>
      <p className="muted">`key={idAlumno}` crea la identidad adecuada del componente y reinicia su estado local.</p>
    </article>
  </div>
}
