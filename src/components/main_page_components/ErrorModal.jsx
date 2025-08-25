export default function ErrorModal() {
  return (
    <>
      <dialog id="error_modal" className="modal">
        <div className="modal-box ">
          <h3 className="font-bold text-2xl text-red-500">ERROR!</h3>
          <p className="py-4">Ah ocurrido un error.</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-xl text-2xl font-bold btn-error">
                Cerrar
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
