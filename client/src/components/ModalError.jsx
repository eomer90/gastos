export const ModalError = ({ setVentanaError }) => {
  return (
    <>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow rounded-4">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title fw-bold">!Ups, algo salió mal!</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setVentanaError(false)}
              ></button>
            </div>

            <div className="modal-body text-center py-3">
              <p className="fs-5 mb-2">El ingreso no pudo ser guardado</p>
            </div>

            <div className="modal-footer border-0 justify-content-center pb-3">
              <button
                className="btn btn-outline-secondary px-4"
                onClick={() => setVentanaError(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};
