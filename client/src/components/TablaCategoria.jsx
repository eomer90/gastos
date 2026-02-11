export const TablaCategoria = ({ gastos, eliminarGasto }) => {
  const total = gastos.reduce((acum, { cantidad }) => acum + cantidad, 0);

  const showPagoMeses = gastos.some(
    (gasto) => gasto.categoria === "pago a meses",
  );

  return (
    <table className="table table-sm table-bordered mb-5 align-middle">
      <thead>
        <tr className="text-center">
          <th>Descripción</th>
          <th>Fecha</th>
          <th>Tipo de pago</th>
          <th>Titular</th>
          {showPagoMeses && <th>Pago</th>}
          <th>Cantidad</th>
          <th>Acción</th>
        </tr>
      </thead>

      <tbody>
        {gastos.map((gasto) => (
          <tr className="text-center" key={gasto.id}>
            <td>{gasto.descripcion}</td>
            <td>{gasto.fecha}</td>
            <td>{gasto.tipoPago}</td>
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
                className="btn btn-outline-danger btn-sm"
                onClick={() => eliminarGasto(gasto.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        ))}

        <tr className="text-center">
          <td colSpan={showPagoMeses ? 5 : 4} className="fw-bold ">
            Total
          </td>
          <td className="fw-bold">${Number(total).toLocaleString("es-MX")}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};
