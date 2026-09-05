export const TablaIngresos = ({
  ingresosOrdenados,
  setVentanaEdicionIngresos,
  setIngresoSeleccionado,
  setVentanaEliminarIngreso,
  setIngresoAEliminar,
}) => {
  const seleccionarIngresoAEditar = (ingreso) => {
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
        <h2 className="mb-0">INGRESOS</h2>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">INGRESOS</h5>
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
              <tr key={ingreso._id} className="text-center align-middle">
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
                  ${Number(ingreso.ingreso).toFixed(2)}
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
                    onClick={() => seleccionarIngresoAEditar(ingreso)}
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
      </div>
    </>
  );
};
