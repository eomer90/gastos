import { useState } from "react";

export const TablaCategoria = ({
  gastosXCredito,
  eliminarGasto,
  setVentanaEdicion,
  setGastoSeleccionado,
}) => {
  const [campo, setCampo] = useState("");
  const [busqueda, setBusqueda] = useState("");

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

  const gastosBusqueda = gastosXCredito.filter((g) => {
    const valor = g[campo];

    if (!busqueda) return true;
    if (!valor) return false;

    return valor.toString().toLowerCase().includes(busqueda.toLowerCase());
  });

  const totalFiltradoXCategoria = gastosBusqueda.reduce(
    (acum, { cantidad }) => acum + cantidad,
    0,
  );

  const handleChange = (e) => {
    const value = e.target.value;

    setCampo(value);

    if (value === "") {
      setBusqueda("");
    }
  };

  const editarGasto = (gasto) => {
    setGastoSeleccionado(gasto);
    setVentanaEdicion(true);
  };

  return (
    <>
      <div className="pt-4 mb-4">
        <h2>{"Crédito".toUpperCase()}</h2>
      </div>
      <div className="mb-3">
        <h4>
          Total: ${Number(totalFiltradoXCategoria).toLocaleString("es-MX")}
        </h4>
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
          <thead className="table-light">
            <tr className="text-center align-middle">
              <th>Descripción</th>
              <th>Fecha</th>
              <th>N° Pago</th>
              <th>Cantidad</th>
              <th>Restante</th>
              <th>Titular</th>
              <th>Categoría</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {gastosBusqueda.map((gasto) => (
              <tr className="align-middle text-center" key={gasto.id}>
                <td className="fw-semibold">{gasto.descripcion}</td>
                <td>{gasto.fecha}</td>
                <td>{gasto.numeroPago ? `${gasto.numeroPago}` : "-"}</td>
                <td className="fw-bold text-danger">
                  ${Number(gasto.cantidad).toLocaleString("es-MX")}
                </td>
                <td>
                  {gasto.restante
                    ? `$${Number(gasto.restante).toLocaleString("es-MX")}`
                    : "-"}
                </td>
                <td>{gasto.nombreTitular ? `${gasto.nombreTitular}` : "-"}</td>
                <td>
                  <span className="badge bg-secondary">{gasto.categoria}</span>
                </td>
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
          </tbody>
        </table>
      </div>
    </>
  );
};
