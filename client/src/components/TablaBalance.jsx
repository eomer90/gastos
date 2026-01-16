export const TablaBalance = ({ ingresos, gastos }) => {
  const totalIngresos = ingresos.reduce(
    (acum, { ingreso }) => acum + ingreso,
    0
  );

  const filtrarCredito = gastos.filter((g) => g.tipoPago === "credito");

  const totalCredito = filtrarCredito.reduce(
    (acum, { cantidad }) => acum + cantidad,
    0
  );

  const filtrarContado = gastos.filter((g) => g.tipoPago === "contado");

  const totalContado = filtrarContado.reduce(
    (acum, { cantidad }) => acum + cantidad,
    0
  );

  const total = gastos.reduce((acum, { cantidad }) => acum + cantidad, 0);

  const balance = totalIngresos - total;
  return (
    <table className="table mb-5">
      <tbody>
        <tr>
          <td colSpan={1}>
            <span className="fw-bold">Total Crédito</span>
          </td>
          <td>{totalCredito}</td>
        </tr>
        <tr>
          <td colSpan={1}>
            <span className="fw-bold">Total Contado</span>
          </td>
          <td>{totalContado}</td>
        </tr>
        <tr>
          <td colSpan={1}>
            <span className="fw-bold">Balance</span>
          </td>
          <td>{balance}</td>
        </tr>
      </tbody>
    </table>
  );
};
