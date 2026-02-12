export const TablaBalance = ({ ingresosOrdenados, gastos }) => {
  const totalIngresos = ingresosOrdenados.reduce(
    (acum, { ingreso }) => acum + ingreso,
    0,
  );

  const filtrarCredito = gastos.filter((g) => g.tipoPago === "credito");

  const totalCredito = filtrarCredito.reduce(
    (acum, { cantidad }) => acum + cantidad,
    0,
  );

  const filtrarContado = gastos.filter((g) => g.tipoPago === "contado");

  const totalContado = filtrarContado.reduce(
    (acum, { cantidad }) => acum + cantidad,
    0,
  );

  const total = gastos.reduce((acum, { cantidad }) => acum + cantidad, 0);

  const balance = totalIngresos - total;
  return (
    <table className="table table-sm table-bordered mb-5">
      <tbody>
        <tr className="text-center">
          <th className="w-75">Total Crédito</th>
          <td>${Number(totalCredito).toLocaleString("es-MX")}</td>
        </tr>

        <tr className="text-center">
          <th>Total Contado</th>
          <td>${Number(totalContado).toLocaleString("es-MX")}</td>
        </tr>

        <tr className="text-center">
          <th className="fw-bold">Balance</th>
          <td className="fw-bold ">
            ${Number(balance).toLocaleString("es-MX")}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
