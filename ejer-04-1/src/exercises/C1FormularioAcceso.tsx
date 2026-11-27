import { useEffect, useRef, useState, type FormEvent } from 'react'

export function C1FormularioAcceso() {
  const campoCorreo = useRef<HTMLInputElement>(null)
  const campoContrasena = useRef<HTMLInputElement>(null)
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mostrarContrasena, setMostrarContrasena] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [intento, setIntento] = useState(false)
  const errorCorreo = (correo.length > 0 || intento) && !correo.includes('@') ? 'El correo debe contener @.' : ''
  const errorContrasena = correo.includes('@') && (contrasena.length > 0 || intento) && contrasena.length < 8
    ? 'La contraseña necesita al menos 8 caracteres.'
    : ''

  useEffect(() => {
    campoCorreo.current?.focus()
  }, [])

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setEnviado(false)
    setIntento(true)
    if (!correo.includes('@')) {
      campoCorreo.current?.focus()
      return
    }
    if (contrasena.length < 8) {
      campoContrasena.current?.focus()
      return
    }
    setEnviado(true)
  }

  function vaciar() {
    setCorreo('')
    setContrasena('')
    setEnviado(false)
    setIntento(false)
    campoCorreo.current?.focus()
  }

  return <div className="demo-stack">
    <form className="demo-card" onSubmit={manejarEnvio} noValidate>
      <h3>Formulario de acceso</h3>
      <div className="demo-stack">
        <label className="field">Correo
          <input ref={campoCorreo} type="email" value={correo} onChange={(evento) => { setCorreo(evento.target.value); setEnviado(false) }} aria-invalid={Boolean(errorCorreo)} aria-describedby={errorCorreo ? 'error-correo' : undefined} />
        </label>
        {errorCorreo && <p className="status error" id="error-correo">{errorCorreo}</p>}
        <label className="field">Contraseña
          <input ref={campoContrasena} type={mostrarContrasena ? 'text' : 'password'} value={contrasena} onChange={(evento) => { setContrasena(evento.target.value); setEnviado(false) }} aria-invalid={Boolean(errorContrasena)} aria-describedby={errorContrasena ? 'error-contrasena' : undefined} />
        </label>
        {errorContrasena && <p className="status error" id="error-contrasena">{errorContrasena}</p>}
      </div>
      <div className="button-row" style={{ marginTop: 16 }}>
        <button className="button button-primary">Entrar</button>
        <button className="button" type="button" onClick={() => setMostrarContrasena((actual) => !actual)}>{mostrarContrasena ? 'Ocultar' : 'Mostrar'} contraseña</button>
        <button className="button" type="button" onClick={vaciar}>Vaciar</button>
      </div>
      {enviado && <p className="status success" role="status">Datos correctos. Sesión de demostración iniciada.</p>}
    </form>
    <p className="muted">El signo ?. hace que se llame a focus solo si la referencia ya apunta a un elemento.</p>
  </div>
}
