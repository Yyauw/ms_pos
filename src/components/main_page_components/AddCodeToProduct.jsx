import { useEffect, useState } from "react";

export default function AddCodeToProduct({
  product,
  resetCart,
  listening,
  setListening,
}) {
  const [buffer, setBuffer] = useState("");
  const [inactivityTimer, setInactivityTimer] = useState(null);

  const handleAddCode = (code) => {
    console.log("Código agregado:", code);
    console.log("Producto:", product);
    fetch("http://192.168.50.182:3000/agregar_codigo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        product: product.id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((result) => {
        console.log("Respuesta del servidor:", result);
        resetCart(); // Resetea el carrito después de agregar el código
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
      });
  };

  useEffect(() => {
    if (!listening) return;

    let timeout;

    let resetInactivityTimer;
    resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      const newTimer = setTimeout(() => {
        console.log("Inactividad detectada. Deteniendo escucha...");
        setListening(false);
        setBuffer("");
      }, 5000); // 5 segundos sin actividad
      setInactivityTimer(newTimer);
    };
    resetInactivityTimer();

    const handleKeyDown = (e) => {
      clearTimeout(timeout);
      clearTimeout(resetInactivityTimer);
      // Si es Enter, se asume que el código ha terminado
      if (e.key === "Enter") {
        if (buffer.length > 0) {
          handleAddCode(buffer);
          setBuffer("");
          setListening(false);
          return;
        }
        setListening(false);
        return;
      }

      // Agrega el carácter al buffer
      setBuffer((prev) => prev + e.key);

      // Reinicia el buffer si no se completa en 100ms (típico delay de scanner)
      timeout = setTimeout(() => setBuffer(""), 100);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeout);
      clearTimeout(resetInactivityTimer);
    };
  }, [listening, buffer]);

  return null; // Este componente no renderiza nada
}
