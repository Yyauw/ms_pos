import { useEffect, useState, useRef } from "react";

// const productos = [
//   {
//     nombre: "awa",
//     codigos: ["123456", "A001", "000123456", "7451081810294"],
//   },
//   {
//     nombre: "Producto B",
//     codigos: ["7891011", "B002"],
//   },
//   {
//     nombre: "Producto C",
//     codigos: ["333444", "C003", "000333444"],
//   },
// ];

export default function CodeListener({ addToCart, categories }) {
  const [codigoActual, setCodigoActual] = useState("");
  const [productoEncontrado, setProductoEncontrado] = useState(null);
  const buffer = useRef("");

  useEffect(() => {
    const handleKeyDown = async (e) => {
      console.log("accion activada");
      if (e.key === "Enter") {
        const codigo = buffer.current.trim();
        await buscarProducto(codigo);
        buffer.current = "";
      } else {
        buffer.current += e.key;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [addToCart, categories]);

  const buscarProducto = async (codigo) => {
    setCodigoActual(codigo);
    for (const category of categories) {
      for (const product of category.productos) {
        if (product.codigos.includes(codigo)) {
          await addToCart({
            id: product.id_producto,
            name: product.nombre,
            price: product.precio_venta,
          });
          return;
        }
      }
    }
  };
}
