export const TablaBalance = ({ ingresos, gastos }) => {
  const totalIngresos = ingresos.reduce(
    (acum, { ingreso }) => acum + ingreso,
    0,
  )

  const filtrarCredito = gastos.filter((g) => g.tipoPago === "credito")

  const totalCredito = filtrarCredito.reduce(
    (acum, { cantidad }) => acum + cantidad,
    0,
  )

  const filtrarContado = gastos.filter((g) => g.tipoPago === "contado")

  const totalContado = filtrarContado.reduce(
    (acum, { cantidad }) => acum + cantidad,
    0,
  )

  const total = gastos.reduce((acum, { cantidad }) => acum + cantidad, 0)

  const balance = totalIngresos - total
  return (
    <table className="table mb-5">
      <tbody>
        <tr>
          <th>Total Crédito</th>
          <td>{totalCredito}</td>
        </tr>
        <tr>
          <th>Total Contado</th>
          <td>{totalContado}</td>
        </tr>
        <tr>
          <th>Balance</th>
          <td>{balance}</td>
        </tr>
      </tbody>
    </table>
  )
}
