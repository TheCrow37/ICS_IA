import InterruptorLuz from "./componentes/InterruptorLuz";
import ContadorLimitado from "./componentes/ContadorLimitado";
import ListaCompra from "./componentes/ListaCompra";
import BuscadorPeliculas from "./componentes/BuscadorPeliculas";

export default function App() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
      <InterruptorLuz />
      <ContadorLimitado />
      <ListaCompra />
      <BuscadorPeliculas />
    </main>
  );
}
