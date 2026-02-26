import { useState } from "react";

export const TablaIngresos = ({
  ingresosOrdenados,
  eliminarIngreso,
  setVentanaEdicionIngresos,
  setIngresoSeleccionado,
  gastosOrdenados,
}) => {
  const [modalEliminarIngreso, setModalEliminarIngreso] = useState(false);
  const [ingresoAEliminar, setIngresoAEliminar] = useState(null);

  const totalIngresos = ingresosOrdenados.reduce(
    (acum, { ingreso }) => acum + Number(ingreso),
    0,
  );

  const editarIngreso = (ingreso) => {
    setIngresoSeleccionado(ingreso);
    setVentanaEdicionIngresos(true);
  };

  const abrirModalEliminarIngreso = (ingreso) => {
    setIngresoAEliminar(ingreso);
    setModalEliminarIngreso(true);
  };

  const titularXGasto = gastosOrdenados
    .filter((g) => g.titular !== "propio")
    .reduce((acc, g) => {
      if (!acc[g.nombreTitular.trim()]) {
        acc[g.nombreTitular.trim()] = 0;
      }
      acc[g.nombreTitular.trim()] += g.cantidad;
      return acc;
    }, {});

  const totalAjenos = gastosOrdenados
    .filter((g) => g.titular !== "propio")
    .reduce((acc, g) => acc + Number(g.cantidad), 0);

  const ingresoEstimado = totalIngresos + totalAjenos;

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">INGRESO ESTIMADO</h2>
        <span className="badge bg-success-subtle text-success px-3 py-2">
          <span className="fw-semibold">Total:</span>{" "}
          <span className="fw-bold fs-4">
            ${Number(ingresoEstimado.toFixed(1)).toLocaleString("es-MX")}
          </span>
        </span>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">INGRESOS</h5>
        <span className="badge bg-success-subtle text-success">
          Total: ${Number(totalIngresos.toFixed(1)).toLocaleString("es-MX")}
        </span>
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-bordered align-middle mb-5">
          <thead className="table-light text-center">
            <tr>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th className="text-end">Cantidad</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {ingresosOrdenados.map((ingreso) => (
              <tr key={ingreso.id} className="text-center align-middle">
                <td className="fw-semibold">
                  {valoresBienEscritos(ingreso.descripcionIngreso)}
                </td>

                <td>{ingreso.fechaIngreso}</td>

                <td>
                  <span
                    className={`badge ${
                      ingreso.tipoIngreso === "proyectado"
                        ? "bg-secondary-subtle text-dark"
                        : "bg-success-subtle text-dark"
                    }`}
                  >
                    {valoresBienEscritos(ingreso.tipoIngreso)}
                  </span>
                </td>

                <td className="fw-semibold text-success text-end">
                  ${Number(ingreso.ingreso.toFixed(1)).toLocaleString("es-MX")}
                </td>

                <td>
                  <button
                    className="btn btn-outline-danger btn-sm me-2"
                    onClick={() => abrirModalEliminarIngreso(ingreso)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => editarIngreso(ingreso)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                </td>
              </tr>
            ))}

            {ingresosOrdenados.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted py-3">
                  Aún no hay ingresos
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">CUENTAS POR COBRAR</h5>
          <span className="badge bg-success-subtle text-success">
            Total: ${Number(totalAjenos.toFixed(1)).toLocaleString("es-MX")}
          </span>
        </div>

        <table className="table table-sm table-bordered align-middle">
          <thead className="table-light text-center">
            <tr>
              <th>A nombre de</th>
              <th className="text-end">Cantidad</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(titularXGasto).map(([nombre, total]) => (
              <tr key={nombre}>
                <td className="fw-semibold text-center">
                  {valoresBienEscritos(nombre)}
                </td>
                <td className="text-end text-success fw-semibold">
                  ${Number(total.toFixed(1)).toLocaleString("es-MX")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalEliminarIngreso && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow rounded-4">
                <div className="modal-header bg-danger text-white">
                  <h5 className="modal-title fw-bold">Confirmar eliminación</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setModalEliminarIngreso(false)}
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
                    onClick={() => setModalEliminarIngreso(false)}
                  >
                    Cancelar
                  </button>

                  <button
                    className="btn btn-danger px-4 rounded-pill"
                    onClick={() => {
                      eliminarIngreso(ingresoAEliminar.id);
                      setModalEliminarIngreso(false);
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
      )}
    </>
  );
};
