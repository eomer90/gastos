export const TablaBalance = ({ ingresosOrdenados, gastosOrdenados }) => {
  const totalGastos = gastosOrdenados.reduce(
    (acum, { cantidad }) => acum + Number(cantidad),
    0,
  );

  const filtrarContado = gastosOrdenados.filter(
    (g) => g.tipoPago === "contado",
  );

  const totalContado = filtrarContado.reduce(
    (acum, { cantidad }) => acum + Number(cantidad),
    0,
  );

  const gastosLiberados = filtrarContado
    .filter((g) => g.estatus === "liberado")
    .reduce((acc, g) => acc + Number(g.cantidad), 0);

  const titularXGasto = gastosOrdenados
    .filter((g) => g.titular !== "propio")
    .reduce((acc, g) => {
      if (!acc[g.nombreTitular.trim()]) {
        acc[g.nombreTitular.trim()] = 0;
      }
      acc[g.nombreTitular.trim()] += g.cantidad;
      return acc;
    }, {});

  const totalCreditoAjenos = gastosOrdenados
    .filter((g) => g.tipoPago === "credito")
    .filter((g) => g.titular !== "propio")
    .reduce((acc, g) => acc + Number(g.cantidad), 0);

  const totalCreditoPropio = gastosOrdenados
    .filter((g) => g.tipoPago === "credito")
    .filter((g) => g.titular === "propio")
    .reduce((acc, g) => acc + Number(g.cantidad), 0);

  const totalAbonado = gastosOrdenados
    .filter((g) => g.saldo === "abonado")
    .reduce((acum, g) => acum + Number(g.cantidad), 0);

  const acumEfectivo = ingresosOrdenados
    .filter((i) => i.tipoIngreso === "efectivo")
    .reduce((acum, actual) => acum + Number(actual.ingreso), 0);

  const acumProyectado = ingresosOrdenados
    .filter((i) => i.tipoIngreso === "proyectado")
    .reduce((acum, actual) => acum + Number(actual.ingreso), 0);

  const totalPagado = gastosOrdenados
    .filter((g) => g.estatus === "liberado")
    .reduce((acum, g) => acum + Number(g.cantidad), 0);

  const totalIngresos = ingresosOrdenados.reduce(
    (acum, { ingreso }) => acum + Number(ingreso),
    0,
  );

  const totalAjenos = gastosOrdenados
    .filter((g) => g.titular !== "propio")
    .reduce((acc, g) => acc + Number(g.cantidad), 0);

  const totalIngresosEfectivo = acumEfectivo + totalAbonado - totalPagado;

  const totalGeneral = totalIngresosEfectivo + acumProyectado;

  const balanceReal = totalGeneral - totalGastos;

  const balanceProyectado = totalIngresos + totalAjenos - totalGastos;

  const valoresBienEscritos = (nombre) => {
    const valores = {
      pagoAMeses: "Pago a Meses",
    };

    return (
      valores[nombre] || nombre.slice(0, 1).toUpperCase() + nombre.slice(1)
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="mb-0">BALANCE</h2>
        <span className="badge bg-primary-subtle text-primary px-3 py-2">
          <span className="fw-semibold">Total:</span>{" "}
          <span className="fw-bold fs-4">
            ${Number(balanceProyectado.toFixed(2)).toLocaleString("es-MX")}
          </span>
        </span>
      </div>
      <div className="d-flex justify-content-between align-items-left mb-4">
        <h5 className="mb-0">BALANCE REAL</h5>
        <span className="badge bg-primary-subtle text-primary">
          Total Real: ${Number(balanceReal.toFixed(2)).toLocaleString("es-MX")}
        </span>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">INGRESOS REALES</h5>
        <span className="badge bg-success-subtle text-success">
          Total: ${Number(totalGeneral.toFixed(2)).toLocaleString("es-MX")}
        </span>
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-bordered align-middle mb-5">
          <thead className="table-light">
            <tr>
              <th className="text-center">Concepto</th>
              <th className="text-end">Cantidad</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="fw-semibold text-center">Efectivo</td>
              <td className="text-end text-success fw-semibold">
                $
                {Number(totalIngresosEfectivo.toFixed(2)).toLocaleString(
                  "es-MX",
                )}
              </td>
            </tr>

            <tr>
              <td className="fw-semibold text-center">Proyectado</td>
              <td className="text-end text-success fw-semibold">
                ${Number(acumProyectado.toFixed(2)).toLocaleString("es-MX")}
              </td>
            </tr>

            {Object.entries(titularXGasto).map(([nombre, total]) => (
              <tr key={nombre}>
                <td className="fw-semibold text-center">
                  {valoresBienEscritos(nombre)}
                </td>
                <td className="text-end text-success fw-semibold">
                  $
                  {Number(
                    total.toFixed(2) - totalAbonado.toFixed(2),
                  ).toLocaleString("es-MX")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">GASTOS TOTALES</h5>
          <span className="badge bg-danger-subtle text-danger">
            Total: $
            {Number(
              totalGastos.toFixed(2) - gastosLiberados.toFixed(2),
            ).toLocaleString("es-MX")}
          </span>
        </div>

        <table className="table table-sm table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th className="text-center">Concepto</th>
              <th className="text-end">Cantidad</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="fw-semibold text-center">Crédito propio</td>
              <td className="text-end text-danger fw-semibold">
                ${Number(totalCreditoPropio.toFixed(2)).toLocaleString("es-MX")}
              </td>
            </tr>

            <tr>
              <td className="fw-semibold text-center">Crédito compartido</td>
              <td className="text-end text-danger fw-semibold">
                ${Number(totalCreditoAjenos.toFixed(2)).toLocaleString("es-MX")}
              </td>
            </tr>

            <tr>
              <td className="fw-semibold text-center">Contado</td>
              <td className="text-end text-danger fw-semibold">
                $
                {Number(
                  totalContado.toFixed(2) - gastosLiberados.toFixed(2),
                ).toLocaleString("es-MX")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
