export const TablaIngresos = ({ ingresos, gastos }) => {
  const totalIngresos = ingresos.reduce(
    (acum, { ingreso }) => acum + ingreso,
    0
  );
  const total = gastos.reduce((acum, { cantidad }) => acum + cantidad, 0);

  const balance = totalIngresos - total;
  return (
    <table className="table mb-5">
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Ingreso</th>
        </tr>
      </thead>
      <tbody>
        {ingresos.map((ingreso, index) => (
          <tr key={index}>
            <td>{ingreso.descripcionIngreso}</td>
            <td>{ingreso.ingreso}</td>
          </tr>
        ))}
        <tr>
          <td colSpan={1}>
            <span className="fw-bold">Total</span>
          </td>
          <td>{totalIngresos}</td>
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
