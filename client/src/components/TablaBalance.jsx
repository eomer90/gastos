export const TablaBalance = ({ ingresosOrdenados, gastosOrdenados }) => {
  const totalIngresos = ingresosOrdenados.reduce(
    (acum, { ingreso }) => acum + ingreso,
    0,
  );

  const filtrarCredito = gastosOrdenados.filter(
    (g) => g.tipoPago === "credito",
  );

  const totalCredito = filtrarCredito.reduce(
    (acum, { cantidad }) => acum + cantidad,
    0,
  );

  const filtrarContado = gastosOrdenados.filter(
    (g) => g.tipoPago === "contado",
  );

  const totalContado = filtrarContado.reduce(
    (acum, { cantidad }) => acum + cantidad,
    0,
  );

  const total = gastosOrdenados.reduce(
    (acum, { cantidad }) => acum + cantidad,
    0,
  );

  const titularXGasto = gastosOrdenados
    .filter((g) => g.titular !== "propio")
    .reduce((acc, g) => {
      if (!acc[g.nombreTitular.trim()]) {
        acc[g.nombreTitular.trim()] = 0;
      }

      acc[g.nombreTitular.trim()] += g.cantidad;

      return acc;
    }, {});

  const balance = totalIngresos - total;
  return (
    <>
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
      <table className="table table-sm table-bordered mb-5">
        <tbody>
          {Object.entries(titularXGasto).map(([nombre, total]) => (
            <tr className="text-center" key={nombre}>
              <th className="fw-bold w-75">{nombre}</th>
              <td>${Number(total).toLocaleString("es-MX")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
