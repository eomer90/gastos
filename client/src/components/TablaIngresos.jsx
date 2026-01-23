export const TablaIngresos = ({ ingresos, gastos }) => {
  const totalIngresos = ingresos.reduce(
    (acum, { ingreso }) => acum + ingreso,
    0
  );

  const fechaFormatoMx = (fecha) => {
    const [year, mes, dia] = fecha.split("-");
    return `${dia}/${mes}/${year}`;
  };

  return (
    <table className="table mb-5">
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Fecha</th>
          <th>Ingreso</th>
        </tr>
      </thead>
      <tbody>
        {ingresos.map((ingreso, index) => (
          <tr key={index}>
            <td>{ingreso.descripcionIngreso}</td>
            <td>{fechaFormatoMx(ingreso.fechaIngreso)}</td>
            <td>{ingreso.ingreso}</td>
          </tr>
        ))}
        <tr>
          <td colSpan={2} className="fw-bold">
            Total
          </td>
          <td>{totalIngresos}</td>
        </tr>
      </tbody>
    </table>
  );
};
