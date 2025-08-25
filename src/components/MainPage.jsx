import ListItem from "./main_page_components/ListItem";
import SquareItem from "./main_page_components/SquareItem";
import { useState, useEffect } from "react";
import DialogKeyboard from "./main_page_components/DialogKeyboard";
import ResponseDialog from "./main_page_components/ResponseDialog";
import ErrorModal from "./main_page_components/ErrorModal";
import CodeListener from "./main_page_components/CodeListener";
import { dummydata } from "./dummydata";
import AddCodeToProduct from "./main_page_components/AddCodeToProduct";

export default function MainPage() {
  // State to manage money input for the POS numeric keyboard
  const [moneyInput, setMoneyInput] = useState("0");
  const floatMoneyInput = parseFloat(moneyInput) || 0;
  // State to manage selected category, cart items, and active cart tab
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartItems2, setCartItems2] = useState([]);
  const [cartTab, setCartTab] = useState(1); // State to manage which cart is active
  const [quantity, setQuantity] = useState(1);
  const [change, setChange] = useState(0);
  const [products, setProducts] = useState(null);
  const [listening, setListening] = useState(false);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const subTotal2 = cartItems2.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleTabChange = (tab) => {
    setCartTab(tab);
    setSelectedCategory(null); // Reset selected category when changing tabs
    setQuantity(1); // Reset quantity when switching tabs
  };

  const handleAddToCart = (product) => {
    setQuantity(1); // Reset quantity to 1 when adding a new product
    console.log("Adding to cart:", product);
    console.log(cartItems);
    if (cartTab == 1) {
      // Check if the product already exists in cartItems
      const existingItem = cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        // If it exists, update the quantity
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
        return; // Exit early to avoid adding a new item
      }
      setCartItems((prevItems) => [
        ...prevItems,
        { ...product, quantity: quantity },
      ]);
    } else if (cartTab == 2) {
      // Check if the product already exists in cartItems2
      const existingItem = cartItems2.find((item) => item.id === product.id);
      if (existingItem) {
        // If it exists, update the quantity
        setCartItems2((prevItems) =>
          prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );

        return; // Exit early to avoid adding a new item
      }
      // Add new product to cartItems2
      setCartItems2((prevItems) => [
        ...prevItems,
        { ...product, quantity: quantity },
      ]);
    }
  };

  const handleRemoveFromCart = (product) => {
    cartTab == 1 &&
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== product.id)
      );
    cartTab == 2 &&
      setCartItems2((prevItems) =>
        prevItems.filter((item) => item.id !== product.id)
      );
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative quantities
    setQuantity(newQuantity);
  };

  const handleTransaction = () => {
    // Handle the transaction logic here
    // This could involve processing payment, updating inventory, etc.
    console.log("Transaction completed with amount:", floatMoneyInput);
    if (cartTab == 1) {
      if (floatMoneyInput === 0) {
        if (subTotal === 0) {
          document.getElementById("error_modal").showModal();
          return; // Exit if no money is provided and no items in cart
        }
        // if money input is 0, we assume no change is needed
        makeSell();
        setChange(0);
      } else {
        if (floatMoneyInput < subTotal && subTotal > 0) {
          document.getElementById("error_modal").showModal();
          return; // Exit if not enough money is provided
        }
        makeSell();
        setChange(floatMoneyInput - subTotal);
      }
      //logica
    }
    if (cartTab == 2) {
      if (floatMoneyInput === 0) {
        if (subTotal2 === 0) {
          document.getElementById("error_modal").showModal();
          return; // Exit if no money is provided and no items in cart
        }
        makeSell();
        // if money input is 0, we assume no change is needed
        setChange(0);
      } else {
        if (floatMoneyInput < subTotal2 && subTotal2 > 0) {
          document.getElementById("error_modal").showModal();
          return; // Exit if not enough money is provided
        }
        makeSell();
        setChange(floatMoneyInput - subTotal2);
      }
    }
    // Reset cart and money input after transaction
    document.getElementById("my_modal_1").close();
    document.getElementById("my_modal_2").showModal();
  };

  const resetCart = () => {
    cartTab == 1 && setCartItems([]);
    cartTab == 2 && setCartItems2([]);
    setMoneyInput("0");
    setQuantity(1);
    setChange(0);
  };

  const makeSell = async () => {
    // Function to handle the sell logic
    const data = [];
    if (cartTab == 1) {
      cartItems.forEach((item) => {
        data.push({
          id_producto: item.id,
          cantidad: item.quantity,
        });
      });
    }
    if (cartTab == 2) {
      cartItems2.forEach((item) => {
        data.push({
          id_producto: item.id,
          cantidad: item.quantity,
        });
      });
    }

    console.log("Datos a enviar:", data);

    try {
      const response = await fetch("http://192.168.50.182:3000/venta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const resultado = await response.json();
      console.log("Respuesta del servidor:", resultado);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    // Initialize products
    const fetchProducts = async () => {
      const response = await fetch(
        "http://192.168.50.182:3000/productos" // Replace with your API endpoint
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const products = await response.json();
      console.log(products);
      setProducts(products);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <ErrorModal />
      <ResponseDialog
        change={change}
        subtotal={cartTab == 1 ? subTotal : subTotal2}
        payment={floatMoneyInput}
        resetCart={resetCart}
      />
      <DialogKeyboard
        subTotal={subTotal}
        subTotal2={subTotal2}
        floatMoneyInput={floatMoneyInput}
        moneyInput={moneyInput}
        setMoneyInput={setMoneyInput}
        cartTab={cartTab}
        handleTransaction={handleTransaction}
      />
      <div className="w-full h-screen grid grid-cols-8">
        {/* Cart Section */}
        <section className="col-span-3 bg-slate-100">
          <h1 className="text-center text-3xl font-bold text-gray-700">
            MS POS
          </h1>
          <div className="overflow-y-scroll h-[80vh] p-3">
            {cartTab == 1 &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <ListItem
                  key={item.id}
                  item={item}
                  onRemove={() => handleRemoveFromCart(item)}
                />
              ))}
            {cartTab == 2 &&
              cartItems2.length > 0 &&
              cartItems2.map((item) => (
                <ListItem
                  key={item.id}
                  item={item}
                  onRemove={() => handleRemoveFromCart(item)}
                />
              ))}
            {cartTab == 1 && cartItems.length === 0 && (
              <p className="text-center text-gray-700">
                No hay productos en carrito 1
              </p>
            )}
            {cartTab == 2 && cartItems2.length === 0 && (
              <p className="text-center text-gray-700">
                No hay productos en carrito 2
              </p>
            )}
          </div>
          <div className="border-t-2 border-gray-700">
            <div className="p-2 flex items-center">
              <h1 className="text-2xl font-bold text-gray-700">Subtotal:</h1>
              <p className="ms-auto text-2xl font-bold text-gray-700">
                B/. {cartTab == 1 ? subTotal.toFixed(2) : subTotal2.toFixed(2)}
              </p>
            </div>
            <div className="grid grid-cols-2 p-1">
              <button
                className="btn btn-lg btn-success text-white text-2xl font-bold"
                onClick={(e) => {
                  document.getElementById("my_modal_1").showModal();
                  setTimeout(() => e.target.blur(), 0);
                }}
              >
                Cobrar
              </button>
              <div className="flex items-center rounded-lg bg-white w-50 mx-auto">
                <button
                  className="btn btn-lg btn-error text-4xl font-bold"
                  onClick={(e) => {
                    handleQuantityChange(quantity - 1);
                    e.target.blur();
                  }}
                >
                  -
                </button>
                <p className="text-4xl font-bold mx-auto text-gray-700">
                  {quantity}
                </p>
                <button
                  className="btn btn-lg btn-info text-4xl font-bold"
                  onClick={(e) => {
                    handleQuantityChange(quantity + 1);
                    e.target.blur();
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Product Section */}
        <section className="col-span-5 bg-blue-500 flex flex-col">
          <div className="grid grid-cols-3 gap-2 p-4">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleTabChange(1);
              }}
              style={{ border: cartTab == 1 && "1px solid white" }}
            >
              Tab 1
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                handleTabChange(2);
              }}
              style={{ border: cartTab == 2 && "1px solid white" }}
            >
              Tab 2
            </button>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                setListening(true);
                e.target.blur();
              }}
            >
              Agregar Codigo
            </button>
          </div>
          <div className="rounded-xl m-2 h-[85vh] overflow-y-scroll grid grid-cols-5 gap-2 p-1 auto-rows-min">
            {/* DESPLIEGA CATEGORIAS */}
            {!selectedCategory &&
              products?.map((category) => (
                <SquareItem
                  key={category.id_categoria}
                  item={{ name: category.nombre }}
                  onClick={() => setSelectedCategory(category)}
                />
              ))}
            {products && !listening && (
              <CodeListener addToCart={handleAddToCart} categories={products} />
            )}

            {/* BOTON DE VOLVER */}
            {selectedCategory && (
              <SquareItem
                item={{ name: "Volver" }}
                onClick={() => setSelectedCategory(null)}
                bgColor="bg-red-300 "
              />
            )}
            {/* DESPLIEGA PRODUCTOS DE LA CATEGORIA SELECCIONADA */}
            {selectedCategory &&
              selectedCategory.productos.map((product) => (
                <SquareItem
                  key={product.id_producto}
                  item={{
                    name: product.nombre,
                    price: product.precio_venta,
                    code: product.codigos,
                  }}
                  onClick={() =>
                    handleAddToCart({
                      id: product.id_producto,
                      name: product.nombre,
                      price: product.precio_venta,
                    })
                  }
                />
              ))}
          </div>
        </section>
      </div>
      {cartItems.length > 0 && (
        <AddCodeToProduct
          listening={listening}
          setListening={setListening}
          product={cartItems[0]}
          resetCart={resetCart}
        />
      )}
    </>
  );
}
