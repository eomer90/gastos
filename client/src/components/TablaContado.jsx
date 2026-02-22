import { useState } from "react";

export const TablaContado = ({
  gastosXContado,
  eliminarGasto,
  setVentanaEdicion,
  setGastoSeleccionado,
}) => {
  const [campo, setCampo] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const gastosBusqueda = gastosXContado.filter((g) => {
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

  const mostrarEstatus = gastosXContado.some((g) => g.estatus !== "");

  const totalFiltradoXCategoria = gastosBusqueda.reduce(
    (acum, { cantidad }) => acum + cantidad,
    0,
  );

  const handleChange = (e) => {
    setCampo(e.target.value);
  };

  const editarGasto = (gasto) => {
    setGastoSeleccionado(gasto);
    setVentanaEdicion(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">CONTADO</h2>
        <span className="badge bg-danger-subtle text-danger px-3 py-2">
          <span className="fw-semibold">Total:</span>{" "}
          <span className="fw-bold fs-4">
            ${Number(totalFiltradoXCategoria).toLocaleString("es-MX")}
          </span>
        </span>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <select className="form-select" onChange={handleChange}>
            <option value="">Selecciona filtro</option>
            <option value="descripcion">Descripción</option>
            <option value="cantidad">Cantidad</option>
            <option value="fecha">Fecha</option>
            <option value="categoria">Categoría</option>
            <option value="nombreTitular">Nombre del Titular</option>
          </select>
        </div>

        <div className="col-md-4">
          {mostrarInputBusqueda() && (
            <input
              className="form-control"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          )}
        </div>
      </div>

      <div
        style={{
          maxHeight: "65vh",
          overflowY: "auto",
        }}
      >
        <table className="table table-sm table-bordered align-middle">
          <thead className="table-light">
            <tr className="text-center">
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Fecha</th>
              <th>Titular</th>
              {mostrarEstatus && <th>Estatus</th>}
              <th className="text-end">Cantidad</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {gastosBusqueda.map((gasto) => (
              <tr key={gasto.id} className="text-center align-middle">
                <td className="fw-semibold">{gasto.descripcion}</td>
                <td>
                  <span className="badge bg-dark text-light">
                    {gasto.categoria}
                  </span>
                </td>

                <td>{gasto.fecha}</td>
                <td>
                  {gasto.nombreTitular ? (
                    <span className="badge bg-light text-dark border">
                      {gasto.nombreTitular}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>

                {mostrarEstatus && (
                  <td>
                    <span
                      className={`badge ${
                        gasto.estatus === "pendiente"
                          ? "bg-warning text-dark"
                          : "bg-info text-dark"
                      }`}
                    >
                      {gasto.estatus}
                    </span>
                  </td>
                )}

                <td className="fw-semibold text-danger text-end">
                  ${Number(gasto.cantidad).toLocaleString("es-MX")}
                </td>

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

            {gastosBusqueda.length === 0 && (
              <tr>
                <td
                  colSpan={mostrarEstatus ? 7 : 6}
                  className="text-center text-muted py-3"
                >
                  No hay resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
