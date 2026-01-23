export const TablaCategoria = ({ gastos, eliminarGasto }) => {
  const total = gastos.reduce((acum, { cantidad }) => acum + cantidad, 0)

  const showPagoMeses = gastos.some(
    (gasto) => gasto.categoria === "pago a meses",
  )

  return (
    <table className="table mb-5">
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Fecha</th>
          <th>Tipo de pago</th>
          <th>Titular</th>
          {showPagoMeses && <th>Pago</th>}
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {gastos.map((gasto, index) => (
          <tr key={`${gasto.descripcion}-${index}`}>
            <td>{gasto.descripcion}</td>
            <td>{gasto.fecha}</td>
            <td>{gasto.tipoPago}</td>
            <td>{gasto.nombreTitular}</td>
            {gasto.numeroPago && (
              <td>
                {gasto.numeroPago} de {gasto.totalMeses}
              </td>
            )}
            <td>{gasto.cantidad}</td>
            <td>
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => eliminarGasto(gasto.id)}
              >
                X
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={4} className="fw-bold">
            Total
          </td>
          <td>{total}</td>
        </tr>
      </tbody>
    </table>
  )
}
