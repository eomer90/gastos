import { useState } from "react";

export const TablaCategoria = ({
  gastosXCredito,
  eliminarGasto,
  setVentanaEdicion,
  setGastoSeleccionado,
}) => {
  const [campo, setCampo] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const gastosBusqueda = gastosXCredito.filter((g) => {
    const valor = g[campo];

    if (!busqueda) return true;
    if (!valor) return false;

    return valor.toString().toLowerCase().includes(busqueda.toLowerCase());
  });

  const mostrarInputBusqueda = () => {
    if (
      campo === "descripcion" ||
      campo === "categoria" ||
      campo === "nombreTitular"
    )
      return "text";
    if (campo === "cantidad") return "number";
    if (campo === "fecha") return "date";
  };

  const showPagoMeses = gastosXCredito.some(
    (gasto) => gasto.categoria === "pago a meses",
  );

  const totalFiltradoXCategoria = gastosBusqueda.reduce(
    (acum, { cantidad }) => acum + cantidad,
    0,
  );

  const handleChange = (e) => {
    setCampo(e.target.value);
  };

  const columnasBase = 4;

  const columnasExtras = showPagoMeses ? 1 : 0;

  const totalColumnasAntesDeCantidad = columnasBase + columnasExtras;

  const editarGasto = (gasto) => {
    setGastoSeleccionado(gasto);
    setVentanaEdicion(true);
  };

  return (
    <>
      <div className="pt-4 mb-4">
        <h2>{"Crédito".toUpperCase()}</h2>
      </div>
      <div className="mb-3 col-4">
        <label className="form-label fw-bold">Filtra por:</label>
        <select className="form-select" onChange={handleChange}>
          <option value="">Selecciona</option>
          <option value="descripcion">Descripción</option>
          <option value="cantidad">Cantidad</option>
          <option value="fecha">Fecha</option>
          <option value="categoria">Categoría</option>
          <option value="nombreTitular">Nombre del Titular</option>
        </select>
      </div>
      <div className="col-4">
        {mostrarInputBusqueda() && (
          <input
            className="form-control mb-3 "
            placeholder="Escribe para buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        )}
      </div>

      <div
        style={{
          maxHeight: "65vh",
          overflowY: "auto",
        }}
      >
        <table className="table table-sm table-bordered mb-5 align-middle">
          <thead>
            <tr className="text-center">
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Categoría</th>
              <th>Titular</th>
              {showPagoMeses && <th>Pago</th>}
              <th>Cantidad</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {gastosBusqueda.map((gasto) => (
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

                <td>${Number(gasto.cantidad).toLocaleString("es-MX")}</td>

                <td>
                  <button
                    className="btn btn-outline-danger btn-sm me-2"
                    onClick={() => eliminarGasto(gasto.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => editarGasto(gasto)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => compartirGasto(gasto)}
                  >
                    <i className="bi bi-share"></i>
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
      </div>
    </>
  );
};
