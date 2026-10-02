// ==========================================================
// Ejercicio 4 — Uniones, tipos literales y enums
// ==========================================================

enum Rol {
  ADMIN,
  EDITOR,
  LECTOR,
}

interface Usuario {
  nombre: string;
  rol: Rol;
  estado: 'activo' | 'inactivo' | 'pendiente'; // tipo unión de literales
}

// --- Función que describe a un usuario según su rol y su estado ---
function describirUsuario(usuario: Usuario): string {
  let descripcionRol: string;

  switch (usuario.rol) {
    case Rol.ADMIN:
      descripcionRol = 'tiene control total del sistema';
      break;
    case Rol.EDITOR:
      descripcionRol = 'puede crear y modificar contenido';
      break;
    case Rol.LECTOR:
      descripcionRol = 'solo puede consultar contenido';
      break;
    default:
      descripcionRol = 'tiene un rol desconocido';
  }

  let descripcionEstado: string;

  if (usuario.estado === 'activo') {
    descripcionEstado = 'y actualmente está conectado';
  } else if (usuario.estado === 'inactivo') {
    descripcionEstado = 'pero lleva tiempo sin conectarse';
  } else {
    // usuario.estado === 'pendiente'
    descripcionEstado = 'y aún no ha confirmado su cuenta';
  }

  return `${usuario.nombre} ${descripcionRol}, ${descripcionEstado}.`;
}

// --- Array de usuarios ---
const usuarios: Usuario[] = [
  { nombre: 'Sofía', rol: Rol.ADMIN, estado: 'activo' },
  { nombre: 'Diego', rol: Rol.EDITOR, estado: 'pendiente' },
  { nombre: 'Elena', rol: Rol.LECTOR, estado: 'inactivo' },

  // Descomenta este registro para ver el error del compilador:
  // {
  //   nombre: 'Javier',
  //   rol: Rol.LECTOR,
  //   estado: 'baneado', // ❌ Error: Type '"baneado"' is not assignable
  //                      //    to type '"activo" | "inactivo" | "pendiente"'.
  // },
];

usuarios.forEach((usuario) => console.log(describirUsuario(usuario)));
