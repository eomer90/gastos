import { useState } from "react";

export const TablaCategoria = ({
  gastosOrdenados,
  eliminarGasto,
  setVentanaEdicion,
  setGastoSeleccionado,
}) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  // const total = gastosOrdenados.reduce(
  //   (acum, { cantidad }) => acum + cantidad,
  //   0,
  // );

  const showPagoMeses = gastosOrdenados.some(
    (gasto) => gasto.categoria === "pago a meses",
  );

  const mostrarEstatus = gastosOrdenados.some((g) => g.estatus !== "");

  const gastosFiltradosXCategoria = gastosOrdenados.filter((gasto) => {
    if (categoriaSeleccionada === "") {
      return true;
    }
    return gasto.categoria === categoriaSeleccionada;
  });

  const totalFiltradoXCategoria = gastosFiltradosXCategoria.reduce(
    (acum, { cantidad }) => acum + cantidad,
    0,
  );

  const handleCategoriaChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };

  const columnasBase = 4;

  const columnasExtras = (showPagoMeses ? 1 : 0) + (mostrarEstatus ? 1 : 0);

  const totalColumnasAntesDeCantidad = columnasBase + columnasExtras;

  const editarGasto = (gasto) => {
    setGastoSeleccionado(gasto);
    setVentanaEdicion(true);
  };

  return (
    <>
      <div className="mb-3 col-4">
        <label className="form-label fw-bold">Filtro</label>
        <select className="form-select" onChange={handleCategoriaChange}>
          <option value="">Selecciona una categoría</option>
          <option value="fijo">Fijo</option>
          <option value="suscripcion">Suscripción</option>
          <option value="pago a meses">Pagos a meses</option>
          <option value="despensa">Alimentación y despensa</option>
          <option value="transporte">Transporte</option>
          <option value="variables">Variables</option>
        </select>
      </div>
      <table className="table table-sm table-bordered mb-5 align-middle">
        <thead>
          <tr className="text-center">
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Categoría</th>
            <th>Titular</th>
            {showPagoMeses && <th>Pago</th>}
            {mostrarEstatus && <th>Estatus</th>}
            <th>Cantidad</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {gastosFiltradosXCategoria.map((gasto) => (
            <tr className="text-center" key={gasto.id}>
              <td>{gasto.descripcion}</td>
              <td>{gasto.fecha}</td>
              <td>{gasto.categoria}</td>
              <td>{gasto.nombreTitular}</td>

              {showPagoMeses && (
                <td>
                  {gasto.numeroPago
                    ? `${gasto.numeroPago} de ${gasto.totalMeses}`
                    : "-"}
                </td>
              )}

              {mostrarEstatus && (
                <td>
                  <span
                    className={`${
                      gasto.estatus === "pendiente"
                        ? "badge bg-warning text-dark"
                        : "badge bg-success"
                    }`}
                  >
                    {gasto.estatus}
                  </span>
                </td>
              )}

              <td>${Number(gasto.cantidad).toLocaleString("es-MX")}</td>

              <td>
                <button
                  className="btn btn-outline-danger btn-sm me-2"
                  onClick={() => eliminarGasto(gasto.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => editarGasto(gasto)}
                >
                  <i className="bi bi-pencil"></i>
                </button>
              </td>
            </tr>
          ))}

          <tr className="text-center">
            <td colSpan={totalColumnasAntesDeCantidad} className="fw-bold">
              Total
            </td>
            <td className="fw-bold">
              ${Number(totalFiltradoXCategoria).toLocaleString("es-MX")}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
