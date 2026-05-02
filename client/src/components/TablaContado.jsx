import { useState } from "react";

export const TablaContado = ({
  gastosOrdenados,
  setVentanaEdicion,
  setGastoSeleccionado,
  setVentanaEliminarGasto,
  setGastoAEliminar,
}) => {
  const [campo, setCampo] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const gastosXContado = gastosOrdenados.filter(
    (g) => g.tipoPago === "contado",
  );

  const gastosBusqueda = gastosXContado.filter((g) => {
    const valor = g[campo];
    if (!busqueda) return true;
    if (!valor) return false;
    return valor.toString().toLowerCase().includes(busqueda.toLowerCase());
  });

  const totalFiltradoXBusqueda = gastosBusqueda.reduce(
    (acum, { cantidad }) => acum + cantidad,
    0,
  );

  const mostrarInputBusqueda = () => {
    if (campo !== "") {
      return true;
    }
  };

  const tipoInputBusqueda = () => {
    if (
      campo === "descripcion" ||
      campo === "nombreTitular" ||
      campo === "estatus"
    )
      return "text";
    if (campo === "cantidad") return "number";
    if (campo === "fecha") return "date";
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setCampo(value);
    if (value !== campo) {
      setBusqueda("");
    }
  };

  const editarGasto = (gasto) => {
    setGastoSeleccionado(gasto);
    setVentanaEdicion(true);
  };

  const valoresBienEscritos = (nombre) => {
    const valores = {
      pagoAMeses: "Pago a Meses",
    };

    return (
      valores[nombre] || nombre.slice(0, 1).toUpperCase() + nombre.slice(1)
    );
  };

  const abrirModalEliminarGasto = (gasto) => {
    setGastoAEliminar(gasto);
    setVentanaEliminarGasto(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">CONTADO</h2>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <select className="form-select" onChange={handleChange}>
            <option value="">Selecciona filtro</option>
            <option value="descripcion">Descripción</option>
            <option value="categoria">Categoría</option>
            <option value="fecha">Fecha</option>
            <option value="nombreTitular">Nombre del Titular</option>
            <option value="estatus">Estatus</option>
          </select>
        </div>

        <div className="col-md-4">
          {mostrarInputBusqueda() &&
            (tipoInputBusqueda() ? (
              <input
                type={tipoInputBusqueda()}
                className="form-control"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            ) : (
              <select
                className="form-select"
                onChange={(e) => setBusqueda(e.target.value)}
              >
                <option value="fijo">Fijo</option>
                <option value="despensa">Alimentación y despensa</option>
                <option value="pagoAMeses">Pagos a meses</option>
                <option value="salidas">Salidas</option>
                <option value="salud">Salud</option>
                <option value="suscripcion">Suscripción</option>
                <option value="transporte">Transporte</option>
                <option value="variables">Variables</option>
                <option value="viajes">Viajes</option>
              </select>
            ))}
        </div>
        <div className="col-md-auto ms-auto mt-3">
          {mostrarInputBusqueda() && (
            <span className="badge bg-danger-subtle text-danger">
              Total: $
              {Number(totalFiltradoXBusqueda.toFixed(2)).toLocaleString(
                "es-MX",
              )}
            </span>
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
              <th>Estatus</th>
              <th className="text-end">Cantidad</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {gastosBusqueda.map((gasto) => (
              <tr key={gasto.id} className="text-center align-middle">
                <td className="fw-semibold">
                  {valoresBienEscritos(gasto.descripcion)}
                </td>
                <td>
                  <span className="badge bg-dark text-light">
                    {valoresBienEscritos(gasto.categoria)}
                  </span>
                </td>

                <td>{gasto.fecha}</td>
                <td>
                  {gasto.nombreTitular ? (
                    <span className="badge bg-light text-dark border">
                      {valoresBienEscritos(gasto.nombreTitular)}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>

                <td>
                  <span
                    className={`badge ${
                      gasto.estatus === "pendiente"
                        ? "bg-warning-subtle text-dark"
                        : "bg-info-subtle text-dark"
                    }`}
                  >
                    {valoresBienEscritos(gasto.estatus)}
                  </span>
                </td>

                <td className="fw-semibold text-danger text-end">
                  ${Number(gasto.cantidad.toFixed(2)).toLocaleString("es-MX")}
                </td>

                <td>
                  <button
                    className="btn btn-outline-danger btn-sm me-2"
                    onClick={() => abrirModalEliminarGasto(gasto)}
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
                <td colSpan={7} className="text-center text-muted py-3">
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
