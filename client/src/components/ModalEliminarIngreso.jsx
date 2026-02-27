export const ModalEliminarIngreso = ({
  ingresoAEliminar,
  setVentanaEliminarIngreso,
  eliminarIngreso,
}) => {
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
                onClick={() => setVentanaEliminarIngreso(false)}
              ></button>
            </div>

            <div className="modal-body text-center py-3">
              <p className="fs-5 mb-2">
                ¿Seguro que deseas eliminar este ingreso?
              </p>
              <p className="fw-bold text-danger">
                {valoresBienEscritos(ingresoAEliminar.descripcionIngreso)}
                {" - "}
                {ingresoAEliminar.fechaIngreso}
              </p>
            </div>

            <div className="modal-footer border-0 justify-content-center pb-3">
              <button
                className="btn btn-outline-secondary px-4"
                onClick={() => setVentanaEliminarIngreso(false)}
              >
                Cancelar
              </button>

              <button
                className="btn btn-danger px-4 rounded-pill"
                onClick={() => {
                  eliminarIngreso(ingresoAEliminar.id);
                  setVentanaEliminarIngreso(false);
                }}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};
