import PosNumericKeyboard from "../PosNumericKeyboard";

export default function DialogKeyboard({
  subTotal,
  subTotal2,
  floatMoneyInput,
  moneyInput,
  setMoneyInput,
  cartTab,
  handleTransaction,
}) {
  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box  w-11/12 max-w-5xl">
          <h3 className="font-bold text-2xl text-center">
            Cobrar carrito {cartTab}
          </h3>
          <p className="py-4 text-2xl">
            Monto a cobrar: B/.
            {cartTab == 1 ? subTotal.toFixed(2) : subTotal2.toFixed(2)}
          </p>
          <p className="text-center text-2xl">Valor a pagar</p>
          <h3 className="text-center text-2xl">{floatMoneyInput.toFixed(2)}</h3>
          <PosNumericKeyboard
            moneyInput={moneyInput}
            setMoneyInput={setMoneyInput}
          />
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              className="btn btn-xl text-3xl btn-success w-full h-full py-2"
              onClick={handleTransaction}
            >
              Confirmar
            </button>

            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-xl text-3xl btn-error w-full h-full py-2"
              onClick={(e) => {
                setMoneyInput("0");
                document.getElementById("my_modal_1").close();
                document.activeElement.blur(); // quita foco activo
                document.body.focus(); // opcional: enfoca algo neutro
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
