export default function ResponseDialog({
  change,
  subtotal,
  payment,
  resetCart,
}) {
  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Transaccion exitosa</h3>
          <p className="pt-4 text-2xl">
            Total Pagado: B/.{" "}
            {payment == 0 ? subtotal.toFixed(2) : payment.toFixed(2)}
          </p>
          <p className="mb-2 text-2xl">SubTotal: B/. {subtotal.toFixed(2)}</p>
          <p className="text-3xl font-bold border-t-2">
            Cambio: {change.toFixed(2)}
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-xl text-2xl font-bold btn-error"
              onClick={() => {
                resetCart();
                document.getElementById("my_modal_2").close();
                document.activeElement.blur(); // quita foco activo
                document.body.focus();
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
