type ResumenNotasProps = {
  media: number;
  aprobados: number;
  total: number;
};

export function ResumenNotas({ media, aprobados, total }: ResumenNotasProps) {
  const estado = total === 0 ? "" : aprobados === total ? " resumen--bien" : " resumen--aviso";

  return (
    <section className={`resumen${estado}`} aria-live="polite">
      <h2>Resumen</h2>
      <p>
        Nota media: <strong>{media.toFixed(2)}</strong>
      </p>
      <p>Módulos aprobados: {aprobados} de {total}</p>
    </section>
  );
}

