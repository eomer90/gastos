import { useState } from "react";

export const TablaIngresos = ({
  ingresosOrdenados,
  setVentanaEdicionIngresos,
  setIngresoSeleccionado,
  gastosOrdenados,
  setVentanaEliminarIngreso,
  setIngresoAEliminar,
}) => {
  const totalIngresos = ingresosOrdenados.reduce(
    (acum, { ingreso }) => acum + Number(ingreso),
    0,
  );

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

  const editarIngreso = (ingreso) => {
    setIngresoSeleccionado(ingreso);
    setVentanaEdicionIngresos(true);
  };

  const abrirModalEliminarIngreso = (ingreso) => {
    setIngresoAEliminar(ingreso);
    setVentanaEliminarIngreso(true);
  };

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
            ${Number(ingresoEstimado.toFixed(2)).toLocaleString("es-MX")}
          </span>
        </span>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">INGRESOS</h5>
        <span className="badge bg-success-subtle text-success">
          Total: ${Number(totalIngresos.toFixed(2)).toLocaleString("es-MX")}
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
                  ${Number(ingreso.ingreso.toFixed(2)).toLocaleString("es-MX")}
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
            Total: ${Number(totalAjenos.toFixed(2)).toLocaleString("es-MX")}
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
                  ${Number(total.toFixed(2)).toLocaleString("es-MX")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
