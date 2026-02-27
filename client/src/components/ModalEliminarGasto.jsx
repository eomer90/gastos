export const ModalEliminarGasto = ({
  gastoAEliminar,
  setVentanaEliminarGasto,
  eliminarGasto,
}) => {
  const existePagoMeses = gastoAEliminar.categoria === "pagoAMeses";

  const valoresBienEscritos = (nombre) => {
    const valores = {
      pagoAMeses: "Pago a Meses",
    };

    return (
      valores[nombre] || nombre.slice(0, 1).toUpperCase() + nombre.slice(1)
    );
  };

  return (
    <>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow rounded-4">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title fw-bold">Confirmar eliminación</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setVentanaEliminarGasto(false)}
              ></button>
            </div>

            <div className="modal-body text-center py-3">
              <span className="fs-5 mb-2">
                {existePagoMeses
                  ? "¿Deseas eliminar solo el pago de este mes o toda la serie de pagos?"
                  : "¿Seguro que deseas eliminar este gasto?"}
              </span>
              <p className="fw-bold text-danger">
                {valoresBienEscritos(gastoAEliminar.descripcion)}
                {" - "}
                {gastoAEliminar.fecha}
              </p>
            </div>

            <div className="modal-footer border-0 justify-content-center pb-3">
              <button
                className="btn btn-outline-secondary px-4"
                onClick={() => setVentanaEliminarGasto(false)}
              >
                Cancelar
              </button>
              {existePagoMeses ? (
                <>
                  <button
                    className="btn btn-danger px-4 rounded-pill"
                    onClick={() => {
                      eliminarGasto(gastoAEliminar.id);
                      setVentanaEliminarGasto(false);
                    }}
                  >
                    Solo el pago del mes
                  </button>
                  <button
                    className="btn btn-danger px-4 rounded-pill"
                    onClick={() => {
                      eliminarGasto(gastoAEliminar.idCadena, true);
                      setVentanaEliminarGasto(false);
                    }}
                  >
                    Toda la serie de pagos
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-danger px-4 rounded-pill"
                  onClick={() => {
                    eliminarGasto(gastoAEliminar.id);
                    setVentanaEliminarGasto(false);
                  }}
                >
                  Sí, eliminar
                </button>
              )}

              {/* 
              <button
                className="btn btn-danger px-4 rounded-pill"
                onClick={() => {
                  eliminarIngreso(ingresoAEliminar.id);
                  setModalEliminarIngreso(false);
                }}
              >
                Sí, eliminar
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};
